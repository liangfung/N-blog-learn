# 实现promise

promise的重点是以下几点

1. Promise是个构造函数
2. Promise有三个方法，Promise.all, Promise.race
3. promise实例有两个方法，then，catch
4. promise有三个状态和一个value

- promise本质上是一个状态机，有三个状态，pending，fulfilled，rejected。只能从pending到fulfilled或者从pending到rejected。状态一旦改变就不可逆
- then方法必须返回一个promise。大多数的实现都是返回一个新的promise
- 值穿透

```js
// 方法
var Promise = function(resolver) {} // Promise是个构造函数
Promise.prototype.then = function(){}  // promise实例有then和catch
Promise.prototype.catch = function(){}
Promise.resolve = function(){}
Promise.reject = function(){}
Promise.all = function(){} // Promise的all和race方法
Promise.race = function(){}
```

接下来是详细的实现
```js
'use strict';
var immediate = require('immediate')
var INTERNAL = function(){}
function isFunction(func) {
  return typeof func === 'function'
}

function isObject(obj) {
  return typeof obj === 'object'
}

function isArray(arr) {
  return Array.isArray(arr)
}

var PENDING = 0
var FULFILLED = 1
var REJECTED = 2

module.exports = Promise

function Promise(resolver) {
  if (!isFunction(resolver)) {
    throw new TypeError('resolver must be a function')
  }
  this.state = PENDING
  this.value = void 0
  this.queue = []
  if (resolver !== INTERNAL) {
    safelyResolveThen(this, resolver)
  }
}
```
