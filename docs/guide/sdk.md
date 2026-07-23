# 客户端 SDK（可选）

License Manager 提供可选的客户端 SDK，适合明确希望使用封装语言库的团队。

::: tip 新项目推荐
新项目优先使用 [AI 原生 API 快速接入（推荐）](/developer/ai-quickstart.md)。它通过统一协议提示词和业务模板，让 AI 在您的对接项目中直接调用原生 HTTP 接口，不要求安装 SDK。
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

- 推荐方式：[AI 原生 API 快速接入（推荐）](/developer/ai-quickstart.md)
- SDK 接入（可选）：[SDK 总览](/developer/sdk/)
- C# 标杆流程：[C# SDK 接入](/developer/sdk/csharp.md)
- 原生 API 灵活对接：[原生 API 灵活对接](/developer/quickstart.md)
- 本地验签：[本地许可证校验](/developer/license-validation.md)
- 排查问题：[常见问题排查](/developer/troubleshooting.md)

如需在社群反馈功能需求或提 Issue，也欢迎直接在仓库参与讨论。
