# 客户端 SDK

License Manager 提供可复用的客户端 SDK，涵盖许可证解析、验签与运行时校验等常见能力，避免你在各个项目中反复实现安全细节。

::: tip 开发者接入
如果您正在把雪松授权云接入到自己的软件中，建议从 [开发者中心](/developer/) 开始。那里按接入方式整理了 [AI 快速接入](/developer/ai-quickstart.md)、[SDK 标准接入](/developer/sdk/)、[原生 API 灵活对接](/developer/quickstart.md)、[在线激活](/developer/activation-online.md) 和 [常见问题排查](/developer/troubleshooting.md)。
:::

## 快速入口

目前官方提供了以下语言的客户端 SDK 仓库（含 README、示例与 API 说明）：

- **Go SDK**: [https://github.com/cedar-v/license-manager-sdk-go](https://github.com/cedar-v/license-manager-sdk-go)
- **Python SDK**: [https://github.com/cedar-v/license-manager-sdk-python](https://github.com/cedar-v/license-manager-sdk-python)
  - PyPI 安装: `pip install cedarv-license-manager-sdk`
- **C++ SDK**: [https://github.com/cedar-v/license-manager-sdk-cpp](https://github.com/cedar-v/license-manager-sdk-cpp)
- 其他语言SDK正在开发中，敬请期待。

- 许可证结构参考：[`/guide/license-token-structure`](/guide/license-token-structure)

> SDK 具体使用方法（安装、配置、代码示例等）请直接参考仓库 README；这里只保留索引，确保信息只维护一份。

## 典型使用场景

- 桌面/边缘客户端在启动阶段校验许可证合法性
- 需要与 License Manager 云端做心跳或续期的混合部署
- 通过统一错误码与日志追踪客户端授权状态

## 接入路径

- AI 辅助接入：[AI 快速接入](/developer/ai-quickstart.md)
- SDK 标准接入：[SDK 总览](/developer/sdk/)
- C# 标杆流程：[C# SDK 接入](/developer/sdk/csharp.md)
- 原生 API 灵活对接：[原生 API 灵活对接](/developer/quickstart.md)
- 本地验签：[本地许可证校验](/developer/license-validation.md)
- 排查问题：[常见问题排查](/developer/troubleshooting.md)

如需在社群反馈功能需求或提 Issue，也欢迎直接在仓库参与讨论。
