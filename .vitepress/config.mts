import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",

  title: "care",
  description: "emmm",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/examples/markdown-examples" },
      { text: "学习笔记", link: "/notes/internet/sse" },
    ],

    // 侧边栏
    sidebar: [
      {
        text: "官方示例",
        collapsed: true,
        items: [
          { text: "md文件试例", link: "/examples/markdown-examples" },
          { text: "运行时API示例", link: "/examples/api-examples" },
        ],
      },
      {
        text: "学习笔记",
        collapsed: true,
        items: [
          {
            text: "网络相关",
            collapsed: true,
            items: [{ text: "SSE学习笔记", link: "/notes/internet/sse" }],
          },
          {
            text: "vue3相关",
            collapsed: true,
            items: [{ text: "setup语法糖", link: "/notes/vue3/setup" }],
          },
        ],
      },
    ],

    // 搜索
    search: {
      provider: "local",
    },

    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
