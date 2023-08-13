---
title: "백준 9359 - 서로소"
date: "2022-10-22 20:01"
tags:
  - baekjoon
  - PS
published: true
---
## 문제
자연수 $N$이 주어졌을 때, $A$보다 크거나 같고, $B$보다 작거나 같은 수 중에서 $N$과 서로소인 것의 개수를 구하는 프로그램을 작성하시오.

두 정수를 나눌 수 있는 양의 정수가 $1$밖에 없을 때, 두 정수를 서로소라고 한다. 즉, 두 수의 최대공약수가 $1$이면 서로소이다. $1$은 모든 정수와 서로소이다.

## 풀이
$[A, B]$에서 $N$과 서로소인 것의 갯수는 전체 개수에서 서로소인 것의 개수를 빼주면 된다.
$N$과 서로소인 것은 $N$의 소인수 중 하나의 배수이면 된다.

N의 소인수를 $p_1, p_2, p_3, \cdots, p_k$라고 할 때

$$
X_{p_i} = [A, B]에서\ p_i의 배수인\ 숫자의\ 집합
$$

라고 한다면 포함 배제의 원리를 이용해서 다음과 같이 풀어 쓸 수 있다.

$$
\begin{aligned}
& \mathrm{n}(X_{p_1} \cup X_{p_2} \cup \cdots \cup X_{p_k}) = \\
& + \mathrm{n}(X_{p_1}) + \mathrm{n}(X_{p_2}) + \cdots \\
& - \mathrm{n}(X_{p_1} \cap X_{p_2}) - \mathrm{n}(X_{p_1} \cap X_{p_3}) - \cdots \\
& + \mathrm{n}(X_{p_1} \cap X_{p_2} \cap X_{p_3}) + \cdots
\end{aligned}
$$

이 때 $N$의 크기가 $10^9$까지 이므로 소인수의 수는 많아봤자 $10$개 정도 밖에 되지 않는다. 따라서 모든 소인수 조합을 돌면서($\approx 2^{10} = 1024$) 포함 배제의 원리를 적용시켜주면 된다.

## 링크
- https://www.acmicpc.net/problem/9359

## 분류
- 포함 배제의 원리