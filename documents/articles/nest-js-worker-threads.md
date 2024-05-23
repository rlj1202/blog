---
title: Nest.js - Worker threads 잘 사용해보기
subtitle: 
date: 2024-05-23 21:44
tags:
  - node-js
  - nest-js
published: true
---
## 1. Worker thread 생성하기

```ts:main.ts
import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { once } from 'events';

@Injectable()
export class SomeService {
	async execute() {
		const worker = new Worker('./worker.js', { workerData: {} });
		
		await once(worker, 'exit');
	}
}
```

```ts:worker.ts
import { isMainThread, workerData, parentPort } from 'worker_threads';

if (!isMainThread) {
	async function main() {
		// do something here
		parentPort.postMessage('ready');
	}
	main();
}
```

Nest.js는 `ts-node`를 사용하지 않기 때문에 번들링 툴 등을 사용하지 않는 이상 상대경로가 바뀔일은 없으므로 이에 대해서는 염려하지 않아도 된다. 그러나 상대경로가 하드코딩 된다는 것이 맘에 들지 않는다. 따라서 다음과 같이 바꿔본다.

```ts:main.ts
import run from './worker';

@Injectable()
export class SomeService {
	async execute() {
		await run({});
	}
}
```

```ts:worker.ts
import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';
import { once } from 'events';

export default async function run(params: any) {
	const worker = new Worker(__filename, { workerData: params });

	const [exitCode] = await once(worker, 'exit');

	return exitCode as number;
}

if (!isMainThread) {
	async function main() {
		// do something here
		parentPort.postMessage('ready');
	}
	main();
}
```

[`__filename`](https://nodejs.org/api/modules.html#__filename)이라는 CommonJS의 module wrapper를 통해 제공되는 변수를 이용하여 파일 이름을 하드코딩 하지 않고도 worker를 사용할 수 있다. 다만, 한 가지 문제가 있다.

파일이 실행될 때에 이것이 `import` 로 인한 모듈 로딩에 의해 실행된 것인지, Worker 생성으로 인해 실행된 것인지가 구분되지 않기 때문에 이런 식으로 구현된 worker에서 같은 방식으로 구현된 다른 worker를 실행한다면 해당 과정에서 발행하는 `import` 구문으로 인해 자칫하면 쓰레드 무한 생성이 가능하기 때문이다.

따라서 한 가지 규칙을 정해 이를 막아본다. `workerData`에 항상 쓰레드가 어느 파일에서 시작되었는지 해당 파일의 경로를 전달하는 것이다.

```ts:main.ts
import run from './worker';

@Injectable()
export class SomeService {
	async execute() {
		await run({});
	}
}
```

```ts:worker.ts
import { Worker, workerData } from 'worker_threads';
import { once } from 'events';

export default async function run(params: any) {
	const worker = new Worker(__filename, {
		workerData: {
			entryFile: __filename,
			params,
		},
	});

	const [exitCode] = await once(worker, 'exit');

	return exitCode as number;
}

if (workerData?.entryFile === __filename) {
	async function main(_params: any) {
		// do something here
		parentPort.postMessage('ready');
	}
	main(workerData.params);
}
```

이렇게 하면 어느 파일을 통해서 쓰레드가 시작되었는지 확인이 가능하기 때문에 worker 내에서 안전하게 같은 방식으로 구현된 다른 worker를 실행할 수 있다.

`workerData`는 어찌됐든 worker thread로 생성된 경우에만 존재하는 객체이므로 `isMainThread` 변수는 이 상황에서는 딱히 쓸모는 없다.

## 2. Nest.js IoC 컨테이너 활용하기
아직은 thread 내에서 Nest.js의 IoC 컨테이너를 활용할 수 없다. `NestFactory.createApplicationContext` 함수를 활용하여 쓰레드 내에서도 IoC 컨테이너를 활용할 수 있도록 하자.

```ts:worker.ts
import { Worker, workerData } from 'worker_threads';
import { once } from 'events';
import { AppModule } from './app.module'
import { Injectable, Module, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default async function run(params: any) {
	const worker = new Worker(__filename, {
		workerData: {
			entryFile: __filename,
			params,
		},
	});

	const [exitCode] = await once(worker, 'exit');

	return exitCode as number;
}

@Injectable()
class WorkerService {
	constructor(
		private readonly configService: ConfigService,
		@Inject('whatever-you-want')
		private readonly someClient: SomeClient,
	) {}

	async run(params: any) {
		// do something here
	}
}

@Module({
	imports: [AppModule],
	providers: [WorkerService],	
})
class WorkerModule {}

if (workerData?.entryFile === __filename) {
	async function main(params: any) {
		const app = await NestFactory.createApplicationContext(WorkerModule);
		
		app.enableShutdownHooks();
		
		const service = app.get(WorkerService);
		await service.run(params);
		
		await app.close();
	}
	main(workerData.params);
}
```

몇 가지 주의해야 할 점은 `AppModule`를 import해서 사용할 것이기 때문에 사용하고 싶은 global이 아닌 서비스가 있다면 `AppModule`에서 꼭 export를 해주어야 한다. 또, 쓰레드 내에서도 Nest.js의 lifecycle hook이 동일하게 실행되므로 `onModuleInit` 등에서 단순히 자원 할당이 아닌 호스트 컴퓨터에서 단 한번만 실행하고 싶은 작업의 경우 아까는 쓸모 없다고 했던 `isMainThread` 변수를 활용하여 메인 쓰레드에서만 동작하도록 해주면 된다. 혹은 해당 작업을 `onModuleInit` 에서 호출하는 것이 아닌, Nest.js app이 생성되는 `bootstrap` 함수에서 직접 참조하여 실행시켜 주는 것도 괜찮겠다.

```ts
// ...
@Injectable()
export class FooBarService implements OnModuleInit {
	async onModuleInit() {
		if (!isMainThread) return;
		
		// do something here
	}
}
```

```ts
// ...
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// ...
	await app.get(SomeService).init();
	// ...
	await app.listen(3000);
}
```

또, 쓰레드 내에서 `ModuleRef`를 사용할 경우 `ModuleRef`는 기본 동작이 `strict: true` 이므로, 원하는 인스턴스를 inject할 수 없을수도 있다. 따라서 `strict: false` 옵션을 주어 해결한다.