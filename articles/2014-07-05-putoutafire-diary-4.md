---
layout:     post
title:      게임 개발 일지 - 4.렌더링 방법 전환...
date:       2014-07-05 14:39:00 +0900
categories: 
tags:       PutOutAFire
---

오늘 맵 크기를 10 * 10 으로 해놓고 보니 너무 렉이 심하더라.... 왜그런가 생각해 봤는데 아무래도 매 렌더링 마다 맵을 새로 그려서 렉이 심해지는것 같았다.

그래서! 미리 맵 전체를 렌더링 해놓고 필요한 맵 부분만 그리고 엔티티만 매번 새로 그리는 방법을 생각했다.

그 결과, 엄청난 속도의 차이가!!!!!

최대 fps 를 120 로 설정해 놓고 그 차이를 비교해 보았다.( 오늘또한 악뮤 노래가... )

<center><iframe title="게임 개발 일지 - 4.렌더링 방법 전환..." width="640" height="360" src="https://kakaotv.daum.net/embed/player/cliplink/60026035?service=daum_tistory" allowfullscreen frameborder="0" scrolling="no"></iframe></center>
