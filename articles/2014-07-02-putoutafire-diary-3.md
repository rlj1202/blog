---
layout:     post
title:      게임 개발 일지 - 3.플레이어 입력 받기 및 이동!!
date:       2014-07-02 16:13:00 +0900
categories: 
tags:       PutOutAFire
---

오늘은 플레이어를 움직여 보겠습니다!!!!!
InputHandler 라는 클래스에서 입력에 대한 모든 정보를 받고, 그 정보를 가지고 플레이어의 움직임을 결정합니다!!!!!

여기서 감속도라는 변수가 있는데, 속도가 점점 줄어들도록 하는 코드에 쓰이는 변수임돠.
감속도가 1.0 이라면, 마찰이 아에 없는 상태가 되버립니다.
0.98 ~ 0.99 정도는 얼음처럼 미끄러워 보입니다 ㅋ
0.92 ~ 0.95 정도가 적당한 것 같습니다.

( 오 오 점점 발전하고 있따 )
( fps 를 타이틀바 쪽에 표시되도록 바꿈 )

<center><iframe title="게임 개발 일지 - 3.플레이어 입력 받기 및 이동!!" width="640" height="360" src="https://kakaotv.daum.net/embed/player/cliplink/59951256?service=daum_tistory" allowfullscreen frameborder="0" scrolling="no"></iframe></center>
