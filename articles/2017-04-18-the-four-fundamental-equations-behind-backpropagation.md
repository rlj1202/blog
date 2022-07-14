---
layout:     post
title:      역전파에 대한 네가지 중요한 공식(작성중)
date:       2017-04-18 19:57:43 +0900
categories: 
tags:       NeuralNetworksAndDeepLearning
---
역전파는 어떻게 네트워크에서의 가중치와 $bias$의 변화가 비용함수를 바꾸는지에 대한 이해에 관한 것 입니다. 궁극적으로, 이는 $\partial C/\partial w^l_{jk}$ 그리고 $\partial C/\partial b^l_j$에 대한 편미분을 계산하는 것을 의미합니다. 그러나 이것을 계산하기 위해서 우리는 먼저 $l^{th}$ 층에 있는 $j^{th}$뉴런에서 error 라고 부르는 $\delta^l_j$라는 중간값을 소개하려고 합니다. 역전파는 error $\delta^l_j$를 계산하기 위한 과정을 말해주며 $\delta^l_j$를 $\partial C/\partial w^l_{jk}$와 $\partial C/\partial b^l_j$와 관련지어줍니다.

어떻게 error 가 정의되는지 이해하기 위해서, 우래의 네트워크에 악마가 하나 있다고 상상해 봅시다.

<center><img src="/assets/neuralnet/tikz19.png" style="max-width:100%;height:auto"  height="240" width="583"/></center>

<!-- more -->

$l$층에 있는 $j^{th}$ 뉴런에 악마가 있군요. 뉴런에 입력이 들어옴에 따라, 악마는 뉴런의 작동에 장난을 칠겁니다. 이 장난은 뉴런의 가중치 계산이 된 입력값에 작은 변화 $\Delta z^l_j$ 를 가할것이고, 뉴런은 $\sigma (z^l_j)$를 출력으로 내보내는 대신에 $\sigma (z^l_j + \Delta z^l_j)$를 내보낼 것 입니다. 이러한 변화는 네트워크의 나머지 층을 통해 전파되어, 결국에는 전체적인 비용에 대해 $\frac{\partial C}{\partial z^l_j} \Delta z^l_j$만큼의 변화를 만들어 낼 것입니다.

이제, 이 악마는 좋은 악마입니다. 그리고 비용을 향상시키기 위해 여러분에게 도움을 줄 것입니다. 악마는 비용을 작게 만들 수 있는 $\Delta z^l_j$를 찾으려고 노력할 것 입니다. $\frac{\partial C}{\partial z^l_j}$가 굉장히 큰 값을 가지고 있다고 가정해 봅시다(양수든 음수든). 그러면 악마는 $\frac{\partial C}{\partial z^l_j}$와는 반대의 부호를 가지는 $\Delta z^l_j$를 선택함으로써 비용함수의 값을 좀 낮출 수 있습니다. 반대로, $\frac{\partial C}{\partial z^l_j}$가 0에 가깝다면, 악마는 가중치가 계산된 $z^l_j$의 값을 통해 비용함수의 값을 개선할 수 없을 것 입니다. 그렇게 된다면 악마는 뉴런이 이미 꽤 잘 학습하였다고 말할 수 있습니다. 그리고 $\frac{\partial C}{\partial z^l_j}$가 뉴런의 error의 값의 척도라는 경험적인 것을 알 수 있군요.

이 이야기로부터 영감을 받아, 우리는 $l$ 층의 $j$ 뉴런의 error $\delta^l_j$를 다음과 같이 정의할 수 있습니다.

$$\begin{eqnarray}   \delta^l_j \equiv \frac{\partial C}{\partial z^l_j}.\tag{29}\end{eqnarray}$$
