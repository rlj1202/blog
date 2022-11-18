---
title: "백준 5699 - 문자열 농장"
date: "2022-08-19 16:29"
tags:
  - baekjoon
  - PS
  - DAG
  - topological-sort
  - aho-corasick
---
[5699번: 문자열 농장](https://www.acmicpc.net/problem/5699)

문제에서 주어진 문자열을 트라이를 이용해서 저장해 두자. 그리고 아호 코라식을 이용해서 fail 노드까지 만들어 두자.

어떤 문자열 A가 다른 문자열 B의 이전 문자열 이기 위해서는 A가 B의 접미사 이거나 B의 노드 중 일부 노드의 fail이 문자열 A의 종점 노드를 가리키고 있으면 된다.

예를 들어, `an`라는 문자열은 `ant`의 접미사를 이루고 있으므로 `ant`의 이전 문자열이다.

`ant`라는 문자열은 `cant`라는 문자열의 이전 문자열이다. `cant`에서 `t`의 fail이 `ant`를 가리키고 있기 때문이다.

따라서, fail를 만들어 주면서 반대 방향 간선도 기록해 둔다. (나는 `inv_fail` 이라고 명명했다.) 그러면 trie의 go 변수와 inv_fail 변수를 통해 DAG 그래프가 만들어진다. 이를 위상 정렬을 이용해서 등장하는 단어가 가장 많은 횟수를 세주면 된다.

```cpp
#include <bits/stdc++.h>

using namespace std;

typedef long long ll;

struct trie {
    vector<pair<char, trie*>> go;
    trie *fail;
    vector<trie*> inv_fails;
    int indegrees;
    int max_value;
    bool output;

    trie() : fail(nullptr), output(false), indegrees(0), max_value(0) {
    }
    ~trie() {
        for (auto [c, node] : go) delete node;
    }

    trie *find(char c) {
        for (auto [cur_c, node] : go) {
            if (cur_c == c) return node;
        }
        return nullptr;
    }

    void insert(const char *str) {
        if (*str == '\\0') {
            output = true;
            return;
        }

        trie *next = this->find(*str);
        if (!next) {
            next = new trie();
            go.push_back({ *str, next });
            next->indegrees++;
        }
        next->insert(str + 1);
    }
};

int main() {
    ios::sync_with_stdio(false); cin.tie(nullptr); cout.tie(nullptr);

    while (true) {
        int N;
        cin >> N;
        if (!N) break;

        trie *root = new trie();

        for (int n = 0; n < N; n++) {
            string word;
            cin >> word;

            root->insert(word.c_str());
        }

        queue<trie*> q;
        q.push(root);
        root->fail = root;

        while (!q.empty()) {
            trie *cur = q.front(); q.pop();

            for (auto [c, next] : cur->go) {
                if (cur == root) {
                    next->fail = root;
                } else {
                    trie *dest = cur->fail;
                    while (dest != root && !dest->find(c)) dest = dest->fail;
                    if (dest->find(c)) dest = dest->find(c);

                    next->fail = dest;
                    dest->inv_fails.push_back(next);
                    next->indegrees++;
                }

                q.push(next);
            }
        }

        // 
        int answer = 0;
        q.push(root);

        while (!q.empty()) {
            trie *cur = q.front(); q.pop();

            answer = max(answer, cur->max_value);

            for (auto [c, next] : cur->go) {
                next->max_value = max(next->max_value, cur->max_value + next->output);
                if (--next->indegrees == 0) {
                    q.push(next);
                }
            }
            for (trie *next : cur->inv_fails) {
                next->max_value = max(next->max_value, cur->max_value + next->output);
                if (--next->indegrees == 0) {
                    q.push(next);
                }
            }
        }

        //
        cout << answer << '\\n';
        delete root;
    }

    return 0;
}
```