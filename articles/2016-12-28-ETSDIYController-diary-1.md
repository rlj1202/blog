---
layout: post
title: 유로 트럭 시뮬레이터 DIY 컨트롤러 일지 1
categories:
tags: 유로트럭시뮬레이터
date: 2016-12-28 11:10:00 +0900
---

유로 트럭을 하면서 키보드로 조종 하는것이 어렵고 불편하기도 해서 핸들로 조종하고 싶다는 마음이 들었다.
그렇지만 핸들을 사기도 뭐해서 직접 만들기로 했다.

센서 => 아두이노 => JVM => vJoy => Euro Truck Simulator 2

센서로 부터 값을 아두이노가 받아들이고 이를 시리얼 통신으로 JVM으로 보낸다.
JVM에서 vJoy 인터페이스에 조이스틱 값을 변환해 전달하고 vJoy가 유로 트럭 시뮬레이터에 최종적으로 값을 보낸다.

vJoy는 Virture Joystick 의 약자로, 운영체제 상에서 인식되는 가상의 조이스틱 디바이스이다.
vJoy feeder를 작성해서 가짜로 조이스틱의 값을 만들어 주면, 예를 들어 X 버튼이 눌렸다 라는 신호를 만들어 주면, 운영체제 에서는 실제 컨트롤러 기기에서 X 버튼이 눌렸다고 인식 하도록 할 수 있는것이다.

그런데 vJoy 인터페이스는 C언어로 작성되어 dll 로 제공되어 있어서 JNI를 이용해서 자바에서 접근할 수 있었다.
그냥 C로 개발하면 되지만 그냥 자바로 하고싶었다.
그래서 [JvJoyInterface 라이브러리][JvJoyInterface-github]를 직접 만들었다. vJoy와 관련된 내용은 [공식 홈페이지][vJoy-site]를 참조.

<!-- more -->

<center><img src="/assets/photo/2016-12-18 23.50.54.jpg" width="400px"></center>

가변저항과 아두이노를 사용해서 스티어링이 인식됨을 확인하고 핸들을 만들기로 했다.

<center><img src="/assets/photo/2016-12-19 20.31.05.jpg" width="400px"></center>

<center><img src="/assets/photo/2016-12-19 20.31.11.jpg" width="400px"></center>

<center><img src="/assets/photo/2016-12-19 20.41.20.jpg" width="400px"></center>

블랜더로 대충 어떤 모양으로 만들지 구상하였다.

<center><img src="/assets/photo/2016-12-19 21.19.13.jpg" width="400px"></center>

<center><img src="/assets/photo/2016-12-19 21.43.23.jpg" width="400px"></center>

<center><img src="/assets/photo/2016-12-19 22.16.38.jpg" width="400px"></center>

<center><img src="/assets/photo/2016-12-19 22.20.37.jpg" width="400px"></center>

집에 남아도는 전선으로 끈을 대신하였다. (철사라서 그런지 매우 단단하다.)

<center><img src="/assets/photo/2016-12-25 13.13.53.jpg" width="400px"></center>

핸들을 만들기 위해 아크릴 판에 구멍을 뚫어 가변저항을 넣고 고정시킨 모습이다.

<center><img src="/assets/photo/2016-12-25 13.22.29.jpg" width="400px"></center>

가변저항은 300도 밖에 움지이지 못하는데, 핸들은 좌 우 각각 한바퀴 반씩, 총 1080도를 돈다.
그래서 기어를 이용하여 핸들이 1080도를 돌때 가변저항은 300도를 돌도록 할 예정이다.

<center><img src="/assets/photo/2016-12-25 13.22.35.jpg" width="400px"></center>

가변저항 핀에 전선을 땜질하였다.

[JvJoyInterface-github]:          https://github.com/rlj1202/JvJoyInterface
[vJoy-site]:                      https://vjoystick.sourceforge.net/site/
