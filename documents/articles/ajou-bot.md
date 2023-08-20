---
title: '아주대학교 공지사항 봇 만들기'
subtitle: '그리고 돈 한 푼도 들이지 않기'
date: '2023-08-20 17:19'
tags:
  - ajou-bot
  - AWS
  - Serverless
published: true
---

GitHub에 올라와 있는 기존에 다른 사람이 만들어 놓은 아주대 공지사항 봇들은 대부분 만든지 1 ~ 2년 정도 지났고 현재까지 생활 반응(?)을 보이는 것은 [이것](https://github.com/ajou-hack/notice-rss)이 유일했다. 만드신 분이 따로 유지보수를 하고 있는 것 같지는 않지만 GitHub Action을 통해 지금까지도 잘 작동하고 있다. 처음에 해당 레포를 많이 참고하였다. 특이한 점은 Rust언어를 사용하셨다는 점이다.

## 전체 구조

![](/assets/ajou-bot/image-20230820161946001.png)

GitHub Action에는 cron으로 작업을 스케줄링 할 수 있다.

```yaml:.github/workflows/export.yml
on:
  push:
    branches:
      - main
  schedule:
    - cron: "0 0-9 * * *"
```

시간대는 UTC를 따르기 때문에 위 cron 식에서는 한국 시간대 기준으로 오전 9시부터 오후 6시 까지 동작한다. 동작하는 것 까지는 좋은데 [제시간에 동작하지 않는다는 문제](https://yceffort.kr/2021/01/from-github-workflow-to-firebase-functions)가 있다. 심할때는 1시간 넘게 작업이 지연될 때도 있는데 시간이 정확해야 하는 작업은 아니니 괜찮다.

cron으로 작업이 실행될 때 마다 공지사항을 크롤링 한 뒤 rss 생성 및 Discord Webhook 알림을 보낸다.

## 크롤링 및 RSS 만들기

기존 RSS에서 마음에 들지 않았던 것은 내용을 미리 볼 수 없었던 것이다. 물론 RSS 리더 마다 웹사이트 링크가 있는 경우 해당 페이지를 읽어와 바로 볼 수 있게 되어있는 경우도 있다. 아래는 Thunderbird에 RSS를 구독한 경우다.

![](/assets/ajou-bot/image-20230820163950152.png)

그냥 제목만 딸랑 달려있다. 그래서 아래처럼 보이게 만들었다.

![](/assets/ajou-bot/image-20230820164332705.png)

물론 이렇게 하려면 공지사항 별로 크롤링을 한 번씩 더 해야 한다. [cheerio](https://cheerio.js.org/)를 사용했다.

## Discord Webhook

https://discord.com/developers/docs/resources/webhook

처음에는 디스코드 봇을 따로 만들까 했는데 알림만 보낼건데 너무 귀찮았다.

![](/assets/ajou-bot/image-20230820165214963.png)

웹훅은 URL을 POST로 호출만 하면 되기 때문에 간편하다. 한 가지 문제는 다른 사람이 알림을 받아보기 위해서는 동적으로 웹훅을 등록하고 읽어올 수 있어야 한다는 것이다. 돈 들이지 않고 이를 구현하려면 [utterances](https://utteranc.es/)처럼 GitHub Repository의 issue 혹은 discussion등을 이용해 볼 수도 있겠으나 사용자 친화적이지 않다. 마침 인턴 중에 AWS Lambda를 사용해볼 일이 있어서 Lambda와 DynamoDB를 이용했다.

Lambda와 DynamoDB의 장점은 [Always Free Tier](https://aws.amazon.com/ko/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=tier%23always-free&awsf.Free%20Tier%20Categories=*all)에 속해있기 때문에 이런 토이 프로젝트에서는 충분히 쓰고도 남는 스펙을 제공한다. (이것이 serverless…?)

![](/assets/ajou-bot/image-20230820170720053.png)

배포에는 [Serverless Framework](https://www.serverless.com/)를 이용했다. `serverless.yml`에 필요한 자원(Lambda function, DynamoDB 등)을 적어놓기만 하면 Cloudformation으로 생성까지 알아서 해준다.

```yaml:serverless.yml
functions:
  subscribe:
    handler: index.subscribe
    events:
      - httpApi:
          path: /subscribe
          method: post
  unsubscribe:
    handler: index.unsubscribe
    events:
      - httpApi:
          path: /unsubscribe
          method: post

resources:
  Resources:
    AjouBotDiscordDynamoDbTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:custom.tableName}
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        AttributeDefinitions:
          - AttributeName: webhook-id
            AttributeType: N
          - AttributeName: webhook-token
            AttributeType: S
        KeySchema:
          - AttributeName: webhook-id
            KeyType: HASH
          - AttributeName: webhook-token
            KeyType: RANGE
```

알림을 보내려면 마지막으로 알림을 보낸 게시물이 무엇인지 알아야 한다. 해당 게시물의 id를 저장하는 것은 [GitHub Repository Variable](https://docs.github.com/en/actions/learn-github-actions/variables)을 이용했다.

![](/assets/ajou-bot/image-20230820173203091.png)

GitHub API를 이용하면 해당 변수를 갱신할 수 있다.

```typescript:apps/discord/src/main.ts
async function setDiscordLastArticleNo(value: string) {
  await octokit.request(
    "PATCH /repos/{owner}/{repo}/actions/variables/{name}",
    {
      owner: "rlj1202",
      repo: "ajou-bot",
      name: "DISCORD_LAST_ARTICLE_NO",
      value: `${value}`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
}
```

변수의 값을 이용할 때는 GitHub Action 실행 시 환경변수로 넣어줄 수 있다.

```yaml:.github/workflows/export.yml
      - name: Run Discord Script
        run: npm run start:discord
        env:
          GITHUB_TOKEN: ${{ steps.generate_token.outputs.token }}
          DISCORD_LAST_ARTICLE_NO: ${{ vars.DISCORD_LAST_ARTICLE_NO }} # <- 여기!
          DISCORD_WEBHOOK_TEST: ${{ secrets.DISCORD_WEBHOOK_TEST }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        continue-on-error: true
```

## 웹훅 구독 페이지

APIGateway 주소가 있으니 이걸 간편하게 호출할 간단한 웹페이지가 있으면 된다. 그래서 그냥 군대에서 상황보고 유틸 페이지를 메모장으로 만들던 향수를 느끼며 쌩 html 파일 하나를 작성해서 GitHub Pages로 [배포](https://rlj1202.github.io/ajou-bot)했다.

![](/assets/ajou-bot/image-20230820171045946.png)

## 링크

- https://github.com/rlj1202/ajou-bot
