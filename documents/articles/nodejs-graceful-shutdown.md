---
title: 'Node.js graceful shutdown'
subtitle: ''
date: '2023-10-10 16:03:09'
tags:
  - node-js
  - http
published: true
---
## 구현

node.js를 이용해서 http 서버를 운영 중인 경우 안전하게 어플리케이션을 종료하기 위해서는 기본적으로 아래와 같은 과정을 거쳐야 한다.

1. 서버의 listening 소켓을 닫는다.
2. 새로운 요청을 모두 거절한다.
3. 기존 요청이 완료될 때 까지 기다린다.
4. 기타 나머지 작업을 처리한다. (DB 연결 종료 등)

일단, shutdown 신호를 받기 위해 `SIGINT`를 이용한다. [PM2](https://pm2.keymetrics.io/) 등에서 rolling update를 위해 프로세스로 먼저 [이 시그널을 보내기도 한다](https://pm2.keymetrics.io/docs/usage/signals-clean-restart/). 터미널에서는 보통 [Ctrl+C](https://en.wikipedia.org/wiki/Control-C#In_command-line_environments)로 이 `SIGINT`를 보낼 수 있다. (필요에 따라 `SIGINT` 말고 `SIGUSR1`, `SIGUSR2` 등을 이용해도 되겠다)

```javascript
let isTerminating = false;

process.on('SIGINT', () => {
    isTerminating = true;
});
```

먼저, `server.close` 함수를 통해 listening 소켓을 닫아 새로운 연결을 막도록 하자.

```javascript
process.on('SIGINT', () => {
    isTerminating = true;
    
    server.close((err) => {
        if (err) {
	        console.error(err);
            process.exit(1);
        } else {
            process.exit(0);
        }
    });
});
```

`http.Server`의 [close](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#serverclosecallback) 함수는 listening하고 있는 소켓만 닫을 뿐, 이미 열려 통신하고 있는 소켓들은 손대지 않고 모두 종료될 때 까지 기다린 후 callback 함수를 호출한다.

listening 소켓은 닫았더라도 클라이언트와 서버 사이에서 [http keepAlive](https://en.wikipedia.org/wiki/HTTP_persistent_connection)를 사용하게 될 경우 기존 소켓들이 계속 열려있어 새로운 요청이 들어올 수 있기 때문에 이를 거절해야 한다. 따라서 idle 소켓을 임의로 모두 끊어준다.

idle인지 아닌지 판단하는 방법은 단일 요청이 시작되고 끝날 때 마다 idle 여부를 체크하는 것이다.

```javascript
server.on('request', (req, res) => {
    const socket = req.socket;
    
    socket.$$idle = false;
    
    res.on('finish', () => {
        socket.$$idle = true;
    });
});
```

HTTP 1.1 에서는 커넥션 당 요청과 응답의 순서가 보장되는 통신을 하므로 위와 같이 idle 유무만 확인하더라도 큰 문제는 없다. 하지만 HTTP 2.0를 사용하게 된다면 idle 유무가 아니라 처리 중인 요청 수를 세어야 하겠다. [^1] [^2]

[^1]: https://www.dashlane.com/blog/implementing-nodejs-http-graceful-shutdown
[^2]: https://freecontent.manning.com/animation-http-1-1-vs-http-2-vs-http-2-with-push/)

node.js의 Server 클래스에는 현재 연결된 소켓 목록 따로 제공하고 있지 않으므로 idle 소켓을 모두 끊기 위해서는 현재 소켓들을 직접 추적해야 한다.

```javascript
const connections = new Set();

server.on('connection', (socket) => {
    if (isTerminating) {
        socket.destory();
        return;
    }

    connections.add(socket);
    
    socket.$$idle = true;
    
    socket.on('close', () => {
	    connections.delete(socket);
    });
});
```

만일 [`http.Server`](https://nodejs.org/dist/latest-v18.x/docs/api/http.html#class-httpserver)가 아니라 [`https.Server`](https://nodejs.org/dist/latest-v18.x/docs/api/https.html#class-httpsserver)를 사용할 경우 `connection`이 아니라 `secureConnection`을 사용해야 한다.

후에 이 `Set`을 이용해서 일괄 종료를 할 수 있다.

```javascript
for (const socket of connections) {
    if (isTerminating && socket.$$isIdle) socket.destroy();
}
connections.clear();
```

idle이 아닌 소켓에 대해서는 마지막 요청 처리를 마친 후 끊어질 수 있도록 다음과 같이 코드를 수정한다.

```javascript
server.on('request', (req, res) => {
    const socket = req.socket;
    
    socket.$$idle = false;
    
    res.on('finish', () => {
        socket.$$idle = true;
        
        if (isTerminating) socket.destroy();
    });
});
```

다른 방법으로 새로운 요청 시 응답 헤더에 `Connection: close`를 달아주는 방법이 있다. [express](https://expressjs.com/) 라이브러리 등을 사용한다면 middleware로 손쉽게 추가할 수 있겠다.

```javascript
const app = express();

app.use((req, res, next) => {
    if (isTerminating && !res.headersSent) {
	    res.set('Connection', 'close');
    }
    
    next();
});
```

특정 프레임워크에 종속되길 원치 않는다면 아래와 같은 방법으로 헤더를 추가할 수 있다.

```javascript
server.on('request', (req, res) => {
    if (isTerminating && !res.headersSent) {
	    res.setHeader('Connection', 'close');
	}
});
```

그런데 이 방법만을 사용 시에는 새로운 요청이 들어오지 않는다면 소켓 close가 트리거 되지 않는다. 따라서 명확하게 idle 소켓을 확인하여 `destory` 하는 것이 좋아보인다.

## 구현된 패키지

이런 식으로 이미 구현된 패키지가 많이 있다. 다운로드 수가 좀 있어보이는 패키지를 몇 살펴보았다.

- https://www.npmjs.com/package/http-shutdown
	- 소켓 커넥션을 관리하기 위해서 `Set`이 아니라 일반 `Object` 및 단조 증가하는 정수 변수 하나를 이용한다.
		- 이 경우, 보통의 경우 왠만하면 그럴 일은 없겠지만 `Number`의 표현의 최대값에 도달할 경우 더 이상 값이 증가하지 않기 때문에 문제가 생길 수 있어보인다. (문제가 생기기 전에 서버가 재시작 될 확률이 더 커보인다)
		- https://stackoverflow.com/questions/19054891/does-javascript-handle-integer-overflow-and-underflow-if-yes-how
	- 응답 헤더에 Connection 헤더를 따로 추가하지는 않는다.
- https://www.npmjs.com/package/http-graceful-shutdown
	- 위와 동일하게 소켓 커넥션 관리를 위해 일반 Object 및 단조 증가하는 정수 변수 하나를 이용한다.
	- `res.headersSent`를 확인하여 필요 시 `Connection: close` 헤더를 달아준다.
- https://www.npmjs.com/package/@gquittet/graceful-server
	- 소켓 커넥션 관리를 위해 Set 자료구조를 사용한다.
	- `res.headersSent`를 확인하여 필요 시 `Connection: close` 헤더를 달아준다.
	- 소켓 idle을 따로 체크하지는 않는다. 그냥 소켓을 부숴버린다.
- https://www.npmjs.com/package/@moebius/http-graceful-shutdown
	- 소켓 커넥션 관리를 위해 Object를 사용한다.
	- 응답 헤더에 Connection 헤더를 따로 추가하지는 않는다.
