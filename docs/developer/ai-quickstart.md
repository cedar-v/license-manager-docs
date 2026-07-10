# AI 快速接入

AI 快速接入适合希望让 AI 辅助改造现有项目的团队。您只需要把项目代码和本文列出的关键文档链接提供给 AI，让 AI 根据您的技术栈生成接入方案和代码改造。

这种方式不是替代人工审核。AI 生成代码后，仍需要开发人员检查授权流程、错误处理、安全存储和生产上线策略。

## 适用场景

- 您已经有一个可运行的软件项目
- 希望快速把雪松授权云接入现有启动流程
- 希望 AI 根据项目语言和目录结构选择 SDK 或原生 API
- 希望生成接入方案、代码修改点和测试清单

## 给 AI 的资料

把下面这些链接和您的项目代码一起提供给 AI：

| 资料 | 链接 | 用途 |
|------|------|------|
| 开发者中心 | `/developer/` | 了解三种接入方式 |
| SDK 标准接入 | `/developer/sdk/` | SDK 优先方案 |
| C# SDK 接入 | `/developer/sdk/csharp` | C# 标杆流程 |
| C# SDK 仓库 | `https://github.com/cedar-v/license-manager-dotnet.git` | C# SDK 源码、示例和打包方式 |
| 原生 API 灵活对接 | `/developer/quickstart` | 无 SDK 或深度定制时使用 |
| API 总览 | `/developer/api/` | 接口、错误码、JSON 示例 |
| 本地许可证校验 | `/developer/license-validation` | 验签和授权状态判断 |
| 硬件指纹策略 | `/developer/hardware-fingerprint` | 设备绑定策略 |
| 常见问题排查 | `/developer/troubleshooting` | 异常处理和排查 |
| 生产上线检查清单 | `/developer/production-checklist` | 上线前自检 |

如果 AI 工具不能访问相对路径，请使用完整文档站地址加上路径。

## 推荐提示词

您可以把下面这段话发给 AI：

```text
请帮我把当前项目接入雪松授权云授权体系。

优先选择 SDK 标准接入；如果当前语言没有可用 SDK，再使用原生 API 灵活对接。

请先阅读以下文档：
- /developer/
- /developer/sdk/
- /developer/sdk/csharp
- https://github.com/cedar-v/license-manager-dotnet.git
- /developer/quickstart
- /developer/api/
- /developer/license-validation
- /developer/hardware-fingerprint
- /developer/troubleshooting
- /developer/production-checklist

接入目标：
1. 软件启动时先检查本地许可证。
2. 本地许可证不存在或无效时，引导用户输入授权码或领取试用。
3. 激活成功后保存 license_file 和 public_key。
4. 使用 public_key 对 license_file 做本地验签。
5. 根据 status、end_date、hardware_fingerprint 判断是否放行业务功能。
6. 读取 feature_config、usage_limits、custom_parameters 控制业务能力。
7. 在线或混合模式下定期调用心跳接口，上报 usage_data。
8. 所有接口必须判断响应体 code，不能只判断 HTTP 状态码。
9. 不要在日志中输出完整授权码、API Key、私钥或客户敏感信息。

请先给出改造方案、涉及文件清单和风险点，再开始修改代码。
```

## AI 应该产出的内容

| 产物 | 要求 |
|------|------|
| 接入方案 | 说明选择 SDK 还是原生 API，以及原因 |
| 文件清单 | 列出需要新增或修改的文件 |
| 启动流程 | 明确授权校验插入到应用启动的哪个位置 |
| 授权服务封装 | 提供激活、校验、心跳、试用、错误处理的统一封装 |
| 配置项 | 平台地址、产品编码、许可证保存路径、公钥保存路径 |
| 错误处理 | 覆盖授权码不存在、过期、锁定、激活次数满、心跳撤销等场景 |
| 测试清单 | 覆盖首次激活、本地启动、过期、换机、断网、心跳更新 |

## 人工审核重点

AI 生成代码后，重点检查：

1. 是否把授权校验放在业务功能启动前。
2. 是否保存并配对使用 `license_file` 和 `public_key`。
3. 是否先验签，再读取许可证里的业务授权内容。
4. 是否检查设备指纹、有效期和授权状态。
5. 是否正确处理响应体 `code`。
6. 是否避免把敏感信息写入日志。
7. 网络失败时是否有明确策略。
8. 试用和正式授权是否不会互相覆盖。

## 接下来阅读

- [SDK 标准接入](./sdk/)
- [原生 API 灵活对接](./quickstart.md)
- [API 总览](./api/)
- [生产上线检查清单](./production-checklist.md)
