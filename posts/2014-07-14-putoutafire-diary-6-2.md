---
layout:     post
title:      게임 개발 일지 - 6-2.시야 가시 또는 빛 그림자 렌더링 (완성)
date:       2014-07-14 17:46:00 +0900
categories: 
tags:       PutOutAFire
---

오늘 드디어 시야 가시 즉, 볼 수 없는 구역을 까맣게 하는 렌더링 코드를 완성했습니다! (와아아앙!!!!<img src="https://i1.daumcdn.net/mimg/mypeople/sticker/edit/sticker_372.png" alt="홧팅2" height="42" width="42">)
대신에 렉이 아주 먹는군요. 이 부분을 렌더링 안할때는 300 fps 나오는데 렌더링 하면 25 fps 로 확 내려간다는 사실...ㅠㅠ
알아보니, 볼 수 없는 구역을 찾은 후 그곳을 까만색으로 칠하는 메소드가 시간을 좀 잡아 먹더라구요. 그 메소드를 실행하는 부분만 빼면 한 100 fps 정도? 나오는것 같네요. 목표 fps 는 120 fps 정도인데 그정도면...그래도 렉이 걸리는 편이군요
여튼 이 렌더링 코드는 게임 만들면서 일단 보류 하고 더 효율성 있게 계산 가능한 알고리즘이 나오면 그때 해보도록 해야겠습니다.

여튼 완성해 놓으니 기분이 좋군요!!!!!!!<img src="https://i1.daumcdn.net/mimg/mypeople/sticker/edit/sticker_330.png" alt="굿보이">

<center><iframe title="게임 개발 일지 - 6-2.시야 가시 또는 빛 그림자 렌더링 (완성)" width="640" height="360" src="https://kakaotv.daum.net/embed/player/cliplink/60282993?service=daum_tistory" allowfullscreen frameborder="0" scrolling="no"></iframe></center>
