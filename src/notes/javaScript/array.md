# JavaScript 操作数组的内置方法合集

## 添加/删除元素

### push( )

在数组末尾添加元素，返回新长度。**改变原数组**。

```js
const arr = [1, 2, 3];
arr.push(4, 5); // 返回 5
console.log(arr); // [1, 2, 3, 4, 5]
```

### pop( )

删除并返回数组最后一个元素。**改变原数组**。

```js
const arr = [1, 2, 3];
const last = arr.pop(); // 返回 3
console.log(arr); // [1, 2]
```

### unshift( )

在数组开头添加元素，返回新长度。**改变原数组**。

```js
const arr = [3, 4];
arr.unshift(1, 2); // 返回 4
console.log(arr); // [1, 2, 3, 4]
```

### shift( )

删除并返回数组第一个元素。**改变原数组**。

```js
const arr = [1, 2, 3];
const first = arr.shift(); // 返回 1
console.log(arr); // [2, 3]
```

### splice( )

添加、删除或替换元素。**改变原数组**。

```js
const arr = [1, 2, 3, 4, 5];

// 删除：从索引2开始删除2个元素
arr.splice(2, 2); // 返回 [3, 4]
console.log(arr); // [1, 2, 5]

// 添加：从索引1开始，删除0个，添加元素
arr.splice(1, 0, "a", "b"); // 返回 []
console.log(arr); // [1, 'a', 'b', 2, 5]

// 替换：从索引0开始，删除2个，添加新元素
arr.splice(0, 2, "x"); // 返回 [1, 'a']
console.log(arr); // ['x', 'b', 2, 5]
```

## 查找元素

### indexOf( )

返回元素首次出现的索引，未找到返回 -1。

```js
const arr = [1, 2, 3, 2];
arr.indexOf(2); // 1
arr.indexOf(5); // -1
arr.indexOf(2, 2); // 3 (从索引2开始查找)
```

### lastIndexOf( )

返回元素最后出现的索引，未找到返回 -1。

```js
const arr = [1, 2, 3, 2];
arr.lastIndexOf(2); // 3
```

### includes( )

判断数组是否包含某个元素，返回布尔值。

```js
const arr = [1, 2, 3];
arr.includes(2); // true
arr.includes(5); // false
```

### find( )

返回第一个满足条件的元素，未找到返回 undefined。

```js
const arr = [1, 2, 3, 4, 5];
arr.find((x) => x > 3); // 4
arr.find((x) => x > 10); // undefined
```

### findIndex( )

返回第一个满足条件的元素索引，未找到返回 -1。

```js
const arr = [1, 2, 3, 4, 5];
arr.findIndex((x) => x > 3); // 3
arr.findIndex((x) => x > 10); // -1
```

### findLast( )

返回最后一个满足条件的元素。

```js
const arr = [1, 2, 3, 4, 5];
arr.findLast((x) => x > 3); // 5
```

### findLastIndex( )

返回最后一个满足条件的元素索引。

```js
const arr = [1, 2, 3, 4, 5];
arr.findLastIndex((x) => x > 3); // 4
```

## 遍历方法

### forEach( )

遍历数组，无返回值。

```js
const arr = [1, 2, 3];
arr.forEach((item, index, array) => {
  console.log(item, index);
});
// 1 0
// 2 1
// 3 2
```

### map( )

遍历数组，返回新数组。

```js
const arr = [1, 2, 3];
const doubled = arr.map((x) => x * 2);
console.log(doubled); // [2, 4, 6]
```

### filter( )

过滤数组，返回满足条件的新数组。

```js
const arr = [1, 2, 3, 4, 5];
const even = arr.filter((x) => x % 2 === 0);
console.log(even); // [2, 4]
```

### reduce( )

累加器，将数组归约为单个值。

```js
const arr = [1, 2, 3, 4];

// 求和
const sum = arr.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 10

// 对象计数
const fruits = ["apple", "banana", "apple"];
const count = fruits.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 2, banana: 1 }
```

### reduceRight( )

从右到左累加。

```js
const arr = [1, 2, 3, 4];
const result = arr.reduceRight((acc, cur) => acc - cur);
console.log(result); // -2 (4 - 3 - 2 - 1)
```

## 判断方法

### every( )

判断是否所有元素都满足条件。

```js
const arr = [2, 4, 6];
arr.every((x) => x % 2 === 0); // true
arr.every((x) => x > 5); // false
```

### some( )

判断是否至少有一个元素满足条件。

```js
const arr = [1, 2, 3];
arr.some((x) => x > 2); // true
arr.some((x) => x > 5); // false
```

## 排序方法

### sort( )

排序数组。**改变原数组**。

```js
const arr = [3, 1, 4, 1, 5];

// 默认按字符串排序
arr.sort(); // [1, 1, 3, 4, 5]

// 数字排序
arr.sort((a, b) => a - b); // 升序
arr.sort((a, b) => b - a); // 降序

// 对象排序
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];
users.sort((a, b) => a.age - b.age);
```

### reverse( )

反转数组。**改变原数组**。

```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

### toSorted( )

返回排序后的新数组，不改变原数组。

```js
const arr = [3, 1, 2];
const sorted = arr.toSorted();
console.log(sorted); // [1, 2, 3]
console.log(arr); // [3, 1, 2]
```

### toReversed( )

返回反转后的新数组，不改变原数组。

```js
const arr = [1, 2, 3];
const reversed = arr.toReversed();
console.log(reversed); // [3, 2, 1]
console.log(arr); // [1, 2, 3]
```

## 连接和切片

### concat( )

合并数组，返回新数组。

```js
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = arr1.concat(arr2, [5, 6]);
console.log(arr3); // [1, 2, 3, 4, 5, 6]
```

### slice( )

提取数组片段，返回新数组。

```js
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3); // [2, 3]
arr.slice(2); // [3, 4, 5]
arr.slice(-2); // [4, 5]
arr.slice(); // 浅拷贝整个数组
```

### join( )

将数组元素连接成字符串。

```js
const arr = ["a", "b", "c"];
arr.join(); // 'a,b,c'
arr.join(""); // 'abc'
arr.join("-"); // 'a-b-c'
```

## 扁平化

### flat( )

扁平化数组，返回新数组。

```js
const arr = [1, [2, 3], [4, [5, 6]]];
arr.flat(); // [1, 2, 3, 4, [5, 6]]
arr.flat(2); // [1, 2, 3, 4, 5, 6]
arr.flat(Infinity); // 完全扁平化
```

### flatMap( )

先 map 再 flat(1)。

```js
const arr = [1, 2, 3];
arr.flatMap((x) => [x, x * 2]);
// [1, 2, 2, 4, 3, 6]
```

## 填充和复制

### fill( )

填充数组。**改变原数组**。

```js
const arr = [1, 2, 3, 4];
arr.fill(0); // [0, 0, 0, 0]
arr.fill(5, 1, 3); // [0, 5, 5, 0]

// 创建固定长度数组
Array(3).fill(0); // [0, 0, 0]
```

### copyWithin( )

复制数组内部元素。**改变原数组**。

```js
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

## 转换方法

### toString( )

转换为字符串。

```js
const arr = [1, 2, 3];
arr.toString(); // '1,2,3'
```

### toLocaleString( )

转换为本地化字符串。

```js
const arr = [1000, new Date()];
arr.toLocaleString(); // '1,000,2024/1/1 上午12:00:00'
```

### Array.from( )

从类数组或可迭代对象创建数组。

```js
// 字符串转数组
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

// Set 转数组
Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// 带映射函数
Array.from([1, 2, 3], (x) => x * 2); // [2, 4, 6]

// 生成序列
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### Array.of( )

创建数组。

```js
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(7); // [7] (不同于 new Array(7))
```

## 其他方法

### at( )

获取指定索引的元素，支持负索引。

```js
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(-1); // 5
arr.at(-2); // 4
```

### with( )

返回替换指定索引元素后的新数组。

```js
const arr = [1, 2, 3];
const newArr = arr.with(1, 5);
console.log(newArr); // [1, 5, 3]
console.log(arr); // [1, 2, 3]
```

### Array.isArray( )

判断是否为数组。

```js
Array.isArray([1, 2, 3]); // true
Array.isArray("hello"); // false
Array.isArray({ length: 0 }); // false
```

### keys( )、values( )、entries( )

返回迭代器。

```js
const arr = ["a", "b", "c"];

// 键迭代器
for (const key of arr.keys()) {
  console.log(key); // 0, 1, 2
}

// 值迭代器
for (const value of arr.values()) {
  console.log(value); // 'a', 'b', 'c'
}

// 键值对迭代器
for (const [index, value] of arr.entries()) {
  console.log(index, value); // 0 'a', 1 'b', 2 'c'
}
```

## 常用技巧

### 数组去重

```js
// 使用 Set
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]

// 使用 filter
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);
```

### 数组求和

```js
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((a, b) => a + b, 0); // 15
```

### 数组最大值/最小值

```js
const arr = [1, 5, 3, 9, 2];
Math.max(...arr); // 9
Math.min(...arr); // 1
```

### 数组分组

```js
const arr = [1, 2, 3, 4, 5, 6];
const grouped = arr.reduce((acc, cur) => {
  const key = cur % 2 === 0 ? "even" : "odd";
  acc[key] = acc[key] || [];
  acc[key].push(cur);
  return acc;
}, {});
// { odd: [1, 3, 5], even: [2, 4, 6] }
```

### 数组打乱

```js
const arr = [1, 2, 3, 4, 5];
arr.sort(() => Math.random() - 0.5);
```

### 数组分块

```js
const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );
};
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## 性能对比

| 方法          | 时间复杂度 | 是否改变原数组 |
| ------------- | ---------- | -------------- |
| push/pop      | O(1)       | 是             |
| unshift/shift | O(n)       | 是             |
| splice        | O(n)       | 是             |
| slice         | O(n)       | 否             |
| concat        | O(n)       | 否             |
| indexOf       | O(n)       | 否             |
| find          | O(n)       | 否             |
| map/filter    | O(n)       | 否             |
| sort          | O(n log n) | 是             |

## 最佳实践

::: tip 建议

- 优先使用不改变原数组的方法（如 map、filter、slice）
- 需要频繁添加/删除元素时，考虑使用 Set 或 Map
- 大数组操作注意性能，避免嵌套循环
  :::
