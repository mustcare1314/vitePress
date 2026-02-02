---
outline: deep
---

# Runtime API Examples

此页面演示了VitePress提供的一些运行时API的使用方法。

主`useData（）`neneneba API可用于访问当前页面的网站、主题和页面数据。它在.md和.vue文件中都有效：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### 主题数据

<pre>{{ theme }}</pre>

### 页面数据

<pre>{{ page }}</pre>

### 页面前置数据

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### 主题数据

<pre>{{ theme }}</pre>

### 页面数据

<pre>{{ page }}</pre>

### 页面前置数据

<pre>{{ frontmatter }}</pre>

## 更多

查看[markdown扩展的完整列表](https://vitepress.dev/reference/runtime-api#usedata).
