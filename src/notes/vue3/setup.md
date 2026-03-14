# Vue 3 setup 语法糖

## 什么是 setup 语法糖

`<script setup>` 是 Vue 3 中的编译时语法糖，让组件代码更简洁。

```vue
<!-- 传统写法 -->
<script>
import { ref } from "vue";

export default {
  setup() {
    const count = ref(0);
    return { count };
  },
};
</script>

<!-- setup 语法糖 -->
<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
```

## 响应式数据

### ref( )

定义基本类型的响应式数据。

```vue
<script setup>
import { ref } from "vue";

const count = ref(0);
const message = ref("Hello");

// 修改值需要 .value
const increment = () => {
  count.value++;
};
</script>

<template>
  <!-- 模板中自动解包，不需要 .value -->
  <div>{{ count }}</div>
  <button @click="increment">+1</button>
</template>
```

### reactive( )

定义对象类型的响应式数据。

```vue
<script setup>
import { reactive } from "vue";

const state = reactive({
  count: 0,
  name: "John",
  user: {
    age: 25,
  },
});

// 直接修改属性
state.count++;
state.user.age = 26;
</script>

<template>
  <div>{{ state.count }}</div>
  <div>{{ state.name }}</div>
</template>
```

### ref vs reactive

| 特性     | ref      | reactive |
| -------- | -------- | -------- |
| 适用类型 | 任何类型 | 对象类型 |
| 访问方式 | .value   | 直接访问 |
| 重新赋值 | 支持     | 不支持   |
| 模板使用 | 自动解包 | 直接使用 |

```js
// ref 可以重新赋值
const count = ref(0);
count.value = 10; // ✅

// reactive 不能重新赋值
const state = reactive({ count: 0 });
state = { count: 10 }; // ❌ 失去响应式
state.count = 10; // ✅
```

## 计算属性

### computed( )

基于响应式数据计算派生值。

```vue
<script setup>
import { ref, computed } from "vue";

const firstName = ref("John");
const lastName = ref("Doe");

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

// 可写计算属性
const fullName2 = computed({
  get() {
    return `${firstName.value} ${lastName.value}`;
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(" ");
  },
});
</script>

<template>
  <div>{{ fullName }}</div>
</template>
```

## 侦听器

### watch( )

侦听响应式数据的变化。

```vue
<script setup>
import { ref, watch } from "vue";

const count = ref(0);
const message = ref("");

// 侦听单个 ref
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} -> ${newVal}`);
});

// 侦听多个源
watch([count, message], ([newCount, newMsg], [oldCount, oldMsg]) => {
  console.log("变化了");
});

// 侦听对象属性
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (newVal) => {
    console.log(newVal);
  },
);

// 立即执行 + 深度侦听
watch(
  count,
  (newVal) => {
    console.log(newVal);
  },
  { immediate: true, deep: true },
);
</script>
```

### watchEffect( )

自动追踪依赖并执行。

```vue
<script setup>
import { ref, watchEffect } from "vue";

const count = ref(0);
const message = ref("hello");

// 自动追踪 count 和 message
watchEffect(() => {
  console.log(`count: ${count.value}, message: ${message.value}`);
});

// 停止侦听
const stop = watchEffect(() => {
  console.log(count.value);
});
stop(); // 调用停止
</script>
```

### watch vs watchEffect

| 特性     | watch    | watchEffect |
| -------- | -------- | ----------- |
| 依赖追踪 | 手动指定 | 自动追踪    |
| 访问旧值 | 支持     | 不支持      |
| 执行时机 | 懒执行   | 立即执行    |
| 使用场景 | 明确依赖 | 副作用操作  |

## 生命周期钩子

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

// 组件挂载前
onBeforeMount(() => {
  console.log("挂载前");
});

// 组件挂载后（常用于 DOM 操作、API 请求）
onMounted(() => {
  console.log("挂载后");
});

// 组件更新前
onBeforeUpdate(() => {
  console.log("更新前");
});

// 组件更新后
onUpdated(() => {
  console.log("更新后");
});

// 组件卸载前
onBeforeUnmount(() => {
  console.log("卸载前");
});

// 组件卸载后（常用于清理定时器、事件监听）
onUnmounted(() => {
  console.log("卸载后");
});
</script>
```

### 生命周期对比

| 选项式 API    | 组合式 API      |
| ------------- | --------------- |
| beforeCreate  | setup( )        |
| created       | setup( )        |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeUnmount | onBeforeUnmount |
| unmounted     | onUnmounted     |

## 组件通信

### defineProps( )

接收父组件传递的属性。

```vue
<script setup>
// 基础用法
const props = defineProps(['title', 'count'])

// 带类型
const props = defineProps({
  title: String,
  count: Number,
  user: Object
})

// 带默认值和验证
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    validator: (value) => ['success', 'error'].includes(value)
  }
})

// TypeScript 类型定义
interface Props {
  title: string
  count?: number
}
const props = defineProps<Props>( )

// 使用 props
console.log(props.title)
</script>
```

### defineEmits( )

向父组件发送事件。

```vue
<script setup>
// 基础用法
const emit = defineEmits(['update', 'delete'])

// 带验证
const emit = defineEmits({
  update: (value) => {
    return typeof value === 'string'
  },
  delete: null
})

// TypeScript 类型定义
interface Emits {
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}
const emit = defineEmits<Emits>( )

// 触发事件
const handleClick = ( ) => {
  emit('update', 'new value')
  emit('delete', 123)
}
</script>

<template>
  <button @click="handleClick">点击</button>
</template>
```

### defineExpose( )

暴露组件内部方法给父组件。

```vue
<!-- 子组件 -->
<script setup>
import { ref } from "vue";

const count = ref(0);
const increment = () => count.value++;

// 暴露给父组件
defineExpose({
  count,
  increment,
});
</script>

<!-- 父组件 -->
<script setup>
import { ref } from "vue";
import Child from "./Child.vue";

const childRef = ref();

const callChild = () => {
  console.log(childRef.value.count);
  childRef.value.increment();
};
</script>

<template>
  <Child ref="childRef" />
  <button @click="callChild">调用子组件</button>
</template>
```

## 依赖注入

### provide / inject

跨层级组件通信。

```vue
<!-- 祖先组件 -->
<script setup>
import { ref, provide } from "vue";

const theme = ref("dark");
const updateTheme = (value) => {
  theme.value = value;
};

// 提供数据
provide("theme", theme);
provide("updateTheme", updateTheme);
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from "vue";

// 注入数据
const theme = inject("theme");
const updateTheme = inject("updateTheme");

// 带默认值
const theme = inject("theme", "light");
</script>

<template>
  <div>当前主题: {{ theme }}</div>
  <button @click="updateTheme('light')">切换主题</button>
</template>
```

## 模板引用

### ref 访问 DOM

```vue
<script setup>
import { ref, onMounted } from "vue";

const inputRef = ref(null);
const listRef = ref([]);

onMounted(() => {
  // 访问 DOM 元素
  inputRef.value.focus();

  // 访问列表元素
  console.log(listRef.value.length);
});
</script>

<template>
  <input ref="inputRef" />

  <ul>
    <li v-for="item in 3" :key="item" ref="listRef">
      {{ item }}
    </li>
  </ul>
</template>
```

## 组合式函数（Composables）

封装可复用的逻辑。

```js
// composables/useCounter.js
import { ref } from "vue";

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);

  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
```

```vue
<!-- 使用组合式函数 -->
<script setup>
import { useCounter } from "./composables/useCounter";

const { count, increment, decrement, reset } = useCounter(10);
</script>

<template>
  <div>{{ count }}</div>
  <button @click="increment">+</button>
  <button @click="decrement">-</button>
  <button @click="reset">重置</button>
</template>
```

### 常用组合式函数示例

```js
// useMousePosition.js
import { ref, onMounted, onUnmounted } from "vue";

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  const update = (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return { x, y };
}
```

```js
// useFetch.js
import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return { data, error, loading };
}
```

## 常见问题

### 1. 为什么 ref 需要 .value？

```js
// ref 返回的是一个对象，通过 .value 访问值
const count = ref(0)
console.log(count) // { value: 0 }
console.log(count.value) // 0

// 模板中自动解包
<template>
  {{ count }} <!-- 不需要 .value -->
</template>
```

### 2. reactive 的限制

```js
// ❌ 不能直接替换整个对象
let state = reactive({ count: 0 });
state = reactive({ count: 1 }); // 失去响应式

// ✅ 使用 Object.assign
Object.assign(state, { count: 1 });

// ✅ 或者使用 ref
const state = ref({ count: 0 });
state.value = { count: 1 }; // 保持响应式
```

### 3. 解构响应式对象

```js
import { reactive, toRefs } from "vue";

const state = reactive({ count: 0, name: "John" });

// ❌ 直接解构会失去响应式
const { count, name } = state;

// ✅ 使用 toRefs
const { count, name } = toRefs(state);
```

## 最佳实践

::: tip 建议

1. **简单类型使用 ref**：更灵活，还支持所有类型
2. **复杂类型使用 reactive**：不需要使用`.value`就可以访问
3. **组合式函数命名**：以 `use` 开头，如 `useCounter`
4. **避免过度响应式**：不需要响应的数据用普通变量
5. **合理拆分逻辑**：将相关逻辑封装成组合式函数
6. **TypeScript 支持**：使用类型定义提升开发体验
   :::

::: warning 注意

- `<script setup>` 中的代码会在每次组件实例创建时执行
- 避免在 setup 中使用 `this`，它不指向组件实例
- 异步操作记得在 `onUnmounted` 中清理
  :::
