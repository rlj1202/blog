---
layout:     post
title:      마인크래프트 한글 입력 모드 1.0.0 릴리즈 - 자바 에디션 1.14.4
categories:
tags:       [minecraft, forge, mod, hangulinput, programming]
date:       2019-08-07 23:59:32 +0900
---

# 모드 소개

한영키 대신 왼쪽 컨트롤 키를 이용하여 한글 입력을 전환하여, 한글을 입력하기 위한 모드입니다.

## 역사

마인크래프트의 옛날 버전에서는 한글이 입력되지 않아, 이를 해결하기 위해 고안되었습니다.
후에 신규 버전에서는 한글 입력이 가능하게 되었으나, 입력이 바로 바로 보이지 않고 한 키씩 밀려서 입력 되기 때문에 불편을 해소하고자 계속해서 개발되어 왔습니다.

![](/assets/posts/hangulinput-1.0.0/problem.png)

*한글을 입력하려고 하면 구석진 곳에 나온다*

# 설치 방법

설치 요구사항은 아래와 같습니다.

 * [Java](https://www.java.com/ko/) - Minecraft Forge 인스톨러 이용을 위해 필요합니다.
 * [Minecraft Forge 1.14.4](https://files.minecraftforge.net/maven/net/minecraftforge/forge/index_1.14.4.html) - 모드 적용을 위해 필요합니다.
 * [HangulInput-1.0.0.jar](https://github.com/rlj1202/HangulInput/releases/tag/1.0.0) 파일 - 적용할 모드 파일입니다.

아래와 같은 페이지에서 Installer를 클릭하시면 포지 인스톨러를 다운로드 할 수 있습니다.

<!-- more -->

![](/assets/posts/hangulinput-1.0.0/forge_page.png)

자바가 설치되었다면, 아래와 같은 아이콘으로 보이며 더블클릭하여 인스톨러를 실행할 수 있습니다.

![](/assets/posts/hangulinput-1.0.0/forge_installer_file.png)

Install client 에 체크가 되어있는지 확인하고 OK를 눌러 설치하시면 됩니다.

![](/assets/posts/hangulinput-1.0.0/forge_installer.png)


요구사항을 모두 만족하셨다면, ``%appdata%/.minecraft/mods`` 폴더에 다음과 같이
``HangulInput-1.0.0.jar`` 파일을 다운받아 넣어주세요.
(``%appdata%``의 대략적인 위치는 ``C:\Users\<name>\AppData\Roaming`` 입니다.)

![](/assets/posts/hangulinput-1.0.0/capture_0.png)

위 캡처에서 보이는 다른 한 파일은 쉐이더를 이용하기 위해 제가 따로 다운받은 것이니, 무시하시면 됩니다.

파일까지 넣으셨다면, 마지막으로 마인크래프트 런처에서 ``forge`` 프로파일이 선택된 것을 확인하고 플레이를 눌러주시면 됩니다.

![](/assets/posts/hangulinput-1.0.0/launcher.png)

# 사용 방법

사용 방법은 기존에 있던 모드들과 동일하게 왼쪽 컨트롤 키를 이용해서 한/영 전환을 하면 됩니다.

![](/assets/posts/hangulinput-1.0.0/screenshot_0.png)

채팅 입력 창에서는 그대로 왼쪽 아래에 현재 입력 모드가 나타납니다.

![](/assets/posts/hangulinput-1.0.0/screenshot_1.png)

표지판에서는 가운데 위에 있습니다.

![](/assets/posts/hangulinput-1.0.0/screenshot_2.png)

모루는 왼쪽 상단에,

![](/assets/posts/hangulinput-1.0.0/screenshot_3.png)

크리에이티브 모드 인벤토리 창에서는 왼쪽 상단에 있습니다.

![](/assets/posts/hangulinput-1.0.0/screenshot_4.png)

추가로, 월드 선택 창에서 검색 창 왼쪽에도 입력 모드 인디케이터가 있습니다.

텍스트 입력 필드 모두 동작 하나, 입력 모드 인디케이터는 없을 수 있습니다.
예로, 아래 모드 목록 화면의 검색란은 한글 입력이 가능하나, 입력 모드 인디케이터가 없습니다.

![](/assets/posts/hangulinput-1.0.0/screenshot_5.png)

(펄-럭)

간단 시연 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/0heqYohTLfA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# 동작 원리

왼쪽 컨트롤 키로 한글 입력 모드를 토글한 경우, 영문자가 입력 되었을 때 이를 중간에서 가로챕니다.
그런 뒤, 가로챈 영문자를 한글 자모로 변환하여 한글을 조합한 후, 가로챈 문자 대신 조합한 한글을 내보냅니다.

예를 들어 'd', 'k', 's', 's', 'u', 'd' 을 차례로 입력할 경우, 각각 키보드 키에 대응되는 한글 자모인 'ㅇ', 'ㅏ', 'ㄴ', 'ㄴ', 'ㅕ', 'ㅇ'로 변환되게 됩니다.
이는 각 입력시 마다 'ㅇ', '아', '안', 'ㄴ', '녀', '녕' 과 같이 조합되게 됩니다.

# 기술적 특징

기존의 한글 채팅 모드들은 입력을 가로채고 다시 내보내기 위해 원본 마인크래프트 소스코드를 뜯어서 가짜를 만들고, 만든 가짜에 하고자 하는 코드를 집어넣고, 다시 가짜를 마인크래프트에 적용하는 등의 많은 대똥꼬쇼(?)를 해야했습니다.

이러한 방법의 장점은 코드를 직접 집어넣기 때문에 그 동작이 확실하다는 것입니다.
단점은 유지보수가 어렵다는 점입니다. 마인크래프트는 코드가 난독화가 되어있어 매 릴리즈 마다 코드를 새로 해석해야 합니다. 또 매번 릴리즈 마다 포지 버젼도 바뀌기 때문에 가짜를 만들고 가짜를 적용하는 방법 또한 새로이 강구해야 할 수도 있습니다.

새롭게 개발한 모드에서는 최대한 편법을 쓰지 않고 개발하도록 노력했고, 포지에서 제공하는 기능을 최대한 활용하였습니다.
이로 인한 장점은 유지보수가 상대적으로 간편해 졌다는 것입니다. 코드를 뜯어볼 일이 없기 때문에 난독화를 신경쓰지 않아도 됩니다. 단점은 동작의 무결성을 보장할 수 없단는 것입니다. 물론 지금까지 개발하고 테스트 하였을 경우 대부분의 경우에서는 잘 동작함을 확인 하였으나, 어떤 예외가 있을지 짐작하기 어렵습니다.

# 기타

기타 궁금한 점이나 질문은 댓글로 남겨주세요.
