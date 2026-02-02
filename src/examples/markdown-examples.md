#Markdown扩展示例

此页面演示了VitePress提供的一些内置markdown扩展。

##语法高亮显示

VitePress提供由[Shiki]支持的语法高亮显示(https://github.com/shikijs/shiki)，具有线条突出显示等附加功能：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: '高亮的!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: '高亮的!'
    }
  }
}
```

## 定制容器

**输入**

```md
::: info
这是一个信息盒子.
:::

::: tip
这是一个提示.
:::

::: warning
这是一个警告提示.
:::

::: danger
这是一个危险提示.
:::

::: details
这是一个详细块.
:::
```

**输出**

::: info
这是一个信息盒子.
:::

::: tip
这是一个提示.
:::

::: warning
这是一个警告提示.
:::

::: danger
这是一个危险提示.
:::

::: details
这是一个详细块.
:::

## 更多

查看[markdown扩展的完整列表](https://vitepress.dev/guide/markdown).
