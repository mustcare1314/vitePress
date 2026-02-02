import{u as r,o as h,c as d,ak as k,j as s,t as i,k as n,a as e}from"./chunks/framework.H8Qeh0sT.js";const E=JSON.parse('{"title":"Runtime API Examples","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"examples/api-examples.md","filePath":"examples/api-examples.md"}'),o={name:"examples/api-examples.md"},f=Object.assign(o,{setup(g){const{site:m,theme:t,page:l,frontmatter:p}=r();return(c,a)=>(h(),d("div",null,[a[0]||(a[0]=k(`<h1 id="runtime-api-examples" tabindex="-1">Runtime API Examples <a class="header-anchor" href="#runtime-api-examples" aria-label="Permalink to “Runtime API Examples”">​</a></h1><p>此页面演示了VitePress提供的一些运行时API的使用方法。</p><p>主<code>useData（）</code>neneneba API可用于访问当前页面的网站、主题和页面数据。它在.md和.vue文件中都有效：</p><div class="language-md"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;script setup&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 主题数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 页面数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 页面前置数据</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to “Results”">​</a></h2><h3 id="主题数据" tabindex="-1">主题数据 <a class="header-anchor" href="#主题数据" aria-label="Permalink to “主题数据”">​</a></h3>`,6)),s("pre",null,i(n(t)),1),a[1]||(a[1]=s("h3",{id:"页面数据",tabindex:"-1"},[e("页面数据 "),s("a",{class:"header-anchor",href:"#页面数据","aria-label":"Permalink to “页面数据”"},"​")],-1)),s("pre",null,i(n(l)),1),a[2]||(a[2]=s("h3",{id:"页面前置数据",tabindex:"-1"},[e("页面前置数据 "),s("a",{class:"header-anchor",href:"#页面前置数据","aria-label":"Permalink to “页面前置数据”"},"​")],-1)),s("pre",null,i(n(p)),1),a[3]||(a[3]=s("h2",{id:"更多",tabindex:"-1"},[e("更多 "),s("a",{class:"header-anchor",href:"#更多","aria-label":"Permalink to “更多”"},"​")],-1)),a[4]||(a[4]=s("p",null,[e("查看"),s("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"markdown扩展的完整列表"),e(".")],-1))]))}});export{E as __pageData,f as default};
