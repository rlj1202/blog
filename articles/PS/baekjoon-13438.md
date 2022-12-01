---
title: "백준 13438 - 계단 오르기 운동"
date: "2022-08-11 20:09"
tags:
  - DP
  - KMP
  - baekjoon
  - PS
published: true
---
## 문제

준규가 계단을 오르내리는 운동을 `U` 와 `D`로 이루어진 문자열로 표현할 때, `U`는 계단을 한 칸 오르고 `D`는 한 칸 내려감을 나타낸다.

처음 위치를 $0$이라고 할 때, 계단의 위치가 음수가 되는 일은 없다.

또한 처음 위치와 도착 위치는 $0$으로 같다.

문자열의 일부가 주어질 때, 만들 수 있는 가능한 문자열의 모든 경우의 수를 $1,000,000,009$으로 나눈 나머지를 구하시오.

[13438번: 계단 오르기 운동](https://www.acmicpc.net/problem/13438)

## 풀이

DP 배열을 다음과 같이 정의한다.

$$
dp[n][l][k]
$$

⇒ 길이 $n$인 문자열에서 일치하는 부분의 길이가 $l$이고 현재 계단의 위치가 $k$일 때 경우의 수.

따라서 가장 처음 기저값은 $dp[0][0][0] = 1$가 된다.

어떤 dp값이 $dp[n][l][k]$라고 할 때, 이 값 뒤에 `U`가 오게 된다면 $dp[n + 1][l^\prime][k + 1]$가 된다. $l^\prime$의 값은 $l$을 통해 현재 일치하는 문자열의 길이를 알 수 있으므로 KMP 알고리즘을 이용해서 fail 배열을 통해 구할 수 있다.

다음과 같이 나타내 볼 수 있겠다.

![](/assets/Pasted%20image%2020221118221653.png)

이미 주어진 문자열이 모두 일치하는 경우에는 뒤에 어떤 문자를 붙여도 되므로 `U` 혹은 `D`를 붙였을 때 $K$의 값이 변화함만 신경써 주면 되겠다.

```cpp:main.cpp
#include <bits/stdc++.h>

using namespace std;

typedef long long ll;
typedef pair<int, int> pii;

const ll MOD = 1e9 + 9;

ll pi[102];
ll dp[102][102][102];

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr);

    int N;
    string str;
    cin >> N;
    cin >> str;

    {
        int j = 0;
        for (int i = 1; str[i]; i++) {
            while (j && str[i] != str[j]) j = pi[j - 1];
            if (str[i] == str[j]) pi[i] = ++j;
        }
    }

    dp[0][0][0] = 1;

    for (int n = 0; n <= N - 1; n++) {
        for (int k = 0; k <= N; k++) {
            for (int l = 0; l < str.length(); l++) {
                for (int i = 0; i < 2; i++) {
                    char c = "UD"[i];
                    int delta = c == 'U' ? 1 : -1;

                    if (k + delta < 0) continue;

                    int cur = l;
                    while (cur && str[cur] != c) cur = pi[cur - 1];
                    if (str[cur] == c) cur++;

                    dp[n + 1][cur][k + delta] += dp[n][l][k];
                    dp[n + 1][cur][k + delta] %= MOD;
                }
            }

            dp[n + 1][str.length()][k + 1] += dp[n][str.length()][k];
            dp[n + 1][str.length()][k + 1] %= MOD;

            if (k - 1 >= 0) dp[n + 1][str.length()][k - 1] += dp[n][str.length()][k];
            if (k - 1 >= 0) dp[n + 1][str.length()][k - 1] %= MOD;
        }
    }

    cout << dp[N][str.length()][0] << '\\n';

    return 0;
}
```