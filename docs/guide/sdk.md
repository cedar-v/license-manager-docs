# 客户端 SDK

License Manager 提供可复用的客户端 SDK，涵盖许可证解析、验签与运行时校验等常见能力，避免你在各个项目中反复实现安全细节。

## 快速入口

- GitHub 仓库（含 README、示例与 API 说明）：[https://github.com/cedar-v/license-manager-sdk-go](https://github.com/cedar-v/license-manager-sdk-go)
- 许可证结构参考：[`/guide/license-token-structure`](/guide/license-token-structure)

> SDK 具体使用方法（安装、配置、代码示例等）请直接参考仓库 README；这里只保留索引，确保信息只维护一份。

## 典型使用场景

- 桌面/边缘客户端在启动阶段校验许可证合法性
- 需要与 License Manager 云端做心跳或续期的混合部署
- 通过统一错误码与日志追踪客户端授权状态

如需在社群反馈功能需求或提 Issue，也欢迎直接在仓库参与讨论。