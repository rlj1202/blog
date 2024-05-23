---
title: Nest.js - Custom provider onApplicationShutdown 훅 사용하기
subtitle: 
date: 2024-05-23 20:54
tags:
  - nest-js
  - node-js
published: true
---
```ts
@Module({
	providers: [
		{
			provide: 'token',
			useFactory: async () => {
				const someClient: unknown;
				
				return someClient;
			},
		},
	],
})
export class AppModule {}
```

위와 같은 방법으로 간편하게 custom provider를 Nest.js의 IoC 컨테이너에 제공할 수 있다. 가령, [`redis`](https://www.npmjs.com/package/redis) 라이브러리에서 생성한 redis 클라이언트를 제공할 수 있다.

```ts
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Module({
	providers: [
		{
			provide: 'redis-client',
			useFactory: async (configService: ConfigService) => {
				const client = await createClient({
					url: configService.get('REDIS_URL'),
				}).connect();
				return client;
			},
			inject: [ConfigService],
		},
	],
})
export class AppModule {}
```

그런데 이렇게만 제공하면 `SIGTERM` 등으로 종료 시그널을 받아 shutdown hook이 동작할 때에 커넥션이 정리되지 않으면서 어플리케이션이 알아서 종료되지 않는다. 이에 관하여 `dispose` 기능을 프레임워크 레벨에서 추가할 것을 요구하는 GitHub issue가 있다.

- https://github.com/nestjs/nest/issues/9497

위 이슈는 `Scope.REQUEST` 등 스코프가 종료될 때에 provider 자원을 반환하도록 하는 추상화 레이어를 추가해 달라는 요청이기는 하나, 아무튼 이런식으로 provider를 제공할 때에 어떤 식으로 자원을 정리해야 하는지에 대해서는 공식 문서에서도 마땅히 설명되어있는 바는 없다. 좀 간단한 방법을 인터넷에서 찾아보았다.

## 1. Module에서 dispose 시키기
provider를 제공한 모듈 클래스에서 lifecycle hook을 구현하여 리소스를 정리하는 방법이다.

```ts
@Module({
	providers: [
		{
			provide: 'token',
			useFactory: async () => {
				const someClient: unknown;
				
				return someClient;
			},
		},
	],
})
export class AppModule implements OnApplicationShutdown {
	constructor(
		@Inject('token')
		private readonly someClient: SomeClient,
	) {}

	async onApplicationShutdown() {
		await this.someClient.close(); // or something similar
	}
}
```

간단하기는 하나, 한 자원에 대한 코드가 한 파일 내에서 서로 떨어져있어 썩 맘에 들지는 않는다. (다른 provider 코드가 더 많아진다면 더더욱이)

- https://stackoverflow.com/questions/63753467/how-to-close-database-connection-in-nestjs-service

## 2. Provider 객체에 lifecycle hook 추가하기
객체에 직접 `onApplicationShutdown` 함수를 삽입하는 방법이다. TypeScript 환경이기 때문에 `object['onApplicationShutdown'] = async () => { return; };`과 같은 불편한(?) 방법 말고 조금 더 괜찮은 방법이 있다.

```ts
@Module({
	providers: [
		{
			provide: 'token',
			useFactory: async () => {
				const someClient: unknown;

				(someClient as unknown as OnApplicationShutdown)
					.onApplicationShutdown = async () => {
						// do something here

						return;
					};
				
				return someClient;
			},
		},
	],
})
export class AppModule {}
```

이번에는 코드가 한 군데 몰려있어 깔끔하다.

`@nestjs/bullmq` 라이브러리에서 해당 패턴을 확인할 수 있다.

- https://github.com/nestjs/bull/blob/ec3443cf5bca407455a9dd1770f2e4f41098b8ac/packages/bullmq/lib/bull.providers.ts#L67
