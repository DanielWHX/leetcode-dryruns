# LeetCode · Interactive Dry Runs

一个无需安装依赖的算法交互演示集合。目前包含 **LC 1249 — Minimum Remove to Make Valid Parentheses**。

## 打开

直接在浏览器中打开 `1249.html`，或通过静态网页服务打开 `index.html`。
无需 npm、React、Backend、API Key 或外部 CDN。

## 交互

- 上一步、下一步、重置、自动播放与速度调整。
- Pass 1 / Pass 2 / Reverse + Join 阶段切换。
- 逐字符高亮；展示 res、cnt、filtered 的实时快照。
- 同步高亮 Python 代码。
- 自定义输入（小写字母与括号，最多 120 字符）及多个 Edge Case。
- 键盘左右键切换，Space 播放或暂停（输入框和控件有焦点时不抢键盘）。
- 自适应手机宽度，支持浅色/深色。
- HTTPS 部署后可复制当前示例与步骤链接；示例存放在 URL fragment，不会作为网络请求参数发送。
- `?embed=1` 隐藏大标题，便于嵌入 Notion；例如 `1249.html?embed=1`。

## 算法

采用 Two Pass + Balance Counter，不使用保存括号 Index 的 Stack。

1. 从左往右：保留字母与左括号；遇到右括号且 cnt > 0 时保留并匹配，否则跳过。
2. 从右往左：跳过剩余 cnt 个左括号，将其他字符放入 filtered。
3. Reverse filtered，再 Join 返回结果。

第二遍只按数量删除最右侧的左括号，不追踪第一遍的具体配对。例如 `(()` 删除中间的 `(` 后得到 `()`，仍然是最少删除的合法答案。

Python 算法的 Time 为 O(n)、Space 为 O(n)。本演示为每一步保存快照，有额外存储成本，因此可视化输入上限为 120。这不是原题的输入上限。

## 测试

安装了 Node.js 的环境可以运行：

```sh
node test.mjs
```

测试包括：9,841 个长度 0–8、字符集为 `()a` 的穷举输入与 Brute Force 对比，1,000 个确定性随机输入，典型示例、输入校验与 JavaScript syntax check。

## GitHub Pages

将这里的文件放入公开仓库的根目录。选择 Settings → Pages → Deploy from a branch → main → /(root)。保留 `.nojekyll`。演示不会发布任何 Notion 笔记、凭据或个人资料。

官方说明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://www.notion.com/help/embed-and-connect-other-apps

只有真实发布并验证可访问之后，才能把 HTTPS 地址粘贴进 Notion `/embed`。HTML 下载链接不是部署地址。
