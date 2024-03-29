---
title: 'Bottom-up으로 알아보는 SSL/TLS'
subtitle: ''
date: '2023-07-08 00:04'
tags:
  - SSL
  - TLS
published: true
---

## SSL/TLS은 무엇인가요?

SSL은 **Secure Sockets Layer**의 약자로, 컴퓨터 네트워크에 통신 보안을 위해 설계된 암호 규약입니다. [https](https://ko.wikipedia.org/wiki/HTTPS) 프로토콜에 사용됩니다. 이 글에서는 실제 hand-shaking과정 또는 메세지 포맷 등 구체적인 작동 절차에 대한 내용은 포함하지 않습니다. 이러한 절차가 어떠한 필요로 인해 생겼는지, 어떻게 해서 실제로 네트워크 상에서 양단의 두 사용자가 안전하게 정보를 주고받을 수 있었는지 등의 내용을 공부하면서 정리해본 글입니다.

## 비밀 편지를 주고받고 싶어요

![](/assets/bottom-up-ssl-tls/image-20230813174148877.png)

철수와 영희가 안전하게 비밀 편지를 주고받고자 합니다. 따라서 편지의 내용을 암호화 하고 복호화 할 수 있는 방법을 찾아야 합니다. 암호화 방식에는 크게 **대칭키** 방식과 **비대칭키** 방식이 있습니다. 대칭키 방식은 하나의 키로 암호화 및 복호화를 모두 할 수 있는 방식을 말하고, 비대칭키 방식은 하나의 키로는 암호화를 하고 다른 키로 복호화를 해야하는 방식을 말합니다. 이 때 두 키를 **공개키**, **비밀키**(혹은 개인키)라고 합니다. 철수와 영희가 편지로 비밀을 주고받기 이전에 대면으로 먼저 만나서 서로 대칭키 혹은 비대칭키를 한 번만 교환하고 나면 그 후부터는 서로 안전하게 비밀 편지를 주고받을 수 있을 것입니다. 둘 중 어떤 방식을 선택하는 것이 좋을까요?

비대칭키 방식은 대칭키 방식과 비교해서 암호화 및 복호화를 하는데 더 많은 시간과 비용이 소모됩니다. 편지의 내용이 많으면 많아질수록 더욱 그렇습니다. 매번 이 방식으로 편지를 주고 받는다면 두 사람 모두 금방 지칠 것입니다. 그래서 비대칭키 대신 대칭키를 사용해서 서로 편지의 내용을 암호화하여 주고받기로 결정합니다. 여기까지 정한 절차는 이렇습니다.

> 1. 철수는 대칭키로 편지를 암호화하여 영희에게 보낸다.
> 2. 영희는 대칭키로 편지를 복호화한다.

반대로 영희가 철수에게 편지를 보낼 때도 마찬가지입니다.

## 대칭키는 무엇으로 정하지?

철수와 영희가 서로 사전에 대면으로 만나서 키를 하나 정하고 나면 서로 비밀 편지를 주고 받는데 아무런 문제가 없을 것입니다. 하지만 과연 그럴까요? 우리는 항상 우리가 주고받는 편지를 **제3자가 훔쳐볼 수 있음**을 유의해야 합니다.

제3자가 철수와 영희가 주고받는 편지를 우체국에서 훔쳐보고 있다고 생각해 봅시다. 물론 어느 경우에서든 제3자가 메세지를 해독할 수는 없을겁니다. 대신 제3자는 동일한 내용의 편지를 똑같이 보내어 두 사람을 괴롭힐 수 있습니다. 예로, 제3자가 재미로 철수가 적은 어떤 편지를 매일 똑같이 영희에게 보낸다고 해봅시다. 그런데 편지의 내용이 내일 3시에 만나자는 내용이었다면? 이런 식의 장난을 매일 한다면 철수와 영희는 대화의 내용을 다른 사람이 볼 수 없을지언정 제대로된 소통을 할 수 없을 것입니다. 이런 식의 공격 방식을 [Man-In-The-Middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), [Replay Attack](https://en.wikipedia.org/wiki/Replay_attack)이라고 합니다. (물론 예시를 무엇으로 드냐에 따라 이 공격이 위험할 수도, 위험하지 않을 수도 있겠지만 온라인 쇼핑몰에서 물건을 구매하는 내용이었다면 실제로 재정적인 피해를 입힐 수 있을겁니다.)

여기서 발생하는 문제는 편지를 보내는 사람이 진짜로 영희가 맞는지, 철수가 맞는지 신뢰할 수 없다는 겁니다. 편지를 보낼 때 마다 다른 대칭키를 사용해 본다면 어떨까요? 어떤 규칙을 이용해서 편지를 주고 받을 때 마다 철수와 영희 모두 같은 대칭키를 만들고 편지를 보낸다면 제3자가 편지를 복사해서 보낸다고 하더라도 그 시점에서 그 편지를 암호화 할 때 사용했던 대칭키는 더 이상 의미가 없을테니 애초에 복호화도 할 수 없을 것입니다.

철수가 편지를 보내기 전에 대칭키를 아무거나 하나 정해서 영희에게 알려줄 수 있으면 좋을 것 같습니다. 이 때 비대칭키를 사용하면 좋을 것 같습니다! 대칭키는 편지에 비하면 길이가 짧으니 암호화 및 복호화 하는 데 부담이 없고 한 번만 암호화 및 복호화를 하면 됩니다. 물론 지금은 공개키-비밀키 쌍을 서로 미리 알고 있는 상태라고 가정합니다.

> 1. 철수는 공개키로 대칭키를 암호화하여 영희에게 보낸다.
> 2. 영희는 비밀키로 대칭키를 복호화한다.
> 3. 철수는 편지를 대칭키로 암호화하여 영희에게 보낸다.
> 4. 영희는 편지를 알아낸 대칭키로 복호화한다.

조금 복잡해지긴 했지만 내용도 암호화 되어있고 누가 보냈는지도 신뢰할 수 있습니다. 그럼 여기서 끝일까요? 사실, 아직 같은 문제가 여전히 존재합니다. 제3자는 편지를 같은 순서로만 보내면 영희는 철수가 편지를 보낸 줄 알겁니다. 제3자가 1번 과정에서 보낸 편지를 영희가 받으면 영희는 그 때 철수가 사용한 대칭키를 알 수 있고, 3번 과정에서 보낸 편지를 영희가 받으면 영희는 여전히 편지의 내용을 복호화 할 수 있습니다. 즉, 편지를 보내는 횟수만 많아지고 위에서 발생한 Replay Attack이 여전히 가능합니다. [^stackexchange-1] [^stackexchange-2]

[^stackexchange-1]: https://security.stackexchange.com/questions/218491/why-using-the-premaster-secret-directly-would-be-vulnerable-to-replay-attack
[^stackexchange-2]: https://security.stackexchange.com/questions/89383/why-does-the-ssl-tls-handshake-have-a-client-and-server-random?rq=1

왜 이런 문제가 발생했을까요? 그 이유는 대칭키를 정하는 데 철수만 개입했기 때문입니다. 철수가 대칭키를 만들었으니, 영희는 그냥 그 대칭키를 사용할 수 밖에 달리 도리가 없습니다. 따라서 영희도 같이 대칭키를 만들어야 합니다. 이번에는 추가로 철수와 영희 모두 대칭키를 만들기 위해 값을 아무거나 하나 정해서 서로 알려주도록 합시다.

> 1. 철수는 영희에게 아무렇게 정한 값을 보낸다.
> 2. 영희는 철수에게 아무렇게 정한 값을 보낸다.
> 3. 철수는 공개키로 대칭키를 암호화하여 영희에게 보낸다.
> 4. 영희는 비밀키로 대칭키를 복호화한다.
> 5. 철수와 영희는 서로 가지고 있는 두 개의 값 및 대칭키를 이용해서 새로운 대칭키를 만든다.
> 6. 철수는 편지를 새로 만든 대칭키로 암호화하여 영희에게 보낸다.
> 7. 영희는 편지를 새로 만든 대칭키로 복호화한다.

이렇게 하면 제3자는 더 이상 편지를 같은 순서로 보내는 것으로는 두 사람을 방해할 수 없습니다. 제3자가 1번 과정에서 보낸 편지를 영희에게 보내면 영희는 이번에는 다른 값을 보낼겁니다. 물론 제3자는 1, 2번 과정에서 두 사람이 서로에게 보낸 값을 알 수 있습니다만 철수가 공개키로 암호화한 대칭키를 알 수 없으니 5번 과정에서 부터는 제3자가 가지고 있는 메세지는 무용지물입니다. 여기서 3번과정에서 철수가 보낸 대칭키를 **pre-master secret key**, 5번 과정에서 새롭게 만드는 대칭키를 **master secret key**라고 합니다.

> 한글로 검색한 자료에서 대부분 pre-master secret key를 두 사람이 보낸 아무렇게 정한 값을 조합해서 만든다는 식으로 모호하게 설명하고 있습니다. [^ssl-korean-article-1] [^ssl-korean-article-2] [^ssl-korean-article-3] [^ssl-korean-article-4] 그리고 master secret key는 pre-master secret key를 '일련의 과정을 거쳐' 생성한다는 식으로만 되어있습니다. (단순 타 블로그 스크랩 글이 굉장히 많은 것 같습니다.) 영어로 검색한 자료에서는 이렇게 설명하고 있는 글은 없었습니다. [^ssl-english-article-1] [^ssl-english-article-2] [^ssl-english-article-3] [^ssl-english-article-4] [^ssl-english-article-5] 처음에 SSL에 대해 공부하면서 혼란스러웠던 부분입니다. pre-master secret key를 제3자가 쉽게 알아낼 수 있는 값으로만 생성한다면 의미가 없을텐데 말입니다. 글을 작성하는 시점에서 제가 이해한 바로는, pre-master secret key 또한 랜덤하게 생성되는 데이터입니다.

[^ssl-korean-article-1]: https://opentutorials.org/course/228/4894
[^ssl-korean-article-2]: https://rat2.tistory.com/5
[^ssl-korean-article-3]: https://goodgid.github.io/TLS-SSL/
[^ssl-korean-article-4]: https://juliecho.tistory.com/2
[^ssl-english-article-1]: https://www.thesslstore.com/blog/explaining-ssl-handshake/
[^ssl-english-article-2]: https://crypto.stackexchange.com/questions/27131/differences-between-the-terms-pre-master-secret-master-secret-private-key
[^ssl-english-article-3]: http://www.moserware.com/2009/06/first-few-milliseconds-of-https.html
[^ssl-english-article-4]: https://www.acunetix.com/blog/articles/establishing-tls-ssl-connection-part-5/
[^ssl-english-article-5]: https://www.baeldung.com/cs/pre-master-shared-secret-private-public-key

## 비대칭키의 공개키는 믿을 수 있는가?

이제 제3자가 철수와 영희의 편지의 내용을 훔쳐볼 수도, 두 사람을 방해할 수도 없습니다. 물론 아직까지는 두 사람이 비대칭키를 서로 알고 있다고 가정한 상태입니다. 사전에 비대칭키를 주고받을 수 없는 상황에서도 안전하게 편지를 주고받을 수 있을까요?

비대칭키이기 때문에 철수와 영희 둘 중 한 명만 키 쌍을 가지고 있어도 편지를 주고받기 시작할 수 있습니다. 영희가 비대칭키 쌍을 가지고 있다고 해봅시다. 영희가 철수에게 공개키를 편지에 적어 보내주는 것은 아무런 문제가 없습니다. 공개키만으로는 암호화만 가능하기 때문입니다. 좋습니다! 일단 그러면 공개키를 편지로 전달하는 과정을 추가해보도록 합시다.

> 1. 철수는 영희에게 아무렇게 정한 값을 보낸다.
> 2. 영희는 철수에게 아무렇게 정한 값을 보낸다.
> 3. 영희는 철수에게 공개키를 보낸다.
> 4. 철수는 영희가 보낸 공개키로 대칭키를 암호화하여 영희에게 보낸다.
> 5. 영희는 비밀키로 대칭키를 복호화한다.
> 6. 철수와 영희는 서로 가지고 있는 두 개의 값 및 대칭키를 이용해서 새로운 대칭키를 만든다.
> 7. 철수는 편지를 새로 만든 대칭키로 암호화하여 영희에게 보낸다.
> 8. 영희는 편지를 새로 만든 대칭키로 복호화한다.

간단히 3번 과정을 추가하는 것으로 사전에 만날 필요 없이 안전하게 편지를 주고받을 수 있게 되었습니다. 하지만 이번에는 다른 문제가 발생했습니다. 바로 제3자가 영희를 사칭할 수 있다는 것입니다. 만약 제3자가 3번 과정에서 영희를 사칭하여 자신이 만든 비대칭키 쌍의 공개키를 전달한다면 어떻게 될까요? 제3자는 이후 과정에서 문제없이 철수와 편지를 주고받을 수 있습니다. 이 경우 제3자는 영희와 철수가 서로 안전하게 소통하고 있다고 믿게 하면서 편지의 내용물을 모두 읽어낼 수 있습니다. 4번 과정에서 제3자는 일단 자신의 비밀키로 대칭키를 알아낸 다음, 영희의 공개키로 다시 대칭키를 암호화 하여 영희에게 보냅니다. 새 대칭키를 만드는데 필요한 세 값을 모두 알 수 있으니, 편지의 내용을 모두 까볼 수 있습니다.

이번에는 영희가 보낸 공개키가 정말 영희의 것인지 확신할 수 없다는 문제가 발생했습니다. 누군가 영희의 것이 맞는지 확인해 줄 필요가 있습니다. 그리고 그 누군가는 정말 아무나 신뢰할 수 있을만한 사람이어야 할 것입니다. 여기서는 대충 대통령으로 해봅시다. 한 나라의 대통령이 보증해주는 공개키라면 신뢰할 수 있지 않을까요? 여기서는 **전자 서명(Digital Signature)** 이라는 방법이 사용됩니다. (전자 서명에 대해서는 여기서 설명하지 않겠습니다.) 대통령은 대통령의 비밀키쌍을 가지고 있고, 공개키는 국민에게 공개되어있다고 해봅시다. 그리고 대통령이 비밀키로 '이 공개키는 영희의 공개키가 맞습니다' 라는 내용 및 공개키가 적힌 문서를 전자 서명하여 영희에게 주었다고 해봅시다. 위 3번 과정에서 영희는 공개키 대신 전자 서명된 문서를 철수에게 준다면 철수는 해당 문서를 대통령의 공개키를 이용해서 검증합니다. 이런 식으로 철수는 영희가 맞음을 확신할 수 있습니다.

![](/assets/bottom-up-ssl-tls/image-20230813174113689.png)

여기서 대통령이 서명해 준 문서를 **인증서(Certificate)** 라고 하고, 대통령 처럼 인증서를 발급해 주는 주체를 **CA(Certificate Authority)** 라고 합니다. 여기서 부터는 [신뢰의 체인 관계](https://en.wikipedia.org/wiki/Chain_of_trust)가 형성됩니다. 영희의 공개키를 대통령이 보증해 줬다면, 대통령의 공개키는 누가 보증해 줄지에 대한 문제입니다. UN 같은 기관에서 대통령의 공개키를 보증해 주었다면, UN의 공개키는 누가 보증해 줄까요? 결국에는 최종적으로 신뢰할 수 있는 최상위 주체가 필요합니다. 이를 **Root CA** 라고 합니다.

![](/assets/bottom-up-ssl-tls/image-20230813174136716.png)

실제로 각 컴퓨터에는 위 사진처럼 미리 준비된 Root CA의 인증서들이 들어있습니다.

영희가 공개키를 보내는 것이 아니라 공개키 및 전자서명 정보가 담긴 인증서를 보내고, 철수가 이를 검증하는 과정을 추가해 봅시다.

> 1. 철수는 영희에게 아무렇게 정한 값을 보낸다.
> 2. 영희는 철수에게 아무렇게 정한 값을 보낸다.
> 3. 영희는 철수에게 인증서를 보낸다.
> 4. 철수는 영희가 보낸 인증서를 검증한다.
> 5. 철수는 영희가 보낸 인증서 내의 공개키로 대칭키를 암호화하여 영희에게 보낸다.
> 6. 영희는 비밀키로 대칭키를 복호화한다.
> 7. 철수와 영희는 서로 가지고 있는 두 개의 값 및 대칭키를 이용해서 새로운 대칭키를 만든다.
> 8. 철수는 편지를 새로 만든 대칭키로 암호화하여 영희에게 보낸다.
> 9. 영희는 편지를 새로 만든 대칭키로 복호화한다.

물론, 이렇게 하더라도 여전히 제3자가 이 둘 사이를 방해할 방법은 존재합니다. 컴퓨터에 담긴 Root CA 인증서를 바꿔치기 한다거나, Root CA 인증서를 다운로드 받는 주소의 DNS를 교란시키는 등 다양합니다.

## 참고 자료

- https://ko.wikipedia.org/wiki/전송_계층_보안
- https://en.wikipedia.org/wiki/Man-in-the-middle_attack
- https://en.wikipedia.org/wiki/Replay_attack
- https://www.enea.com/insights/a-new-way-of-detecting-tls-ssl-mitm-attacks/
