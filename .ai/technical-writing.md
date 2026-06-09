---
name: technical-writing
description: 优化和编写 License Manager（VitePress）技术文档，涵盖文档结构、写法规范、i18n 多语言、VitePress 语法及 Mermaid 图表。当用户提到编写文档、修改文档、文档规范、文档结构时触发。
---

项目源码参考：`C:\B-work\thingspanel-work\0-m\code\license-manager-enterprise`

---

# Technical Writing - License Manager 文档写作规范

## 核心原则

**文档全局观**：动笔前先了解上下文。阅读同目录下已有文档，掌握该模块的写作风格、术语一致性和结构惯例。

**上下文不足时主动提问，不做猜测。** 需要确认的维度：
- 目标读者是谁？
- 这篇文档在文档树中的位置是什么？
- 现有类似文档的写作风格如何？
- 是否需要更新 `config.mjs` 的 sidebar 配置？

**结构清晰简单**：让读者能快速找到需要的内容，看完能明白怎么操作。

**必要时用图表**：Mermaid 流程图/架构图、表格对比比文字描述更直观。

---

## 项目文档架构

```
license-manager-docs/
├── docs/                         # 中文文档（默认语言）
│   ├── index.md                 # 首页（VitePress Home Page）
│   ├── guide/                   # 指南文档目录
│   │   ├── index.md             # 介绍
│   │   ├── getting-started.md   # 快速开始
│   │   ├── operating_guide.md  # 操作指南
│   │   ├── license-token-structure.md  # 许可证结构
│   │   ├── sdk.md               # 客户端 SDK
│   │   ├── client-simulator.md  # 客户端授权测试工具
│   │   ├── api.md               # 接口文档
│   │   ├── community_strategy.md # 社区发展策略
│   │   ├── why/                 # 战略洞察（子目录）
│   │   └── cases/               # 客户案例（子目录）
│   ├── en/                      # 英文文档（独立目录）
│   │   ├── index.md
│   │   └── guide/...
│   ├── public/                  # 静态资源（图片、css）
│   └── .vitepress/
│       └── config.mjs           # 站点配置（含 sidebar 导航）
```

**路由规则**：VitePress 路由基于文件路径，无需 frontmatter 的 `sidebar_position`。

- `docs/guide/index.md` → `/guide/`
- `docs/guide/getting-started.md` → `/guide/getting-started`
- `docs/en/guide/index.md` → `/en/guide/`

**sidebar 配置**：导航顺序在 `config.mjs` 的 `themeConfig.sidebar` 中定义，新增文档需同步更新该文件。

---

## VitePress 文档结构

### 首页（Home Page）

首页使用 VitePress 的 `layout: home`，参考 `docs/index.md`。无需 frontmatter，通过 YAML 配置 hero、信息卡片等区块。

### 指南文档

普通文档页面无需任何 frontmatter，直接以 Markdown 内容编写。文档标题在文件中用 `# 一级标题` 定义。

### 添加新文档到导航

在 `config.mjs` 的 sidebar 中添加 item，格式如下：

```js
{ text: '文档标题', link: '/guide/your-doc' }
```

---

## VitePress 常用 Markdown 语法

### 标题层级

```markdown
# 一级标题（页面标题，一个文档只有一个）
## 二级标题（主要章节）
### 三级标题（子章节）
```

最多用到三级，避免更深嵌套。

### 代码块

```markdown
安装命令：
​```bash
curl -fsSL https://install.example.com/install.sh | sh
​```

结果输出：
​```plaintext
Installation complete!
Access at: http://your-ip-address
​```
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容 | 内容 | 内容 |
```

### 提示块（VitePress 支持的容器）

```markdown
::: info 信息
这是信息内容
:::

::: tip 提示
这是提示内容
:::

::: warning 注意
这是警告内容
:::

::: danger 警告
这是危险警告内容
:::
```

### 折叠内容

```markdown
<details>
<summary>点击展开详情</summary>
展开后的内容
</details>
```

### Mermaid 图表

VitePress 通过 `vitepress-plugin-mermaid` 插件支持 Mermaid（已在 `config.mjs` 中启用）。

```markdown
```mermaid
flowchart LR
    A[设备] -->|上报数据| B[MQTT Broker]
    B --> C[ThingsPanel]
```
```

常用图表类型：
- `flowchart` / `graph` — 流程图、架构图
- `sequenceDiagram` — 时序图
- `stateDiagram` — 状态图
- `pie` — 饼图

图表应配合文字说明，帮助读者理解。

### 图片

```markdown
![图片描述](/images/your-image.png)
```

图片放在 `docs/public/` 目录下，引用时使用绝对路径 `/`。

### Iconify 图标

项目使用 iconify-icon，可在 Markdown 中直接引用：

```html
<iconify-icon icon="solar:shield-keyhole-bold-duotone" width="48" height="48"></iconify-icon>
```

图标名称格式：`{集}:{图标名}`，可从 [icon-sets.iconify.design](https://icon-sets.iconify.design) 查询。

### 链接

```markdown
[链接文字](https://example.com)
[站内相对链接](./other-page.md)
[站内锚点链接](./guide.md#标题)
```

---

## 文档结构模板

### 操作类文档（安装、配置、接入）

```markdown
# 标题

## 简介
一句话说明本文档做什么。

## 前置要求
列出必要条件（系统要求、账号、前置依赖）。

## 步骤（核心）
按操作顺序分步说明，每步标题用动词：
### 第一步：准备工作
### 第二步：执行安装
### 第三步：验证结果

## 后续操作
可选，介绍完成后可以做什么。

## 故障排除
列出常见问题和解决方法。

## 相关文档
链接到相关文档。
```

### 案例文档（客户故事）

**目标读者**：潜在客户、决策者。读者要能快速判断"这个产品能不能解决我的问题"。

核心要求：**每个段落必须有信息增量，不重复已说过的内容，不铺垫情绪**。

```markdown
# 客户案例：（一句话核心主题）

## 背景
直接说问题或困境，1-2 段。不要铺情绪，读者不关心故事铺垫。

## 具体方案
产品如何解决这个困境。接入方式用代码示例，操作特性用截图或表格。

## 效果/变化
说结果，不说意义。不喊口号，让数字和行为说话。

## 客户反馈（可选）
一段真实引述，保留说话者的语气。
```

**常见错误（必须避免）**：
- 开头大段铺情绪（"他/她一直在思考..."），读者跳过
- 同一件事在不同章节重复说（硬件绑定说了三遍）
- 结尾加"结语""真正的价值"等总结段落，读者已经明白了
- 把客户反馈写成公司荣誉墙，大段公司介绍

---

## 写作风格

### 语言

**中文文档**：
- 中文为主，术语首次出现时括号注明英文（如：设备指纹（Hardware Fingerprint））。
- 英文专有名词保持原样（MQTT、Docker、Redis、Go）。
- 语气友好，用"您"而非"你"。
- 标题可适当使用 emoji 图标（参考已有文档风格）。

**英文文档**：
- 英文为主，中文术语首次出现时括号注明（如：License Manager（许可证管理器））。
- 术语参照中文文档保持一致。

### 句子

- 短句为主，每段不超过 3-4 句。
- 主动语态："点击「添加设备」" 而非 "「添加设备」按钮被点击"。
- 操作指令用祈使句："运行以下命令"。

### 格式

- 列表项用 `-` 或 `1.` 保持一致。
- 命令和路径用反引号 `` ` `` 包裹。
- 重要信息加粗 `**重点**`。

---

## 多语言（i18n）

中文文档位于 `docs/guide/`，英文文档位于 `docs/en/guide/`。

- 中英文文档结构保持一一对应。
- 中英文 sidebar 分别在 `config.mjs` 的 `locales.root.themeConfig.sidebar` 和 `locales.en.themeConfig.sidebar` 中配置。
- 术语翻译参照已有惯例，不自创翻译。

---

## 文档自检清单

写完文档后，检查：

1. 是否在 `config.mjs` 的 sidebar 中添加了新文档条目（且顺序合理）
2. 标题层级是否清晰（最多三级）
3. 代码块是否有语言标签（`bash`、`plaintext`、`json` 等）
4. 表格是否有表头
5. 图表是否有文字说明
6. 链接是否正确（相对路径或完整 URL）
7. 术语是否与项目中其他文档一致
8. 操作步骤是否有顺序（第一步→第二步→）
9. 是否有必要的前置条件和后续操作说明
10. 中英文章节是否对应（若双语同步更新）
11. 上下文不足时是否主动提问而非猜测
