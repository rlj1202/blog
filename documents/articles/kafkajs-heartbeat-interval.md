---
title: 'KafkaJS의 heartbeatInterval값은 heartbeat의 동작 주기를 보장하지 않는다'
subtitle: ''
date: '2023-08-24 11:46'
tags:
  - kafka
  - kafkajs
published: true
---

## 요약

KafkaJS의 `heartbeatInterval`은 consumer가 group coordinator에게 보내는 heartbeat의 주기가 설정된 값보다 빠르지 않도록 제한할 뿐이다.

## 발생하는 문제

해당 시험에 사용된 라이브러리와 Kafka의 버전은 다음과 같다.

- **[KafkaJS](https://kafka.js.org/)**: 2.2.4
- **Kafka**: [confluentinc/cp-kafka:7.4.1.arm64](https://hub.docker.com/layers/confluentinc/cp-kafka/7.4.1.arm64/images/sha256-f6364cb703a723c586f303dcbfc36d09e6320c1711b4f6c8d29ad2ff659b16b8?context=explore) Docker Image

KafkaJS에서 consumer를 만들 때 다음과 같이 `heartbeatInterval` 옵션을 지정해 줄 수 있다.

```javascript
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
});

const consumer = kafka.consumer({
  groupId: 'test-group',
  heartbeatInterval: 3000,
});
```

이 값의 기본값은 3000ms이며, 문서에는 다음과 같이 적혀있다.

https://kafka.js.org/docs/consuming#a-name-options-a-options

> The expected time in milliseconds between heartbeats to the consumer coordinator. Heartbeats are used to ensure that the consumer's session stays active. The value must be set lower than session timeout

동작 시간을 보장한다고 적혀있진 않다. 그 외에 정확히 어떻게 동작하는지에 대한 구체적인 설명은 없다.

```javascript
const consumer = kafka.consumer({
  groupId: 'test-group',
  sessionTimeout: 1000, // broker의 group.min.session.timeout.ms도 1000으로 낮춰주었다
  heartbeatInterval: 333,
});
```

이렇게 옵션을 설정한다면 기대하기로는 session time-out 시간인 1초 내에 333ms마다 heartbeat를 보내기 때문에 아무런 이상이 없을 것 같다. 하지만 이렇게만 설정하면 계속해서 rebalancing이 일어남을 알 수 있다.

!['Consumer has joined the group' 문구가 지속적으로 보인다](/assets/kafkajs-heartbeat-interval/image-20230824122743556.png)

## 어째서?

아래는 `heartbeatInterval`값이 쓰이는 코드이다.

- https://github.com/tulios/kafkajs/blob/ff3b1117f316d527ae170b550bc0f772614338e9/src/consumer/consumerGroup.js#L132

```javascript:src/consumer/consumerGroup.js
	// ...
    this[PRIVATE.SHARED_HEARTBEAT] = sharedPromiseTo(async ({ interval }) => {
      const { groupId, generationId, memberId } = this
      const now = Date.now()

      if (memberId && now >= this.lastRequest + interval) {
        const payload = {
          groupId,
          memberId,
          groupGenerationId: generationId,
        }

        await this.coordinator.heartbeat(payload)
        this.instrumentationEmitter.emit(HEARTBEAT, payload)
        this.lastRequest = Date.now()
      }
    })
    // ...
```

여기서 `interval` 매개변수로 위에서 설정한 `heartbeatInterval`값이 들어가는데, 함수를 호출할 때 마다 마지막으로 heartbeat를 보낸 시점에서 해당 interval 만큼 지났는지 여부를 확인한다.

KafkaJS에서는 fetch 요청을 보낼 때 같이 heartbeat를 보내는 식으로 naive하게 구현되어 있다.

- https://github.com/tulios/kafkajs/blob/ff3b1117f316d527ae170b550bc0f772614338e9/src/consumer/runner.js#L378

```javascript:src/consumer/runner.js
  async handleBatch(batch) {
    // ...

    const onBatch = async batch => {
      if (batch.isEmptyDueToFiltering()) {
        // ...

        await this.heartbeat()
        return
      }

      if (batch.isEmpty()) {
        await this.heartbeat()
        return
      }

      // ...

      await this.autoCommitOffsets()
      await this.heartbeat()
    }

    await onBatch(batch)
  }
```

그리고 무한 루프를 돌면서 fetch 요청을 보내는 데, 이 속도는 `maxWaitTimeInMs`에 의해 제한된다. 해당 옵션은 fetch 요청을 서버가 받은 직후 바로 응답을 하는 것이 아니라, `max.poll.records`만큼의 데이터가 쌓여 있으면 바로 보내고 그렇지 않으면 해당 시간 만큼 기다린 후에 응답을 보낸다.

- https://kafka.js.org/docs/consuming#a-name-options-a-options

> The maximum amount of time in milliseconds the server will block before answering the fetch request if there isn’t sufficient data to immediately satisfy the requirement given by `minBytes`

그리고 KafkaJS에서 이 값의 기본값은 5000ms이다.

즉, 아무것도 하지 않는 상태에서 연결만 한다면 heartbeat는 기본값인 3000ms가 아닌 5000ms 주기로 보내진다.

```javascript
const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-app',
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
  logLevel: logLevel.DEBUG,
});

const consumer = kafka.consumer({
  groupId: 'test-group',
});

async function main() {
  await consumer.connect();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({ topic, partition, value: message.value });
    },
  });
}
main();
```

![Request Heartbeat의 실행 시간을 잘 보면 5초 간격임을 알 수 있다](/assets/kafkajs-heartbeat-interval/image-20230824121525479.png)

log level을 `DEBUG`로 변경하고 연결만 한 상태에서 로그를 확인해 보면 5초 주기로 heartbeat를 보내고 있음을 확인할 수 있다. 여기서 `maxWaitTimeInMs`를 100ms로 변경하고 다시 실행시키면 주기가 3초로 짧아짐을 볼 수 있다.

```javascript
const consumer = kafka.consumer({
  groupId: 'test-group',
  maxWaitTimeInMs: 100,
});
```

![Request Heartbeat의 실행 주기가 3초로 짧아짐을 볼 수 있다](/assets/kafkajs-heartbeat-interval/image-20230824122037564.png)

이 상태에서는 heartbeat 주기를 더 빠르게 변경할 수 있다.

```javascript
const consumer = kafka.consumer({
  groupId: 'test-group',
  maxWaitTimeInMs: 100,
  heartbeatInterval: 500,
});
```

![Request Heartbeat의 실행 주기가 0.5초로 짧아짐을 볼 수 있다](/assets/kafkajs-heartbeat-interval/image-20230824122206193.png)

## 다른 Node.js Kafka Client들

Node.js 생태계에서 Kafka Client의 다른 구현체를 찾으면 KafkaJS외에 다음 두 가지가 있다.

1. [node-rdkafka](https://www.npmjs.com/package/node-rdkafka)
   - 블리자드에서 만든 패키지
   - `librdkafka`의 nodejs wrapper 버전이라고 한다
     - [librdkafka](https://github.com/confluentinc/librdkafka)는 Confluent에서 만든 것으로 보인다.
   - Confluent 홈페이지에서 Node.js에서 설명할 때 이 패키지를 사용하는 것 같다.
     - https://developer.confluent.io/get-started/nodejs/
2. [kafka-node](https://www.npmjs.com/package/kafka-node)

글 작성 시점 기준으로 kafka-node는 마지막으로 업데이트 된지 몇 년 되었고 KafkaJS도 6개월이 지났는데 node-rdkafka는 1개월 전에도 업데이트 이력이 있다.

https://npmtrends.com/kafka-node-vs-kafkajs-vs-node-rdkafka

그래서 node-rdkafka를 사용해보기로 한다. 해당 라이브러리를 설치하여 비슷한 설정 값을 넣고 테스트를 해보았다.

```javascript
const Kafka = require('node-rdkafka');

const consumer = new Kafka.KafkaConsumer(
  {
    'session.timeout.ms': 1000,
    'heartbeat.interval.ms': 333,
    'group.id': 'rdkafka',
    'metadata.broker.list': 'localhost:9092,localhost:9093,localhost:9094',
    debug: 'consumer,topic,fetch,cgrp',
  },
  {}
);

consumer.connect();

consumer
  .on('ready', () => {
    consumer.subscribe(['test-topic']);
    consumer.consume();
  })
  .on('data', (data) => {
    console.log(data);
  })
  .on('event.log', (event) => {
    console.log(event.fac, new Date().toISOString());
  });
```

![입력한 333ms보다는 느리지만 session timeout 되지 않고 잘 작동한다](/assets/kafkajs-heartbeat-interval/image-20230824143138595.png)

기대하는 대로 동작한다! 몇 가지 다른 값을 넣어서 테스트해보았는데, 대체로 입력한 값보다 약간 느리게 작동하지만 의도한 대로 작동함을 알 수 있었다.
