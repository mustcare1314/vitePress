---
title: SSE 学习笔记
---

# SSE（Server-Sent Events）学习笔记

日期：2026-02-02

这是我在学习 SSE 的记录与一些心得。

## SSE 是什么

SSE 是一种从服务器单向推送事件到浏览器的技术。它基于 HTTP 协议，使用文本流（text/event-stream）格式，浏览器通过 `EventSource` API 接收消息。下面是 SSE 的一些**关键特性**：

优点：

- 简单易用，基于标准 HTTP，易于穿透防火墙和代理。
- 适合单向实时消息（如日志、通知、状态更新）。

限制：

- 仅支持服务器到客户端的单向流；如果需要双向通信，应使用 WebSocket。
- 受限于 HTTP 长连接特性，可能需要心跳/重连策略来保证稳定性。

## 简单示例（伪代码）

服务器端（Express 为例）:

```js
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // 发送一条事件
  res.write(`data: ${JSON.stringify({ msg: "hello" })}\n\n`);

  // 定期发送心跳，避免连接被中间代理关闭
  const id = setInterval(() => {
    res.write(":\n"); // 以注释行作为心跳
  }, 30000);

  req.on("close", () => {
    clearInterval(id);
  });
});
```

客户端（浏览器）:

```js
const es = new EventSource("/sse");
es.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log("收到消息", data);
};
es.onerror = (err) => {
  console.warn("SSE 错误或已断开，会自动重连", err);
};
```

## 实践经验与注意点

- 连接自动重连：浏览器的 `EventSource` 会在网络断开后自动重连。可通过服务器端发送 `retry` 指令调整重连时间。
- 心跳/KeepAlive：部分代理会在长时间无数据流时中断连接，建议发送空注释行或定期 ping。
- 身份验证：使用 Cookie、带 token 的查询字符串或在握手前完成认证（注意不要把敏感 token 放在 URL 中，如果需要可在首次请求后升级为长期会话）。
- 限流与负载：长连接会占用服务器资源，需要评估并用连接池或反向代理配合等等。

## 个人感悟（仅为个人观点）

SSE 在实现简单的实时推送场景时非常方便，尤其是在只需要服务器向客户端单向通知的场景（例如通知中心、日志流、进度更新）上，它比 WebSocket 更轻量、实现成本更低。生产上要注意连接管理、心跳和代理行为。

如果未来项目需要双向通信或高频低延迟交互，优先考虑 WebSocket；但在多数普通实时通知场景，SSE 已足够且更易维护。
