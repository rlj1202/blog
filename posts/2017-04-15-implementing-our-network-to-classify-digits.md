---
layout:     post
title:      숫자들을 판별하기 위한 네트워크 구현하기(작성중)
date:       2017-04-15 23:59:36 +0900
categories: 
tags:       NeuralNetworksAndDeepLearning
---

좋습니다, 이제 확률적 기울기 하강 알고리즘과 MNIST 학습 데이터를 이용하여 손글씨를 인식하는 프로그램을 작성하여 봅시다. 우리는 파이썬 2.7로 작성된 단지 74줄의 프로그램을 작성하게 될것입니다! 첫번째로 필요한것은 MNIST 데이터를 가져오는것입니다. 여러분이 git 사용자라면 이 책의 코드 레포지토리를 복사함으로써 데이터를 얻을 수 있습니다.

```
git clone https://github.com/mnielsen/neural-networks-and-deep-learning.git
```

여러분이 git 사용자가 아니라면, <a href="https://github.com/mnielsen/neural-networks-and-deep-learning/archive/master.zip" target="_blank" class="tx-link">이곳</a>에서 데이터와 코드를 다운로드할 수 있습니다.

그런데 제가 MNIST 데이터를 앞에서 설명할 때, 제가 이 데이터가 60,000개의 학습 이미지들과 10,000개의 테스트 이미지로 나누어져 있다고 말했습니다. 그것이 MNIST의 공식적인 설명입니다. 사실 저희는 이를 좀 다르게 나누어 보려고 합니다. 테스트 이미지는 그대로 두고, 60,000개의 MNIST 학습 이미지를 두 부분으로 나눌것입니다: 50,000개의 이미지는 우리의 뉴런 네트워크를 학습시키는데 사용하고, 나머지 10,000개의 이미지는 validation set으로 나눕니다. 이 장에서 validation 데이터를 사용하지는 않을것이지만 나중에 이 책에서 뉴런 네트워크의 특정한 hyper-parameters(예를들면 학습률과 같은 직접 선택되지 않은 것들)을 어떻게 정하는지를 알아내는데 있어서 이것이 유용하다는것을 알게될겁니다. validation set이 공식적인 MNIST의 부분이 아니지만, 많은 사람을이 MNIST 자료를 이런식으로 사용하고, 뉴런 네트워크에 있어서 validation set은 굉장히 많이 사용됩니다. 제가 지금부터 "MNIST 학습 데이터"를 언급할때는, 저는 50,000개의 이미지 데이터를 이야기 하는겁니다. 60,000개의 원래 이미지가 아닙니다.

<!-- more -->

저희는 또한 <a href="https://numpy.org/" target="_blank" class="tx-link">Numpy</a> 라고 불리는 빠른 선형 수학을 하기위한 파이썬 라이브러리가 필요합니다. 여러분이 아직 Numpy를 설치하지 않았다면, <a href="https://www.scipy.org/install.html" target="_blank" class="tx-link">여기서</a> 다운로드 받으세요.

아래에 있는 전체 코드를 보여드리기 전에, 뉴런 네트워크 코드의 핵심적인 특징에 대해서 설명하고자 합니다. 가장 핵심이 되는것은 Network 클래스 입니다. 이는 우리가 뉴런 네트워크를 나타내기 위해 사용합니다. 여기 Network 객체를 초기화 하기 위해 사용할 코드가 있습니다.

```python
class Network(object):

	def __init__(self, sizes):
		self.num_layers = len(sizes)
		self.sizes = sizes
		self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
		self.weights = [np.random.randn(y, x) 
				for x, y in zip(sizes[:-1], sizes[1:])]
```

이 코드에서, sizes 라는 리스트는 각 층의 뉴런 갯수를 가지고 있습니다. 예를들면, 첫번째 층에는 두개의 뉴런, 둘째 층에는 세개의 뉴런, 마지막 층에는 한개의 뉴런이 있는 Network 객체를 만들고자 한다면, 우리는 다음과 같이 코드를 작성할 수 있습니다.

```python
net = Network([2, 3, 1])
```

네트워크의 bias와 가중치들은 Numpy의 np.random.randn 함수로 무작위로 설정됩니다. 이 초기화는 확률적 기울기 하강 알고리즘을 시작하게 될 값을 제공합니다. 후의 장에서는 가중치와 bias를 초기화 하는 더 좋은 방법을 찾게 되겠지만, 지금은 일단 이렇게 하도록 합시다. 이 Network 의 초기화 작업은 첫번째 층이 입력층이라는 가정 하에 이루어집니다. 입력층에서는 가중치와 바이어스가 필요 없기 때문에 입력층을 제외한 나머지 층의 가중치와 바이어스 행렬만을 만듭니다.

또한 바이어스와 가중치는 Numpy 행렬의 배열로 저장됩니다. 예를들면, net.weight[1]는 두번째 층와 세번째 층을 잇는 가중치를 저장하고 있는 Numpy 행렬입니다.(파이썬은 0부터 인덱싱을 하기 때문에 이는 첫번째 층과 두번째 층에 대한 가중치가 아닙니다.) net.weight[1]이라는 표현은 너무 난잡하기 때문에 여기서는 그냥 행렬 $w$이라고 이야기 합니다. $w_{jk}$는 두번째 층의 $k$번째 뉴런과 세번째 층의 $j$번째 뉴런에 대한 가중치를 이야기 합니다. 이런 $j$와 $k$라는 번호매김 방법은 이상하게 보일 수 있습니다. $j$ 와 $k$의 자리를 바꿔놔야 좀더 직관적인 표현방법이 아닐까요? 이러한 번호매김 방법의 장점은 이것이 세번째 층의 활성화값들에 대한 벡터가 다음과 같기 때문입니다.

$$\begin{eqnarray}   a' = \sigma(w a + b).\tag{22}\end{eqnarray}$$

이 수식을 이해하려면 시간이 좀 필요합니다. 이를 조각조각 내어 한번 살펴봅시다. $a$는 두번째 층의 뉴런들의 활성화 값에 대한 벡터입니다. $a'$를 얻기 위해선 $a$를 $w$라는 가중치 행렬과 곱해야 합니다. 그리고 나서 바이어스 벡터 $b$를 더해야합니다. 그리고 나서 $\sigma$ 함수를 벡터 $wa+b$의 성분마다 적용해야 합니다. (이를 함수 $\sigma$를 벡터화 한다고 합니다.) 우리는 (22)번 식이 앞서 본 (4)번 식과 같은 결과를 가져옴을 쉽게 알 수 있습니다.

### 연습

* (22)번 식의 계산을 성분별로 나타내어 보세요. 그리고 시그모이드 뉴런의 출력을 계산하는데 (4)번 식과 똑같은 결과를 가져옴을 보이세요.

Network 객체로 부터 출력값을 계산하는 코드를 짜는것은 매우 쉽습니다. 시그모이드 함수를 정의하는것 부터 시작합시다.

```python
def sigmoid(z):
    return 1.0/(1.0+np.exp(-z))
```

입력변수 z가 Numpy 배열 또는 벡터라면, Numpy는 자동으로 sigmoid 함수를 성분마다 적용할겁니다.

그리고 나서 Network 객체에 주어진 입력 a에 대해서 출력을 계산하는 feedforward 함수를 만들어 넣도록 합시다. 이 함수가 하는 모든 일은 각 층마다 (22)번 식을 적용하는 것 입니다.

```python
def feedforward(self, a):
        """Return the output of the network if "a" is input."""
        for b, w in zip(self.biases, self.weights):
            a = sigmoid(np.dot(w, a)+b)
        return a
```

물론, Network 객체가 해야 하는 가장 중요한 것은 '학습'입니다. 그러니 확률적 기울기 하강 알고리즘을 구현하는 SGD 함수를 만들어 넣도록 합시다. 여기 아래 코드가 있습니다. 몇몇 부분에서는 좀 당황스러울 수 있으나, 제가 아래에 각 부분마다 설명을 하도록 하겠습니다.

```python
def SGD(self, training_data, epochs, mini_batch_size, eta,
            test_data=None):
        """Train the neural network using mini-batch stochastic
        gradient descent.  The "training_data" is a list of tuples
        "(x, y)" representing the training inputs and the desired
        outputs.  The other non-optional parameters are
        self-explanatory.  If "test_data" is provided then the
        network will be evaluated against the test data after each
        epoch, and partial progress printed out.  This is useful for
        tracking progress, but slows things down substantially."""
        if test_data: n_test = len(test_data)
        n = len(training_data)
        for j in xrange(epochs):
            random.shuffle(training_data)
            mini_batches = [
                training_data[k:k+mini_batch_size]
                for k in xrange(0, n, mini_batch_size)]
            for mini_batch in mini_batches:
                self.update_mini_batch(mini_batch, eta)
            if test_data:
                print "Epoch {0}: {1} / {2}".format(
                    j, self.evaluate(test_data), n_test)
            else:
                print "Epoch {0} complete".format(j)
```

training_data는 학습을 위한 입력과 그에 해당하는 원하는 출력값을 가지고 있는 튜플 (x, y)의 리스트입니다. epoch 과 mini_batch_size는 이름에서 알 수 있듯이 학습할 세대의 수와 소집단의 크기입니다. eta는 학습률 $\eta$입니다. 만약 test_data 라는 선택적 매개변수가 주어지게 되면, 프로그램은 각 세대의 학습이 끝난뒤 네트워크를 평가하게 됩니다. 그리고 부분적인 진행률을 보여줍니다. 이는 과정을 따라가는데 유용하지만 몇몇부분에서 상당한 속도 저하를 일으킬 수 있습니다.

각 세대마다 학습데이터를 무작위로 섞으면서 시작합니다. 그리고 이를 적절한 크기로 소집단으로 나눕니다. 이는 학습데이터로 부터 무작위로 샘플링을 하는 쉬운 방법입니다. 그리고 각 mini_batch(소집단)마다 기울기 하강의 각 과정을 거칩니다. 이 과정은 self.update_mini_batch(mini_batch, size)라는 코드를 통해 이루어집니다. 이 함수는 기울기 하강 알고리즘에 따라 네트워크의 가중치와 바이어스를 업데이트 합니다. 여기 update_mini_batch 함수의 코드가 있습니다.

```python
def update_mini_batch(self, mini_batch, eta):
        """Update the network's weights and biases by applying
        gradient descent using backpropagation to a single mini batch.
        The "mini_batch" is a list of tuples "(x, y)", and "eta"
        is the learning rate."""
        nabla_b = [np.zeros(b.shape) for b in self.biases]
        nabla_w = [np.zeros(w.shape) for w in self.weights]
        for x, y in mini_batch:
            delta_nabla_b, delta_nabla_w = self.backprop(x, y)
            nabla_b = [nb+dnb for nb, dnb in zip(nabla_b, delta_nabla_b)]
            nabla_w = [nw+dnw for nw, dnw in zip(nabla_w, delta_nabla_w)]
        self.weights = [w-(eta/len(mini_batch))*nw 
                        for w, nw in zip(self.weights, nabla_w)]
        self.biases = [b-(eta/len(mini_batch))*nb 
                       for b, nb in zip(self.biases, nabla_b)]
```

대부분의 작업은 다음 줄에서 마무리 됩니다.

```python
delta_nabla_b, delta_nabla_w = self.backprop(x, y)
```

이는 역전파 알고리즘이라고 불리는 것을 실행합니다. 이는 비용함수의 기울기를 계산하는 빠른 방법입니다. update_mini_batch는 간단히 mini_batch의 학습데이터들 마다 이 기울기를 계산함에 따라 작동합니다. 그리고 적절히 self.weights 와 self.biases를 업데이트 합니다.

저는 여기서 self.backprop 함수에 대한 코드를 여기서 보여드리진 않을것입니다. 우리는 다음 장에서 어떻게 역전파 알고리즘이 작동하는지 코드를 포함해서 배우게 됩니다. 하지만 지금 당장은 학습데이터 $x$에 대한 비용함수의 기울기를 반환하는 이 함수가 정의되어 있다고 가정하고 진행합시다.

제가 위에서는 생략했던 주석들과 함께 전체 프로그램을 한번 봅시다. self.backprop을 제외하고서 전체 프로그램은 모두 설명이 되어 있습니다. 대부분의 작업들은 우리가 앞서 미리 알아보았던 self.SGD와 self.update_mini_batch에서 이루어 집니다. self.backprop 함수는 sigmoid_prime 이라는 시그모이드 함수의 도함수와 self.cost_derivative 라는 여기서 아직 설명하지 않은 추가적인 함수들을 기울기를 계산하기 위해 만들어 사용합니다. 여러분은 단지 코드와 주석들을 읽고 대강 요지를 (어쩌면 자세한 사항을) 파악할 수 있을것입니다. 다음 장에서 자세한 사항들을 살펴보도록 하죠. 코드가 매우 길어보이지만, 이해를 돕기위해 대부분의 줄은 주석으로 구성되어 있습니다. 사실, 프로그램은 공백과 주석없이 단지 74줄로 이루어져 있습니다. 모든 코드들은 깃허브의 <a href="https://github.com/mnielsen/neural-networks-and-deep-learning/blob/master/src/network.py" target="_blank" class="tx-link">여기서</a> 찾을 수 있습니다.

```python
"""
network.py
~~~~~~~~~~

A module to implement the stochastic gradient descent learning
algorithm for a feedforward neural network.  Gradients are calculated
using backpropagation.  Note that I have focused on making the code
simple, easily readable, and easily modifiable.  It is not optimized,
and omits many desirable features.
"""

#### Libraries
# Standard library
import random

# Third-party libraries
import numpy as np

class Network(object):

    def __init__(self, sizes):
        """The list ``sizes`` contains the number of neurons in the
        respective layers of the network.  For example, if the list
        was [2, 3, 1] then it would be a three-layer network, with the
        first layer containing 2 neurons, the second layer 3 neurons,
        and the third layer 1 neuron.  The biases and weights for the
        network are initialized randomly, using a Gaussian
        distribution with mean 0, and variance 1.  Note that the first
        layer is assumed to be an input layer, and by convention we
        won't set any biases for those neurons, since biases are only
        ever used in computing the outputs from later layers."""
        self.num_layers = len(sizes)
        self.sizes = sizes
        self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
        self.weights = [np.random.randn(y, x)
                        for x, y in zip(sizes[:-1], sizes[1:])]

    def feedforward(self, a):
        """Return the output of the network if ``a`` is input."""
        for b, w in zip(self.biases, self.weights):
            a = sigmoid(np.dot(w, a)+b)
        return a

    def SGD(self, training_data, epochs, mini_batch_size, eta,
            test_data=None):
        """Train the neural network using mini-batch stochastic
        gradient descent.  The ``training_data`` is a list of tuples
        ``(x, y)`` representing the training inputs and the desired
        outputs.  The other non-optional parameters are
        self-explanatory.  If ``test_data`` is provided then the
        network will be evaluated against the test data after each
        epoch, and partial progress printed out.  This is useful for
        tracking progress, but slows things down substantially."""
        if test_data: n_test = len(test_data)
        n = len(training_data)
        for j in xrange(epochs):
            random.shuffle(training_data)
            mini_batches = [
                training_data[k:k+mini_batch_size]
                for k in xrange(0, n, mini_batch_size)]
            for mini_batch in mini_batches:
                self.update_mini_batch(mini_batch, eta)
            if test_data:
                print "Epoch {0}: {1} / {2}".format(
                    j, self.evaluate(test_data), n_test)
            else:
                print "Epoch {0} complete".format(j)

    def update_mini_batch(self, mini_batch, eta):
        """Update the network's weights and biases by applying
        gradient descent using backpropagation to a single mini batch.
        The ``mini_batch`` is a list of tuples ``(x, y)``, and ``eta``
        is the learning rate."""
        nabla_b = [np.zeros(b.shape) for b in self.biases]
        nabla_w = [np.zeros(w.shape) for w in self.weights]
        for x, y in mini_batch:
            delta_nabla_b, delta_nabla_w = self.backprop(x, y)
            nabla_b = [nb+dnb for nb, dnb in zip(nabla_b, delta_nabla_b)]
            nabla_w = [nw+dnw for nw, dnw in zip(nabla_w, delta_nabla_w)]
        self.weights = [w-(eta/len(mini_batch))*nw
                        for w, nw in zip(self.weights, nabla_w)]
        self.biases = [b-(eta/len(mini_batch))*nb
                       for b, nb in zip(self.biases, nabla_b)]

    def backprop(self, x, y):
        """Return a tuple ``(nabla_b, nabla_w)`` representing the
        gradient for the cost function C_x.  ``nabla_b`` and
        ``nabla_w`` are layer-by-layer lists of numpy arrays, similar
        to ``self.biases`` and ``self.weights``."""
        nabla_b = [np.zeros(b.shape) for b in self.biases]
        nabla_w = [np.zeros(w.shape) for w in self.weights]
        # feedforward
        activation = x
        activations = [x] # list to store all the activations, layer by layer
        zs = [] # list to store all the z vectors, layer by layer
        for b, w in zip(self.biases, self.weights):
            z = np.dot(w, activation)+b
            zs.append(z)
            activation = sigmoid(z)
            activations.append(activation)
        # backward pass
        delta = self.cost_derivative(activations[-1], y) * \
            sigmoid_prime(zs[-1])
        nabla_b[-1] = delta
        nabla_w[-1] = np.dot(delta, activations[-2].transpose())
        # Note that the variable l in the loop below is used a little
        # differently to the notation in Chapter 2 of the book.  Here,
        # l = 1 means the last layer of neurons, l = 2 is the
        # second-last layer, and so on.  It's a renumbering of the
        # scheme in the book, used here to take advantage of the fact
        # that Python can use negative indices in lists.
        for l in xrange(2, self.num_layers):
            z = zs[-l]
            sp = sigmoid_prime(z)
            delta = np.dot(self.weights[-l+1].transpose(), delta) * sp
            nabla_b[-l] = delta
            nabla_w[-l] = np.dot(delta, activations[-l-1].transpose())
        return (nabla_b, nabla_w)

    def evaluate(self, test_data):
        """Return the number of test inputs for which the neural
        network outputs the correct result. Note that the neural
        network's output is assumed to be the index of whichever
        neuron in the final layer has the highest activation."""
        test_results = [(np.argmax(self.feedforward(x)), y)
                        for (x, y) in test_data]
        return sum(int(x == y) for (x, y) in test_results)

    def cost_derivative(self, output_activations, y):
        """Return the vector of partial derivatives \partial C_x /
        \partial a for the output activations."""
        return (output_activations-y)

#### Miscellaneous functions
def sigmoid(z):
    """The sigmoid function."""
    return 1.0/(1.0+np.exp(-z))

def sigmoid_prime(z):
    """Derivative of the sigmoid function."""
    return sigmoid(z)*(1-sigmoid(z))
```

이 프로그램은 얼마나 손글씨들을 잘 알아볼까요? 그러면, MNIST 데이터들을 가지고 시작해 봅시다. 저는 mnist_loader.py라는 작은 도우미 프로그램을 이용하여 데이터들을 불러오도록 하겠습니다. 이 프로그램은 아래에 설명해 두었습니다. 파이썬 쉘에서 다음과 같은 명령어를 입력하여 실행합니다.

```
>>> import mnist_loader
>>> training_data, validation_data, test_data = \
... mnist_loader.load_data_wrapper()
```

물론, 이 명령은 또 다른 파이썬 프로그램을 만들어서 작업할 수도 있습니다. 그렇지만 여러분이 저를 따라오고 있는 중이라면, 파이썬 쉘로 하는것이 아마 제일 쉬울것입니다.

MNIST 데이터를 불러오고 나서, 30개의 은닉 뉴런을 가진 네트워크를 준비해 보도록 합시다. 먼저 위에 나와있는 network 라는 이름의 프로그램을 먼저 import 해야합니다.

```
>>> import network
>>> net = network.Network([784, 30, 10])
```

마지막으로, 30세대 동안 소집단의 크기는 10, 학습률은 $\eta = 3.0$로 하여 MNIST의 training_data를 확률적 기울기 하강 알고리즘을 통해 학습시킵니다.

```
>>> net.SGD(training_data, 30, 10, 3.0, test_data=test_data)
```

여러분이 이 글을 읽으면서 코드를 실행하고 계신다면, 코드가 실행되는데 시간이 좀 걸린다는것을 알아두셨으면 합니다. 일반적인 컴퓨터 장치에서는 (2015년 기준으로) 실행하는데 수분이 걸립니다. 저는 여러분이 실행을 한 뒤에, 글을 계속 읽으면서, 주기적으로 프로그램의 출력을 확인해 주셨으면 합니다. 바쁘시다면 세대의 수를 줄이거나, 은닉층의 뉴런수를 줄이거나, 학습데이터의 일부만을 사용하셔도 됩니다. 이렇게 하면 결과를 훨씬 빨리 얻으실 수 있습니다. 이 파이썬 코드는 어떻게 뉴런 네트워크가 작동하는지 여러분의 이해를 돕기 위해 작성되었지, 빠른 수행을 위해 작성된 것이 아닙니다. 그리고 물론 한번 네트워크를 학습시키고 나면 매우 빠르게 네트워크를 사용할 수 있습니다. 거의 모든 연산 가능한 장치에서 말이죠. 예를들어, 네트워크의 가중치와 바이어스를 잘 학습시키고 나면 저희는 이것을 웹 브라우저의 자바스크립트로도 사용할 수 있고 혹은 모바일 장치에서도 사용 가능합니다. 어쨌거나, 제가 아래에 네트워크 학습의 결과 출력의 일부분을 가져왔습니다. 아래 결과는 각 세대의 학습 뒤에 네트워크게 의해 정확히 판별된 테스트 이미지들의 갯수를 보여줍니다. 보이다시피, 단지 한번의 세대 학습만으로도 10000개 중에 9129개의 이미지들을 판별해 내었고, 그 수가 계속 증가하는것을 볼 수 있습니다.

	Epoch 0: 9129 / 10000
	Epoch 1: 9295 / 10000
	Epoch 2: 9348 / 10000
	...
	Epoch 27: 9528 / 10000
	Epoch 28: 9542 / 10000
	Epoch 29: 9534 / 10000

이 말은, 학습된 네트워크는 95%정도의 판별률을 가진다는 것입니다. 28번째 세대에서 95.42라는 최고치를 기록했습니다! 첫 시도 치고는 꽤 좋은 결과로군요. 그러나, 현재는 가중치와 바이어스를 무작위 하게 고르기 때문에 여러분의 코드 실행결과가 항상 저와 같다고 할 수 없다는 걸 알려드립니다. 전 이 결과를 내기 위해 세번의 학습 중에 가장 좋은 결과를 가져왔습니다.

이번에 은닉 뉴런의 수를 100으로 늘려 다시 한번 학습을 진행하여 봅시다. 앞에서의 경우와 마찬가지로, 여러분이 이 글을 읽으면서 코드를 실행한다면, 실행하는데 꽤 많은 시간이 걸립니다. (저의 컴퓨터에서는 각 세대마다 10초 가량이 걸렸습니다.) 그러므로, 코드가 실행되는 동안 계속해서 글을 읽을것을 추천합니다.

```
>>> net = network.Network([784, 100, 10])
>>> net.SGD(training_data, 30, 10, 3.0, test_data=test_data)
```

이번에는 정확도가 96.59%로 올랐습니다. 최소한 이런 경우에서는, 더 많은 은닉 뉴런들은 더 좋은 결과를 가져옵니다. 물론, 이 정확도를 얻기 위해 저는 특정한 세대수, 소집단 크기, 학습률을 선택해야 했습니다. 위에서 언급했듯이, 이러한 변수들은 네트워크에서 가중치와 바이어스와 분리해서 이야기 하기 위해 hyper-parameter라고 부릅니다. 우리가 매우 않좋은 hyper-parameter를 선택한다면, 우리는 나쁜 결과를 얻습니다. 가령, 예를 들어, 학습률로 $\eta = 0.001$을 골랐다고 합시다.

```
>>> net = network.Network([784, 100, 10])
>>> net.SGD(training_data, 30, 10, 0.001, test_data=test_data)
```

이는 훨씬 별로인 결과를 보여줍니다.

	Epoch 0: 1139 / 10000
	Epoch 1: 1136 / 10000
	Epoch 2: 1135 / 10000
	...
	Epoch 27: 2101 / 10000
	Epoch 28: 2123 / 10000
	Epoch 29: 2142 / 10000

그러나, 네트워크의 성능이 느리지만 계속해서 올라가고 있음을 알 수 있습니다. 학습률을 $\eta = 0.01$로 올려보면 어떨까요? 만약 그렇게 한다면, 더 좋은 결과를 얻을 수 있을것입니다. 그렇다면 다시한번 학습률을 올려보면 어떨까요? (약간의 변화가 향상을 만들어 냈다면, 변화를 더 만들어 보세요!) 우리가 이렇게 몇 번을 반복해서 학습률을 $\eta = 1.0$까지 올렸다고 해봅시다. (어쩌면 3.0까지 올려도 괜찮을겁니다) 이는 앞선 실험에서 사용한 값과 굉장히 비슷합니다. 그래서 초기에 hyper-parameter로 안좋은 값을 골랐을지라도, 결국에는 좋은 값을 고르기 위한 충분한 정보를 얻을 수 있었습니다.

일반적으로, 뉴런 네트워크를 디버깅 하는것은 꽤 힘듭니다. 초기에 선택한 hyper-parameter로 인해 무작위로 값을 내놓는것만 못한 값들을 뉴런 네트워크가 낼때 특히 그렇습니다. 저희가 앞서 성공적으로 사용했던 30개의 은닉 뉴런을 가진 네트워크를 사용하되, 학습률을 $\eta = 100.0$으로 바꾸어서 학습시킨다고 해봅시다.

```
>>> net = network.Network([784, 30, 10])
>>> net.SGD(training_data, 30, 10, 100.0, test_data=test_data)
```

좀 오바한것 같군요. 학습률이 너무 높습니다.

	Epoch 0: 1009 / 10000
	Epoch 1: 1009 / 10000
	Epoch 2: 1009 / 10000
	Epoch 3: 1009 / 10000
	...
	Epoch 27: 982 / 10000
	Epoch 28: 982 / 10000
	Epoch 29: 982 / 10000

이제 저희가 첫번째로 마주한 상황이 바로 이 상황이라고 가정해 봅시다. 물론, 앞선 실험을 바탕으로 저희는 적절한 해결책은 학습률을 낮추는 것이라고 알고 있습니다. 하지만, 이 상황이 처음 마주한 상황이라면, 현재 얻은 결과로는 저희가 할 수 있는 것이 없습니다. 저희는 학습률 뿐만 아니라 뉴런 네트워크의 다방면에서 이 상황을 바라보아야 합니다. 저희는 저희가 가중치와 바이어스를 초기화 하는 방법이 네트워크가 학습을 더디게 하는 것일까? 라고 걱정해 볼 수 있습니다. 또는 어쩌면 의미있는 학습을 위한 충분한 학습 데이터를 가지고 있지 않을 수 도 있습니다. 어쩌면 충분한 세대 동안 학습을 진행하지 않은 것일까요? 또는 어쩌면 이 네트워크 구조로는 손글씨를 인식하도록 학습하는 것이 불가능 한걸까요? 어쩌면 학습률이 너무 낮은걸까요? 또는 어쩌면 학습률이 너무 높은걸까요? 여러분이 이런 상황을 처음 마주한다면, 그 무엇도 확신할 수 없습니다.

이것으로 부터 얻을 수 있는 것은 일반적인 프로그래밍 처럼 네트워크를 디버깅하는것이 사소하게 볼 문제가 아니라는 것 입니다. 네트워크를 디버깅 하기 위한 기술이 있습니다. 그리고 여러분은 네트워크로 부터 좋은 결과를 얻어내기 위한 그 기술을 배울 필요가 있습니다. 더 일반적으로는, 좋은 hyper-parameter들과 좋은 구조를 선택하기 위해 시행착오를 반복할 필요가 있습니다. 저희는 이 책을 통해 제가 어떻게 위같은 좋은 hyper-parameter들을 얻었는가를 포함해서 이것들에 대해 이야기 해 볼것입니다.

### 연습

입력층, 출력층 단 두개의 층만을 가지고 있는 네트워크를 만들어 보세요. 입력층은 784개의 뉴런, 출력층은 10개의 뉴런을 가지고 있습니다. 그리고 그 네트워크를 확률적 기울기 하강 알고리즘으로 학습시켜 보세요. 얼마나 정확한 판별률을 얻을 수 있나요?

앞서, 저는 어떻게 MNIST 데이터를 로딩했는지에 대한 세부사항을 그냥 지나갔습니다. 꽤 간단합니다. 완성을 위해, 코드를 보여드리겠습니다. MNIST 데이터를 저장하기 위해 사용된 데이터 구조는 아래 주석으로 설명되어 있습니다. 굉장히 간단하게 구성되어 있습니다. 튜플과 Numpy의 ndarray 객체 리스트로 이루어져 있습니다. (ndarrays라는것에 익숙치 않다면 그냥 백터들로 생각하셔도 됩니다.)

```python
"""
mnist_loader
~~~~~~~~~~~~

A library to load the MNIST image data.  For details of the data
structures that are returned, see the doc strings for ``load_data``
and ``load_data_wrapper``.  In practice, ``load_data_wrapper`` is the
function usually called by our neural network code.
"""

#### Libraries
# Standard library
import cPickle
import gzip

# Third-party libraries
import numpy as np

def load_data():
    """Return the MNIST data as a tuple containing the training data,
    the validation data, and the test data.

    The ``training_data`` is returned as a tuple with two entries.
    The first entry contains the actual training images.  This is a
    numpy ndarray with 50,000 entries.  Each entry is, in turn, a
    numpy ndarray with 784 values, representing the 28 * 28 = 784
    pixels in a single MNIST image.

    The second entry in the ``training_data`` tuple is a numpy ndarray
    containing 50,000 entries.  Those entries are just the digit
    values (0...9) for the corresponding images contained in the first
    entry of the tuple.

    The ``validation_data`` and ``test_data`` are similar, except
    each contains only 10,000 images.

    This is a nice data format, but for use in neural networks it's
    helpful to modify the format of the ``training_data`` a little.
    That's done in the wrapper function ``load_data_wrapper()``, see
    below.
    """
    f = gzip.open('../data/mnist.pkl.gz', 'rb')
    training_data, validation_data, test_data = cPickle.load(f)
    f.close()
    return (training_data, validation_data, test_data)

def load_data_wrapper():
    """Return a tuple containing ``(training_data, validation_data,
    test_data)``. Based on ``load_data``, but the format is more
    convenient for use in our implementation of neural networks.

    In particular, ``training_data`` is a list containing 50,000
    2-tuples ``(x, y)``.  ``x`` is a 784-dimensional numpy.ndarray
    containing the input image.  ``y`` is a 10-dimensional
    numpy.ndarray representing the unit vector corresponding to the
    correct digit for ``x``.

    ``validation_data`` and ``test_data`` are lists containing 10,000
    2-tuples ``(x, y)``.  In each case, ``x`` is a 784-dimensional
    numpy.ndarry containing the input image, and ``y`` is the
    corresponding classification, i.e., the digit values (integers)
    corresponding to ``x``.

    Obviously, this means we're using slightly different formats for
    the training data and the validation / test data.  These formats
    turn out to be the most convenient for use in our neural network
    code."""
    tr_d, va_d, te_d = load_data()
    training_inputs = [np.reshape(x, (784, 1)) for x in tr_d[0]]
    training_results = [vectorized_result(y) for y in tr_d[1]]
    training_data = zip(training_inputs, training_results)
    validation_inputs = [np.reshape(x, (784, 1)) for x in va_d[0]]
    validation_data = zip(validation_inputs, va_d[1])
    test_inputs = [np.reshape(x, (784, 1)) for x in te_d[0]]
    test_data = zip(test_inputs, te_d[1])
    return (training_data, validation_data, test_data)

def vectorized_result(j):
    """Return a 10-dimensional unit vector with a 1.0 in the jth
    position and zeroes elsewhere.  This is used to convert a digit
    (0...9) into a corresponding desired output from the neural
    network."""
    e = np.zeros((10, 1))
    e[j] = 1.0
    return e
```

전 위에서 저희의 프로그램이 꽤 좋은 결과를 얻었다고 말씀드렸습니다. 그것이 무엇을 의미할까요? 무엇에 비교해서 좋은걸까요? 잘 작동한다는 것이 무엇을 의미하는이 이해하기 위해 비교할 간단한 기준선을 만들어 보는것이 좋겠습니다. 가장 간단한 기준선은 역시 숫자들을 무작위로 추측하는것 입니다. 아마 각 횟수마다 정확히 10% 확률로 맞출 수 있을겁니다. 저희는 그것보다 훨씬 낫습니다!

좀 덜 이상한 기준선을 세워볼까요? 이 극단적인 예시를 한번 들어봅시다: 저희는 이미지가 얼마나 어두운지 볼 것입니다. 예를들어, 2라는 숫자의 이미지는 일반적으로 1이라는 숫자의 이미지 보다는 더 어두울 것입니다. 왜냐하면 더 많은 픽셀들이 검정으로 이루어져 있기 때문입니다.

<center><img src="/assets/neuralnet/mnist_2_and_1.png" style="cursor: pointer;max-width:100%;height:auto" onclick="open_img('https://cfile4.uf.tistory.com/original/275F34495961E4CE0F49F1')"  height="150" style="width: 308px; height: 150px;" width="308" /></center>

학습 데이터를 사용해서 각 숫자의 어두운 정도의 평균을 계산해 봅시다. 그리고 어떤 이미지가 주어지면, 그 이미지의 어두운 정도를 계산해서, 어떤 평균값에 근접한지 추측하는겁니다. 이는 매우 간단한 과정이며 코드로 짜기 쉽습니다. 그래서 자세한 코드를 보여드리진 않을겁니다. 관심 있으시다면 <a href="https://github.com/mnielsen/neural-networks-and-deep-learning/blob/master/src/mnist_average_darkness.py" target="_blank" class="tx-link">깃허브 레포지토리</a>를 확인해 주세요. 이는 무작위 추측에 비해 엄청난 향상을 가져옵니다. 10,000개 중에 2,225개를 맞출 수 있었으며, 이는 22.25%의 판별률을 가집니다.

20%에서 50%의 정확도를 가질 수 있도록 하는 다른 아이디어를 찾는것은 어렵지 않습니다. 좀더 열심히 찾아본다면 50% 이상도 가능합니다. 하지만 더 높은 정확도를 얻기 위해서는 확립된 머신 러닝 알고리즘을 사용하는것이 도움이 될겁니다. 가장 잘 알려진 알고리즘중에 하나인 support vector machine 또는 SVM을 사용해 봅시다. SVM에 익숙치 않으시다면, 걱정하지 마세요. 

