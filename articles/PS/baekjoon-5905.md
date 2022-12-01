---
title: '백준 5905 - 악당 로봇'
date: '2022-08-11 20:35'
tags:
  - baekjoon
  - PS
published: true
---

## 문제

길이 $15$ 이하의 $N$개의 문자열들과, $1000$ 이하의 자연수 $K$가 주어진다. N개의 문자열이 길이가 $K$인 임의의 문자열에서 등장할 수 있는 최대 갯수를 구하시오.

문제 예제를 살펴보면 “ABA”, “CB”, “ABACB”가 주어지고 K는 7이다. 주어진 문자열은 최대 4번 등장할 수 있고, 예로 “ABACBCB”가 있다. “ABA”가 한 번, “CB”가 두 번, “ABACB”가 한 번 등장한다.

[5905번: 악당 로봇](https://www.acmicpc.net/problem/5905)

[USACO](http://www.usaco.org/index.php?page=jan12problems)

[luogu P3041 [USACO12JAN]视频游戏的连击 Video Game Combos*lahlah*的博客-CSDN 博客](https://lahlah.blog.csdn.net/article/details/98952482)

## 풀이

풀이 자체는 [계단 오르기 운동](https://www.acmicpc.net/problem/13438)과 비슷하다. 차이점이라면 경우의 수가 아니라 최대 횟수인 점, 고려해야 하는 문자열이 $1$개가 아니라 여러개이기 때문에 KMP가 아니라 아호코라식을 이용한 점이다.

dp 배열은 길이가 $i$인 문자열에서 현재 $j$번 트라이 노드까지 탐색되었을 때 최대값이다. 트라이 노드의 번호를 인덱스로 쓰기 위해서 동적 할당을 쓰지 않았다.

또, 같은 자리에 여러개의 문자열이 동시에 나올 수 있으니 그 수를 헤아리기 위해서 아호코라식에서 output 변수를 boolean이 아닌 int형 변수로 선언하여 insert 및 fail build 시에 값을 계산해주었다.

유사코 공식 풀이가 다 이해가 되지 않았지만 문자열의 수와 길이가 크지 않아 아호코라식을 굳이 쓰지 않고도 계산할 수 있던 것으로 보인다.

```cpp
#include <bits/stdc++.h>

using namespace std;

typedef long long ll;
typedef pair<int, int> pii;

int last_id = 1;
int go[20 * 15 + 2][3];
int fail[20 * 15 + 2];
int output[20 * 15 + 2];

void insert(const char *str) {
    int cur_id = 1; // 1 = root

    while (true) {
        if (*str == '\\0') {
            output[cur_id]++;
            break;
        }

        int idx = *str - 'A';
        if (!go[cur_id][idx]) {
            go[cur_id][idx] = ++last_id;
        }
        cur_id = go[cur_id][idx];

        str++;
    }
}

int dp[1003][20 * 15 + 2];

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr);

    int N, K;
    cin >> N >> K;
    for (int n = 0; n < N; n++) {
        string str;
        cin >> str;
        insert(str.c_str());
    }

    queue<int> q;
    q.push(1);
    fail[1] = 1;

    while (!q.empty()) {
        int cur_id = q.front();
        q.pop();

        for (int i = 0; i < 3; i++) {
            int next_id = go[cur_id][i];
            if (!next_id) continue;

            if (cur_id == 1) {
                fail[next_id] = 1;
                q.push(next_id);
                continue;
            }

            int dest_id = fail[cur_id];
            while (dest_id != 1 && !go[dest_id][i]) {
                dest_id = fail[dest_id];
            }

            if (go[dest_id][i]) {
                dest_id = go[dest_id][i];
            }

            fail[next_id] = dest_id;
            if (output[dest_id]) {
                output[next_id] += output[dest_id];
            }

            q.push(next_id);
        }
    }

    memset(dp, -1, sizeof(dp));

    dp[0][1] = 0;

    for (int k = 0; k <= K; k++) {
        for (int id = 1; id <= last_id; id++) {
            if (dp[k][id] == -1) continue;

            for (int i = 0; i < 3; i++) {
                int cur = id;

                while (cur != 1 && !go[cur][i]) {
                    cur = fail[cur];
                }
                if (go[cur][i]) cur = go[cur][i];

                dp[k + 1][cur] = max(dp[k + 1][cur], dp[k][id] + output[cur]);
            }
        }
    }

    int answer = 0;

    for (int i = 1; i <= last_id; i++) {
        answer = max(answer, dp[K][i]);
    }

    cout << answer << '\\n';

    return 0;
}
```
