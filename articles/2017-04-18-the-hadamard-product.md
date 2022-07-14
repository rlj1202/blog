---
layout:     post
title:      하다마드 곱
date:       2017-04-18 19:48:16 +0900
categories: 
tags:       NeuralNetworksAndDeepLearning
---

역전파 알고리즘은 일반적인 선형 대수학 연산자를 기반으로 합니다. 백터의 덧셈, 행렬으로 백터를 곱하는 등등... 하지만 한 연산자는 보통 잘 사용되지 않습니다. 특히, 같은 차원의 두 백터 $s$, $t$가 있다고 가정해 봅시다. 그러면 우리는 $s\odot t$를 두 백터의 각 성분마다의 곱으로 사용할 수 있습니다. 따라서 $s\odot t$의 연산은 단지 $(s\odot t)_j=s_j t_j$으로 이루어 집니다. 예를 들면,

$$\begin{eqnarray}\left[\begin{array}{c} 1 \\ 2 \end{array}\right]   \odot \left[\begin{array}{c} 3 \\ 4\end{array} \right]= \left[ \begin{array}{c} 1 * 3 \\ 2 * 4 \end{array} \right]= \left[ \begin{array}{c} 3 \\ 8 \end{array} \right].\tag{28}\end{eqnarray}$$

이런 종류의 성분마다의 곱은 가끔 하다마드 곱 또는 Schur product 라고 불립니다. 우리는 이것을 하다마드 곱으로 부를겁니다. 좋은 행렬 라이브러리는 보통 하다마드 곱의 빠른 구현을 제공하고 역전파를 구현할때 굉장히 편리합니다.

