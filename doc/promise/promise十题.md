# promise

## promise十问

### 第一问
```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)

// 1
// 2
// 4
// 3
```
> promise**构造函数**是**同步**执行的，`promise.then`里面的函数是已**异步**执行的

### 第二问
```js
const promise1 = new Promise((resolve , reject)=> {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

const promise2 = promise1.then(() => {
  throw new Error('error!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

// promise1 Promise { <pending> }
// promise2 Promise { <pending> }
// VM77:8 Uncaught (in promise) Error: error!
// promise1 Promise {<resolved: 'success'>}
// promise2 Promise {<rejected>: Error: error!}
```
> promise有三种状态.同时，promise2不是promise1,是返回的一个新的promise

### 第三问
```js
const promise = new Promise((resolve, reject) => {
  resolve('success1')
  reject()
  resolve('success2')
})

promise.then(res => {
  console.log('then', res)
}).catch(err => {
  console.log('catch', err)
})

// then success1
```

> promise的状态一旦改变不能再变

### 第四问
```js
Promise.resolve(1)
  .then(res => {
    console.log(res)
    return 2
  })
  .catch(err => {
    return 3
  })
  .then(res => {
    console.log(res)
  })

// 1
// 2
```

> promise可以链式调用，其实现原理是每次调用`then`或者`catch`都会返回一个新的promise,从而实现链式调用

### 第五问
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('once')
    resolve('success')
  }, 1000)
})
const start = Date.now()
promise.then(res => {
  console.log(res, Date.now()-start)
})
promise.then(res => {
  console.log(res, Date.now()-start)
})

// once
// success 1004
// success 1004
```

> promise的构造函数只执行一次，返回的promise可以多次调用then或者catch。promise的状态一旦改变，而且有了一个值。以后每次调用都会直接拿到该值

### 第六问
```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then(res => {
    console.log('then: ', res)
  })
  .catch(err => {
    console.log('catch:', err)
  })

// then: Error: error!!!
//     at Promise.resolve.then (...)
//     at ...
```

> promise每次调用then或者catch，如果**返回非promise的值**，则会**将值包裹成promise对象**。所以 `return new Error('error')`等价于 `return Promise.resolve(new Error('error'))`。如果想要catch捕捉到错误，可以改成
> 1. return Promise.reject(new Error('error'))
> 2. throw new Error('error')

### 第七问
```js
const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)

// TypeError: Chaining cycle detected for promise #<Promise>
```

> then和catch中不能返回promise本身，不然的话会死循环，类似于
```js
process.nextTick(function tick() {
  console.log('tick')
  process.nextTick(tick)
})
```

### 第八问
```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

// 1
```

> then或者catch期待传入的是函数，传入非函数会发生值穿透

### 第九问
```js
Promise.resolve()
  .then(function success (res) {
    throw new Error('error')
  }, function fail1 (e) {
    console.error('fail1', e)
  })
  .catch(function fail2 (e) {
    console.error('fail2', e)
  })

// fail2 Error
//    at success (<anonymous>:3:11)
//    at <anonymous>
```

> then接收两个参数。第一是处理成功的函数，第二个是处理错误的函数。catch是then的简便写法`promise.then(null, function handle(){})`

### 第十问
```js
process.nextTick(() => {
  console.log('nextTick')
})

Promise.resolve()
  .then(() => {
    console.log('then')
  })
setImmediate(() => {
  console.log('setImmediate')
})
console.log('end')

// end
// nextTick
// then
// setTmmediate
```

> microtask & macrotask
