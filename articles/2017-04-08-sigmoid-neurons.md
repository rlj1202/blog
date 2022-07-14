---
layout:     post
title:      시그모이드 뉴런
date:       2017-04-08 23:02:27 +0900
categories: 
tags:       NeuralNetworksAndDeepLearning
---

학습 알고리즘은 매우 획기적으로 들립니다. 하지만 어떻게 우리가 뉴런 네트워크를 위한 그런 알고리즘을 창안할 수 있을까요? 우리가 어떤 문제를 풀기위해 학습을 할 퍼셉트론의 네트워크를 가지고 있다고 가정해 봅시다. 예를 들어, 네트워크의 입력값은 손으로 쓴 숫자 이미지를 스캔한 픽셀 데이터 일 것입니다. 그리고 우리는 가중치와 $bias$값들을 조정하여 정확한 숫자의 결과를 내놓는 네트워크를 원할 것 입니다. 어떻게 학습이 이뤄지는지 보기 위하여 우리가 네트워크에서 가중치 또는 $bias$에서 작은 변화를 주었다고 가정해 봅시다. 우리가 원하는 결과는 우리가 가중치 또는 $bias$에 준 작은 변화가 오직 네트워크의 출력값에 원하는 작은 변화가 일어나는 것 입니다. 이런 특징이 학습이 가능토록 하는 부분입니다. 도식으로 우리가 원하는 결과를 그려보았습니다. (당연히 이 네트워크는 손글씨를 인식하기에는 너무 간단합니다!)

<center><img src="/assets/neuralnet/tikz8.png" style="max-width:100%;height:auto"  height="270" width="487"/></center>

만약 우리가 준 작은 변화가 작은 변화만을 준것이 사실이라면, 우리는 이 사실을 우리가 원하는 방향으로 행동하도록 네트워크의 가중치와 bias를 조정하는데 적용할&nbsp;수 있을것입니다. 예를 들어, 우리의 네트워크가 8이 그려진 이미지를 9라고 인식했다고 잘못 학습됬다고 가정하여 봅시다. 우리는 네트워크가 이 이미지가 9라고 더 가깝게 판정하도록 어떻게 가중치와 $bias$에 작은 변화를 줄것인지 알아낼 수 있을것입니다. 이것을 반복하다 보면 결과는 점점 더 좋아질 것 입니다. 이 네트워크는 계속 배우고 있는 것 입니다.

<!-- more -->

문제는 우리의 네트워크가 퍼셉트론을 포함하고 있을때는 이것이 일어나지 않는다는 것 입니다. 사실, 네트워크에 있는 어떠한 퍼셉트론의 가중치와 $bias$에 대한 작은 변화는 퍼셉트론의 출력이 완전히 반대가 되도록 할 수 있습니다. 이러한 변화는 매우 복잡한 과정을 거쳐 나머지 네트워크의 행동이 완전히 바뀌도록 할 수 있습니다. 그래서 여러분의 9 이미지가 이제는 완벽히 판별될 수 있을지라도, 다른 모든 이미지에 대한 네트워크의 행동은 건드릴 수 없을만큼 다르게 바뀌어 있을 수 있습니다. 이것이 가중치와 $bias$를 조정하여 네트워크가 원하는 결과를 만들어 내도록 하는것이 얼마나 어려운 일인지 보여줍니다. 아마 이 문제를 해결하는 더 현명한 방법이 있을 수 있습니다. 그러나, 학습 가능한 퍼셉트론 네트워크를 얻을 수 있음이 한순간에 당연해 지지는 않을것입니다.

우리는 시그모이드 뉴런이라고 불리는 새로운 종류의 가상 뉴런을 소개함으로써 이 문제에 접근할 수 있습니다. 시그모이드 뉴런은 페셉트론과 비슷하지만, 그들의 가중치와 $bias$에 작은 변화를 주는것이 그들의 출력의 작은 변화만을 가져옵니다. 이 결정적인 사실이 시그모이드 뉴런으로 이루어진 네트워크가 학습을 가능토록 합니다.

좋습니다, 시그모이드 뉴런이 무엇인지 설명하도록 하지요. 우리는 퍼셉트론을 묘사했던 것 처럼 시그모이드 뉴런을 묘사 하고자 합니다.

<center><img src="/assets/neuralnet/tikz9.png" style="max-width:100%;height:auto"  height="138" width="280"/></center>

퍼셉트론 처럼, 시그모이드 뉴런은 $x_{1}$, $x_{2}$...와 같은 입력을 가지고 있습니다. 하지만 단지 0과 1뿐만이 아닌 0과 1 사이의 그 어떤 실수값이라도 받아들일 수 있습니다. 그래서, 예를 들면, 0.638...과 같은 값도 이 시그모이드 뉴런에서는 유효한 값입니다. 또한 퍼셉트론 처럼, 시그모이드 뉴런 또한 각 입력마다 $w_{1}$, $w_{2}$...와 같은 가중치와 $b$라고 표기하는 $bias$를 가지고 있습니다. 하지만 출력값은 0 이거나 1이 아닙니다. 대신 시그모이드 함수라고 불리는 $\sigma (w\cdot x+b)$의 값을 가집니다. 시그모이드 함수는 다음과 같습니다.

$$\begin{eqnarray} \sigma(z) \equiv \frac{1}{1+e^{-z}}.\tag{3}\end{eqnarray}$$

<span style="color: rgb(189, 189, 189);">*가끔, $\sigma$ 기호는 로그함수를 부를때도 사용되고, 로그함수는 로그 뉴런이라고 불리는 새로운 종류의 뉴런에 사용됩니다. 이 기호는 뉴런 네트워크에서 활동하는 사람들이 많이 사용하기 때문에 기억하기 쉽습니다. 그러나, 우리는 이 기호를 시그모이드에서의 용어로써만 다룰것입니다.</span>

더 정확히 표현하자면, 시그모이드 뉴런의 입력들과 가중치, $bias$에 대해 표현하면

$$\begin{eqnarray} \frac{1}{1+\exp(-\sum_j w_j x_j-b)}.\tag{4}\end{eqnarray}$$

첫 인상은 시그모이드 뉴런이 퍼셉트론과는 매우 달라보입니다. 시그모이드 함수의 수학적 형태는 여러분이 익숙하지 않다면 이해하기 힘들고 무서워 보입니다. 사실, 퍼셉트론과 시그모이드 뉴런 사이에는 매우 많은 공통점이 있고, 시그모이드 함수의 수학적 형태는 이해를 위한 장애물 보다는 더 많은 기술적 디테일을 담고있습니다.

이것과 퍼셉트론 모델과의 비슷한 점을 이해하기 위해서는, $z\equiv w\cdot x+b$의 값이 큰 양수라고 가정해 봅시다. 그러면 $e^{-z}\approx 0$이고 $\sigma (z) \approx 1$ 입니다. 다시 말하면, $z\equiv w\cdot x+b$의 값이 큰 양수라면 시그모이드 뉴런의 출력값은 퍼셉트론이 그랬던것 처럼 1에 가까워 진다는 뜻 입니다. 이젠 $z\equiv w\cdot x+b$의 값이 음수라고 가정해 봅시다. 그렇다면 $e^{-z} \rightarrow \infty$ 이고 $\sigma (z) \approx 0$ 입니다. 그래서 $z\equiv w\cdot x+b$의 값이 음수라면 시그모이드 뉴런은 퍼셉트론처럼 행동하게 됩니다. 이는 $w\cdot x+b$의 값이 적당한 크기였을때만의 이야기 이며, 실제로는 퍼셉트론 모델과는 많은 편차가 존재합니다.

그렇다면 시그모이드 함수의 수학적 형태는 어떻게 생겼을까요? 어떻게 우리가 그것을 이해할 수 있을까요? 사실, 시그모이드 함수의 수학 식은 중요치 않습니다. 정말 중요한 것은 함수의 그래프 입니다. 여기 아래 바로 그 그래프가 있습니다.


<div id="sigmoid_graph"></div><script src="https://d3js.org/d3.v3.min.js"></script><script>
function s(x) {return 1/(1+Math.exp(-x));}
var m = [40, 120, 50, 120];
var height = 290 - m[0] - m[2];
var width = 600 - m[1] - m[3];
var xmin = -5;
var xmax = 5;
var sample = 400;
var x1 = d3.scale.linear().domain([0, sample]).range([xmin, xmax]);
var data = d3.range(sample).map(function(d){ return {
        x: x1(d), 
        y: s(x1(d))}; 
    });
var x = d3.scale.linear().domain([xmin, xmax]).range([0, width]);
var y = d3.scale.linear()
                .domain([0, 1])
                .range([height, 0]);
var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); })
var graph = d3.select("#sigmoid_graph")
    .append("center")
    .append("svg")
    .attr("width", width + m[1] + m[3])
    .attr("height", height + m[0] + m[2])
    .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
var xAxis = d3.svg.axis()
                  .scale(x)
                  .tickValues(d3.range(-4, 5, 1))
                  .orient("bottom")
                  .outerTickSize(1)
graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);
var yAxis = d3.svg.axis()
                  .scale(y)
                  .tickValues(d3.range(0, 1.01, 0.2))
                  .orient("left")
                  .ticks(5)
                  .outerTickSize(1)
graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);
graph.append("path")
    .attr("d", line(data))
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("stroke", "rgb(42, 110, 166)");
graph.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width/2)
     .attr("y", height+35)
     .text("z");
graph.append("text")
        .attr("x", (width / 2))             
        .attr("y", -10)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("sigmoid function");
</script>

이 그래프는 step 함수를 부드럽게 만들었을 때의 그래프와 같습니다.


<div id="step_graph"><script>
function s(x) {return x < 0 ? 0 : 1;}
var m = [40, 120, 50, 120];
var height = 290 - m[0] - m[2];
var width = 600 - m[1] - m[3];
var xmin = -5;
var xmax = 5;
var sample = 400;
var x1 = d3.scale.linear().domain([0, sample]).range([xmin, xmax]);
var data = d3.range(sample).map(function(d){ return {
        x: x1(d), 
        y: s(x1(d))}; 
    });
var x = d3.scale.linear().domain([xmin, xmax]).range([0, width]);
var y = d3.scale.linear()
                .domain([0,1])
                .range([height, 0]);
var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); })
var graph = d3.select("#step_graph")
    .append("center")
    .append("svg")
    .attr("width", width + m[1] + m[3])
    .attr("height", height + m[0] + m[2])
    .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
var xAxis = d3.svg.axis()
                  .scale(x)
                  .tickValues(d3.range(-4, 5, 1))
                  .orient("bottom")
                  .outerTickSize(1)
graph.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis);
var yAxis = d3.svg.axis()
                  .scale(y)
                  .tickValues(d3.range(0, 1.01, 0.2))
                  .orient("left")
                  .ticks(5)
                  .outerTickSize(1)
graph.append("g")
    .attr("class", "y axis")
    .call(yAxis);
graph.append("path")
    .attr("d", line(data))
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("stroke", "rgb(42, 110, 166)");
graph.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width/2)
     .attr("y", height+35)
     .text("z");
graph.append("text")
        .attr("x", (width / 2))             
        .attr("y", -10)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("step function");
</script></div>

만약 시그모이드 함수가 step 함수와 그래프가 같아면, 시그모이드 뉴런은 $w\cdot x+b$의 값이 양수인지 음수인지에 따라 1 또는 0의 값만을 가질 것 이기 때문에 퍼셉트론과 같아질겁니다. 우리가 얻는 이 시그모이드 함수를 사용함에 따라, 이미 위에서 언급한 것 처럼, 굉장히 부드럽고 연속적인 출력을 내보내는 뉴런을 얻게 될 것입니다. 따라서 시그모이드 함수의 자세한 수학적 형태 보다는 이러한 부드러운 그래프가 우리가 주목해야할 부분입니다. 이 함수의 부드러운 그래프는 가중치와 $bias$의 작은 변화가 작은 출력의 변화만을 만들어 낸다는것을 의미합니다. 다음과 같은 계산식은 뉴런의 출력값이

$$\begin{eqnarray} \Delta \mbox{output} \approx \sum_j \frac{\partial \, \mbox{output}}{\partial w_j} &nbsp;\Delta w_j + \frac{\partial \, \mbox{output}}{\partial b} \Delta b,\tag{5}\end{eqnarray}$$

와 근접한다는 것을 알려줍니다. 시그마는 모든 가중치 값, $w_{j}$에 대한 것이고 $\partial output/\partial w_{j}$와 $\partial output/\partial b$는 $output$의 $w_{j}$와 $b$에 대한 각각의 편미분을 의미합니다. 편미분에 대해 잘 알지 못하더라도 걱정하지 마세요! 위의 식이 복잡해 보일지 몰라도, 사실 굉장히 쉬운 이야기를 하고 있는 것 이랍니다.(좋은 소식이군요!): $\Delta&nbsp;output$은 가중치와 $bias$의 $\Delta w_{j}$와 $\Delta b$의 변화량에 대한 일차 함수 입니다. 이러한 직선성은 $output$에서의 우리가 원하는 작은 어떠한 변화도 이룰 수 있게 하는 가중치와 $bias$에서의 변화량을 선택하기 쉽게 해 줍니다. 그래서 시그모이드 뉴런이 퍼셉트론 처럼 굉장히 비슷한 점을 가지고 있음에도, 시그모이드 뉴런은 어떻게 가중치와 $bias$의 변화가 $output$을 어떻게 변화시킬지 알아내는것을 쉽게 해줍니다.

시그모이드 함수의 그래프가 정확히 어떤 모양인지, 수학공식이 어떤지가 중요한 부분이 아니라면, 왜 우리는 (3)번식 처럼 특정한 형태의 식을 사용할까요? 사실, 이 책의 뒤에서 우리는 때때로 활성화 함수 $f$에 대한 출력이 $f(w\cdot x+b)$인 뉴런을 다뤄야 합니다. 우리가 다른 활성화 함수를 사용할 때 변하는 가장 큰 것은 (5)번 식에서 편미분을 위한 특정한 값이 변한다는 것 입니다. 우리가 나중에 저 편미분을 계산 할 때, 시그모이드 함수를 사용하면 자연 상수는 미분할 때 굉장히 좋은 점을 가지고 있기 때문에(역주: $e^{x}$는 미분해도 $e^{x}$가 나온다) 식이 간단해 집니다. 어떤 상황에서든, 시그모이드 함수는 뉴런 네트워크에서 굉장히 자주 사용되고 또한 우리가 이 책에서 가장 많이 사용하는 활성화 함수 입니다.

어떻게 우리가 시그모이드 뉴런으로 부터 $output$을 바로 얻어낼 수 있을까요? 당연히, 퍼셉트론과 시그모이드 함수의 가장 큰 차이점은 시그모이드 뉴런은 $output$이 단지 0 또는 1이 아니라는 겁니다. 이 뉴런은 0과 1 사이의 그 어떤 실수값이라도 가질 수 있습니다. 0.173... 그리고 0.689... 와 같은 값은 출력값으로써 적합한 값입니다. 이런점은 굉장히 유용히 쓰일 수 있습니다. 이를테면 우리가 출력값을 뉴런 네트워크로 들어가는 이미지의 픽셀들의 명도의 평균값을 표현하는데 쓰일 수 있습니다. 하지만 가끔 이는 귀찮은 점이 될 수도 있습니다. 우리가 "입력된 이미지는 9야" 또는 "입력 이미지는 9가 아니야"라고 판단하기 위한 네트워크로 부터 출력값을 얻어내고 싶다고 해 봅시다. 당연히, 출력값이 퍼셉트론 0과 1 이라면 굉장히 쉬울것 입니다. 하지만 실제로는 우리는 최소한 0.5의 값을 가지는 출력값을 "9"라고 하고 또 0.5보단 작은 값을 가지는 출력값을 "9가 아님"이라고 나타내기로 정해야 합니다. 제가 어떤 규칙을 만들고자 하면 반드시 그 규칙을 명확히 알려드릴테니, 지금 너무 혼란해 하지 않으셔도 됩니다.

### 연습
* 시그모이드 뉴런으로 퍼셉트론 시물레이션 하기, 첫번째
우리가 퍼셉트론 네트워크에 있는 모든 가중치와 $bias$들을 취하여 양수 $c$ 를 곱했다고 가정해 봅시다. 이 네트워크의 결과가 전혀 변하지 않음을 증명해 보세요.
* 시그모이드 뉴런으로 퍼셉트론 시물레이션 하기, 두번째
우리가 아까 가져왔던 퍼셉트론 네트워크를 가지고 있다고 가정해 봅시다. 또한 그 네트워크에 입력될 값들을 선택해 두었다고 가정해 봅시다. 실제 값을 가져올 필요는 없습니다. 그냥 아무 고정된 값을 사용하세요. 모든 가중치와 $bias$들이 네트워크의 모든 퍼셉트론에서 입력값 $x$에 대해 $w\cdot x+b \neq 0$이라고 가정합시다. 이제 네트워크의 모든 퍼셉트론을 시그모이드 뉴런으로 교체하고 모든 가중치와 $bias$에 양수 $c$를 곱하세요. 만약 $c\rightarrow \infty$일때 시그모이드 네트워크의 결과가 퍼셉트론 네트워크와 일치함을 보이세요. 만약 한 퍼셉트론이라도 $w\cdot x+b=0$이라면 결과가 어떻게 될까요?

