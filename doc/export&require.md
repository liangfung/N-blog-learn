# require
- require是**同步**的
- require机制：
  - 先找有没有`package.json`,如果里面有`main字段`，则使用该字段指定的文件
  - 没有package.json的话，依次尝试加载目录下的`index.js`，`index.node`
- 循环引用的话，引用的是空对象，因为还没有初始化就被引用了，只能得到{}


# node.js中的exports & module.exports
1. module.exports初始是一个空对象{}
2. exports是指向module.exports的**引用**
3. require() 返回的是`module.exports`而不是exports

所以，会经常看到这样的写法
```js
exports = module.exports = {...}
```
上面的代码等价于
```js
module.exports = {...}
exports = module.exports
```
> 原因是，当module.exports指向了一个新的对象，exports还是指向旧的对象，module.exports和exports断了引用，所以通过exports=mudole.exports让exports重新指向module.exports
