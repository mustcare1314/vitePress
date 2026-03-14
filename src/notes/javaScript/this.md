# JavaScript this 指向规则

## this 是什么

`this` 是 JavaScript 中的关键字，它指向函数执行时的上下文对象。`this` 的值不是在函数定义时确定的，而是在函数调用时动态绑定的。

## 五大绑定规则

### 1. 默认绑定

独立函数调用时，`this` 指向全局对象（浏览器中是 `window`，Node.js 中是 `global`）。

```js
function foo() {
  console.log(this) // window (非严格模式)
}
foo()

// 严格模式下指向 undefined
'use strict'
function bar() {
  console.log(this) // undefined
}
bar()
```

### 2. 隐式绑定

通过对象调用函数时，`this` 指向调用该函数的对象。

```js
const obj = {
  name: 'John',
  sayName() {
    console.log(this.name)
  }
}

obj.sayName() // 'John' (this 指向 obj)
```

#### 隐式丢失

```js
const obj = {
  name: 'John',
  sayName() {
    console.log(this.name)
  }
}

// 赋值给变量
const fn = obj.sayName
fn() // undefined (this 指向 window)

// 作为参数传递
function execute(callback) {
  callback()
}
execute(obj.sayName) // undefined (this 指向 window)

// 嵌套对象
const obj2 = {
  name: 'Outer',
  inner: {
    name: 'Inner',
    sayName() {
      console.log(this.name)
    }
  }
}
obj2.inner.sayName() // 'Inner' (this 指向 inner)
```

### 3. 显式绑定

使用 `call`、`apply`、`bind` 显式指定 `this`。

#### call()

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

const user = { name: 'Alice' }

greet.call(user, 'Hello', '!') // 'Hello, Alice!'
```

#### apply()

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`)
}

const user = { name: 'Bob' }

greet.apply(user, ['Hi', '?']) // 'Hi, Bob?'
```

#### bind()

```js
function greet() {
  console.log(`Hello, ${this.name}`)
}

const user = { name: 'Charlie' }

const boundGreet = greet.bind(user)
boundGreet() // 'Hello, Charlie'

// bind 可以预设参数
function add(a, b) {
  return a + b + this.value
}

const obj = { value: 10 }
const addFive = add.bind(obj, 5)
console.log(addFive(3)) // 18 (5 + 3 + 10)
```

#### call vs apply vs bind

| 方法 | 参数形式 | 执行时机 | 返回值 |
|------|---------|---------|--------|
| call | 逐个传递 | 立即执行 | 函数返回值 |
| apply | 数组传递 | 立即执行 | 函数返回值 |
| bind | 逐个传递 | 不执行 | 新函数 |

```js
const obj = { name: 'Test' }

function fn(a, b) {
  console.log(this.name, a, b)
}

fn.call(obj, 1, 2)    // 'Test' 1 2
fn.apply(obj, [1, 2]) // 'Test' 1 2
fn.bind(obj, 1, 2)()  // 'Test' 1 2
```

### 4. new 绑定

使用 `new` 调用构造函数时，`this` 指向新创建的对象。

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

const person = new Person('David', 25)
console.log(person.name) // 'David'
console.log(person.age)  // 25
```

#### new 的执行过程

```js
function myNew(Constructor, ...args) {
  // 1. 创建新对象
  const obj = {}
  
  // 2. 设置原型链
  obj.__proto__ = Constructor.prototype
  
  // 3. 绑定 this 并执行构造函数
  const result = Constructor.apply(obj, args)
  
  // 4. 返回对象
  return result instanceof Object ? result : obj
}

function Person(name) {
  this.name = name
}

const p = myNew(Person, 'Eve')
console.log(p.name) // 'Eve'
```

### 5. 箭头函数

箭头函数没有自己的 `this`，它会捕获定义时所在上下文的 `this`。

```js
const obj = {
  name: 'Arrow',
  regularFn() {
    console.log(this.name) // 'Arrow'
  },
  arrowFn: () => {
    console.log(this.name) // undefined (this 指向外层作用域)
  }
}

obj.regularFn() // 'Arrow'
obj.arrowFn()   // undefined
```

#### 箭头函数的特点

```js
// 1. 不能使用 call/apply/bind 改变 this
const obj = { name: 'Test' }
const arrow = () => console.log(this)

arrow.call(obj) // 依然指向定义时的 this

// 2. 不能作为构造函数
const Arrow = () => {}
new Arrow() // TypeError: Arrow is not a constructor

// 3. 没有 arguments 对象
const arrow2 = () => {
  console.log(arguments) // ReferenceError
}

// 4. 常用于回调函数
const obj2 = {
  name: 'Callback',
  items: [1, 2, 3],
  printItems() {
    // 普通函数需要保存 this
    const self = this
    this.items.forEach(function(item) {
      console.log(self.name, item)
    })
    
    // 箭头函数自动继承外层 this
    this.items.forEach(item => {
      console.log(this.name, item)
    })
  }
}
```

## 优先级

当多个规则同时出现时，优先级从高到低：

**new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定**

```js
function foo() {
  console.log(this.name)
}

const obj1 = { name: 'obj1', foo }
const obj2 = { name: 'obj2' }

// 隐式绑定 vs 显式绑定
obj1.foo()           // 'obj1' (隐式)
obj1.foo.call(obj2)  // 'obj2' (显式优先)

// 显式绑定 vs new 绑定
const boundFoo = foo.bind(obj1)
boundFoo()           // 'obj1' (显式)
new boundFoo()       // undefined (new 优先，this 指向新对象)
```

## 常见场景

### 定时器

```js
const obj = {
  name: 'Timer',
  start() {
    // 普通函数：this 指向 window
    setTimeout(function() {
      console.log(this.name) // undefined
    }, 1000)
    
    // 箭头函数：this 指向 obj
    setTimeout(() => {
      console.log(this.name) // 'Timer'
    }, 1000)
    
    // bind 绑定
    setTimeout(function() {
      console.log(this.name) // 'Timer'
    }.bind(this), 1000)
  }
}
```

### 事件处理

```js
const button = document.querySelector('button')

const obj = {
  name: 'Button',
  handleClick() {
    console.log(this.name)
  }
}

// 普通函数：this 指向 button 元素
button.addEventListener('click', obj.handleClick) // undefined

// 箭头函数：this 指向定义时的上下文
button.addEventListener('click', () => {
  console.log(this) // window 或外层 this
})

// bind 绑定
button.addEventListener('click', obj.handleClick.bind(obj)) // 'Button'
```

### 数组方法

```js
const obj = {
  name: 'Array',
  numbers: [1, 2, 3],
  
  // 方法1：箭头函数
  double1() {
    return this.numbers.map(n => n * 2)
  },
  
  // 方法2：bind
  double2() {
    return this.numbers.map(function(n) {
      return n * 2
    }.bind(this))
  },
  
  // 方法3：传入 thisArg 参数
  double3() {
    return this.numbers.map(function(n) {
      return n * 2
    }, this)
  }
}
```

### 类中的 this

```js
class Person {
  constructor(name) {
    this.name = name
  }
  
  // 普通方法
  sayName() {
    console.log(this.name)
  }
  
  // 箭头函数（实例属性）
  sayAge = () => {
    console.log(this.age)
  }
}

const person = new Person('Class')

// 直接调用
person.sayName() // 'Class'

// 赋值后调用（丢失 this）
const fn = person.sayName
fn() // undefined

// 箭头函数不会丢失 this
const fn2 = person.sayAge
fn2() // undefined (age 未定义，但 this 正确)
```

## 判断 this 的步骤

```js
// 1. 是否在箭头函数中？
//    → 是：this 继承外层作用域
const arrow = () => console.log(this)

// 2. 是否通过 new 调用？
//    → 是：this 指向新创建的对象
new Foo()

// 3. 是否通过 call/apply/bind 调用？
//    → 是：this 指向指定的对象
foo.call(obj)

// 4. 是否通过对象调用？
//    → 是：this 指向该对象
obj.foo()

// 5. 以上都不是
//    → 严格模式：undefined
//    → 非严格模式：全局对象
foo()
```

## 实战技巧

### 保存 this

```js
const obj = {
  name: 'Save',
  init() {
    const self = this // 保存 this
    
    document.addEventListener('click', function() {
      console.log(self.name) // 'Save'
    })
  }
}
```

### 链式调用

```js
const calculator = {
  value: 0,
  add(n) {
    this.value += n
    return this // 返回 this 实现链式调用
  },
  subtract(n) {
    this.value -= n
    return this
  },
  multiply(n) {
    this.value *= n
    return this
  }
}

calculator.add(5).subtract(2).multiply(3)
console.log(calculator.value) // 9
```

### 手动实现 call

```js
Function.prototype.myCall = function(context, ...args) {
  // 处理 context 为 null/undefined
  context = context || window
  
  // 创建唯一属性名
  const fn = Symbol()
  
  // 将函数作为 context 的方法
  context[fn] = this
  
  // 调用函数
  const result = context[fn](...args)
  
  // 删除临时属性
  delete context[fn]
  
  return result
}

function greet(greeting) {
  console.log(`${greeting}, ${this.name}`)
}

const user = { name: 'Test' }
greet.myCall(user, 'Hello') // 'Hello, Test'
```

### 手动实现 bind

```js
Function.prototype.myBind = function(context, ...args1) {
  const fn = this
  
  return function(...args2) {
    return fn.apply(context, [...args1, ...args2])
  }
}

function add(a, b) {
  return a + b + this.value
}

const obj = { value: 10 }
const addFive = add.myBind(obj, 5)
console.log(addFive(3)) // 18
```

## 常见错误

### 错误1：对象方法赋值

```js
const obj = {
  name: 'Error',
  getName() {
    return this.name
  }
}

// ❌ 错误
const getName = obj.getName
console.log(getName()) // undefined

// ✅ 正确
const getName2 = obj.getName.bind(obj)
console.log(getName2()) // 'Error'
```

### 错误2：回调函数中的 this

```js
const obj = {
  name: 'Callback',
  items: [1, 2, 3],
  
  // ❌ 错误
  printItems1() {
    this.items.forEach(function(item) {
      console.log(this.name) // undefined
    })
  },
  
  // ✅ 正确
  printItems2() {
    this.items.forEach(item => {
      console.log(this.name) // 'Callback'
    })
  }
}
```

### 错误3：嵌套函数

```js
const obj = {
  name: 'Nested',
  outer() {
    console.log(this.name) // 'Nested'
    
    function inner() {
      console.log(this.name) // undefined (独立函数调用)
    }
    inner()
  }
}

// ✅ 解决方案
const obj2 = {
  name: 'Nested',
  outer() {
    const inner = () => {
      console.log(this.name) // 'Nested'
    }
    inner()
  }
}
```

## 总结

::: tip 核心要点
1. **箭头函数**没有自己的 this，继承外层作用域
2. **优先级**：new > 显式绑定 > 隐式绑定 > 默认绑定
3. **隐式丢失**：函数赋值或作为参数传递会丢失 this
4. **严格模式**：独立函数调用时 this 为 undefined
5. **事件处理**：普通函数 this 指向触发事件的元素
:::

::: warning 注意事项
- 避免在箭头函数中使用 call/apply/bind
- 类方法作为回调时注意 this 丢失
- 定时器和事件监听器中优先使用箭头函数
- 不要在对象字面量中使用箭头函数定义方法
:::
