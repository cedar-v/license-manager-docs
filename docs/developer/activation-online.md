# 在线激活

在线激活适用于客户端首次运行时可以访问 License Manager 服务的场景。客户端提交授权码、产品编码和硬件指纹，服务端校验通过后返回许可证和产品级公钥；首次在线激活不要求预先内置公钥。

## 适用场景

- 桌面软件首次启动时联网激活
- 工业软件在交付现场可临时联网激活
- 客户端需要后续通过心跳同步授权状态
- 软件需要根据云端变更更新本地许可证

## 流程概览

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant LM as License Manager
    participant Local as 本地存储

    Client->>Client: 生成硬件指纹
    Client->>LM: POST /api/v1/activate
    LM->>LM: 校验授权码、有效期、设备数、锁定状态
    LM-->>Client: 返回 license_file、public_key、license_key
    Client->>Client: 使用响应公钥完成验签与状态校验
    Client->>Local: 配对保存许可证和产品公钥
    Client-->>Client: 放行业务功能
```

## 请求信息

接口：

```http
POST /api/v1/activate
```

关键字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `authorization_code` | 是 | 授权码 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹 |
| `product_code` | 推荐固定传入 | 客户端对应的产品编码 |
| `software_version` | 否 | 客户端软件版本 |
| `device_info` | 否 | 设备信息，例如系统、主机名、版本等 |

请求体示例：

```json
{
  "authorization_code": "LIC-DEMO-XXXX-XXXX",
  "hardware_fingerprint": "demo-device-fingerprint",
  "product_code": "demo-app",
  "software_version": "1.0.0",
  "device_info": {
    "os": "Windows",
    "hostname": "demo-pc"
  }
}
```

## 响应信息

激活成功后，`data` 中包含：

| 字段 | 说明 |
|------|------|
| `license_key` | 许可证密钥，用于心跳和服务端查询 |
| `license_file` | Base64 编码的许可证文件 |
| `public_key` | 当前产品的 RSA 公钥；用于验证并与本次许可证配对保存 |
| `heartbeat_interval` | 心跳间隔，单位秒 |

客户端先使用响应中的 `public_key` 验证同次返回的 `license_file`，完成状态、有效期和设备指纹检查后，再配对保存。完整规则见 [许可证结构与验证](/guide/license-token-structure.md)。

## 后续启动

激活成功后，客户端后续启动不应每次都强依赖在线激活。推荐顺序：

1. 读取本地许可证和配对保存的产品公钥
2. 本地验签
3. 检查状态、有效期和设备指纹
4. 放行业务功能
5. 如果启用心跳，再异步或后台同步云端状态

## 常见失败

| 现象 | 常见原因 | 下一步 |
|------|----------|--------|
| 返回 400 | 请求字段缺失或格式错误 | 检查授权码和硬件指纹 |
| 返回 404 | 授权码不存在 | 确认授权码是否来自当前环境 |
| 返回 409 | 授权码已锁定、已过期或不可激活 | 查看授权状态和激活次数 |
| 验签失败 | 许可证不是由当前产品签发或许可证文件损坏 | 查看 [常见问题排查](./troubleshooting.md) |

## 相关文档

- [AI 快速接入](./ai-quickstart.md)
- [原生 API 灵活对接](./quickstart.md)
- [本地许可证校验](./license-validation.md)
- [激活接口](./api/activation.md)
- [常见问题排查](./troubleshooting.md)
