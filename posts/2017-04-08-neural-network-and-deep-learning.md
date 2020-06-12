---
layout:     post
title:      뉴런 네트워크와 딥 러닝
date:       2017-04-08 20:44:00 +0900
categories: 
tags:       NeuralNetworksAndDeepLearning
---

이 글의 원문은 [https://neuralnetworksanddeeplearning.com](https://neuralnetworksanddeeplearning.com) 입니다. 이 번역 글은 이 책의 저작자표시-비영리 라이센스를 따릅니다. 또한 이 글 또한 같은 라이센스를 따릅니다.

개인적인 공부(인공지능과 영어)와 정보 공유를 위해 번역을 시작하게 되었으며, 번역과 영어에 미숙하기 때문에 여러 오역등이 있을 수 있으며 오역, 오타 등알 발견했을 때 댓글로 알려주시면 수정하도록 하겠습니다.

<!-- more -->

* [이 책이 다루고 있는 것][book_about]
* [제 1장 - 손으로 쓴 숫자를 인식하는 뉴런 네트워크 사용하기][chap1]
  * [퍼셉트론][perceptrons]
  * [시그모이드 뉴런][sigmoid]
  * [뉴런 네트워크의 구조][architecture]
  * [손으로 쓴 숫자를 구분하기 위한 간단한 네트워크][simple_network]
  * [기울기 하강 알고리즘으로 학습][gradient_descent]
  * [숫자들을 판별하기 위한 네트워크 구현하기][implementing_network]
  * [딥러닝을 향해][toward_deep_learning]
* [제 2장 - 역전파 알고리즘이 어떻게 작동하는가][chap2]
  * [준비운동: 뉴런 네트워크로 부터의 결과를 계산하기 위한 빠른 행렬 기반 접근 방법][warm_up]
  * [비용함수에 대해 필요한 두 가지 추정][two_assumptions]
  * [하다마드 곱][hadamard]
  * [역전파에 대한 네 가지 중요한 공식][four_equations]
* [제 3장 - 뉴런 네트워크가 학습하는 방법 향상하기][chap3]
  * 교차 엔트로피 비용 함수
  * 과적합과 일반화
  * 가중치 초기화
  * 손글씨 인식문제 다시보기: 코드
  * 뉴런 네트워크의 hyper-parameter를 어떻게 선택하는가?
  * 다른 기술들
* 제 4장 - 뉴런 네트워크가 어떤 함수라도 계산 가능하다는 시각적 증명
  * Two caveats
  * Univerality with one input and one output
  * Many input variables
  * Extension beyond sigmoid neurons
  * Fixing up the step functions
  * Conclusion
* 제 5장 - 왜 딥 뉴런 네트워크는 학습하기 어려운가?
  * The vanising gradient problem
  * What's causing the vanishing gradient problem? Unstable gradients in deep neural nets
  * Unstable gradients in more complex networks
  * Other obstacles to deep learning
* 제 6장 - 딥 러닝
  * Introducing convolutional networks
  * Convolutional neural networks in practice
  * The code for our convolutional networks
  * Recent progress in image recognition
  * Other approaches to deep neural nets
  * On the future of neural networks
* Appendix: Is there a simple algorithm for intelligence?
* Acknowledgements
* Frequently Asdked Questions

아래서 부터는 해당 온라인 책의 내용입니다.

------

뉴런 네트워크와 딥 러닝은 온라인으로 읽을 수 있는 무료 책 입니다. 이 책에서는 다음과 같은것을 배울 수 있습니다.

* 뉴런 네트워크, 관측 가능한 데이터로 부터 학습하는 컴퓨터를 가능하게 하는 아름다운 생물학적 프로그래밍 패러다임
* 딥 러닝, 뉴런 네트워크의 학습을 위한 강력한 기술

뉴런 네트워크와 딥 러닝은 현재 이미지 인식, 음성 인식, 자연어 처리 등의 많은 문제들의 가장 좋은 해결책을 제공하고 있습니다. 이 책은 뉴런 네트워크와 딥 러닝에 있어서 가장 핵심적인 개념들을 여러분에게 알려줄 것입니다.

이 책에서 사용되는 접근법에 대해서 더 자세히 알고싶다면, [여기][book_about]를 참고하세요. 또는 바로 [제 1장][chap1]으로 건너가 시작할 수 있습니다.

[book_about]: {{ site.baseurl }}{% post_url 2017-04-08-what-this-book-is-about %}
[chap1]:      {{ site.baseurl }}{% post_url 2017-04-08-neuralnet-chap1-using-neural-nets-to-recognize-handwritten-digits %}
[perceptrons]: {{ site.baseurl }}{% post_url 2017-04-08-perceptrons %}
[sigmoid]: {{ site.baseurl }}{% post_url 2017-04-08-sigmoid-neurons %}
[architecture]: {{ site.baseurl }}{% post_url 2017-04-09-the-architecture-of-neural-networks %}
[simple_network]: {{ site.baseurl }}{% post_url 2017-04-09-a-simple-network-to-classify-handwritten-digits %}
[gradient_descent]: {{ site.baseurl }}{% post_url 2017-04-11-learning-with-gradient-descent %}
[implementing_network]: {{ site.baseurl }}{% post_url 2017-04-15-implementing-our-network-to-classify-digits %}
[toward_deep_learning]: {{ site.baseurl }}{% post_url 2017-04-18-toward-deep-learning %}
[chap2]: {{ site.baseurl }}{% post_url 2017-04-18-neuralnet-chap2-how-the-backpropagation-algorithm-works %}
[warm_up]: {{ site.baseurl }}{% post_url 2017-04-18-warm-up-a-fast-matrix-based-approach-to-computing-the-output-from-a-neural-network %}
[two_assumptions]: {{ site.baseurl }}{% post_url 2017-04-18-the-two-assumptions-we-need-about-the-cost-function %}
[hadamard]: {{ site.baseurl }}{% post_url 2017-04-18-the-hadamard-product %}
[four_equations]: {{ site.baseurl }}{% post_url 2017-04-18-the-four-fundamental-equations-behind-backpropagation %}
[chap3]: {{ site.baseurl }}{% post_url 2017-05-14-neuralnet-chap3-improving-the-way-neural-networks-learn %}
