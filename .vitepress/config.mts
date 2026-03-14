import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",
  lastUpdated: true,
  lang: "zh-CN",

  title: "care",
  description: "emmm",
  themeConfig: {
    lastUpdated: {
      text: "最后更新时间",
    },

    // 中文本地化
    outlineTitle: "页面导航",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
    langMenuLabel: "多语言",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

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
            text: "JavaScript",
            collapsed: true,
            items: [
              {
                text: "数组方法大全",
                link: "/notes/javaScript/array",
              },
              {
                text: "this 指向规则",
                link: "/notes/javaScript/this",
              },
            ],
          },
          {
            text: "网络相关",
            collapsed: true,
            items: [
              { text: "SSE学习笔记", link: "/notes/internet/sse" },
              {
                text: "常见状态码以及含义",
                link: "/notes/internet/statusCode",
              },
            ],
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
