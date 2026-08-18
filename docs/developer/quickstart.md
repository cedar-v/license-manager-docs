# 原生 API 灵活对接

原生 API 灵活对接适合需要完全控制客户端授权逻辑的团队。您需要自行实现激活请求、许可证与产品公钥保存、本地验签、状态判断、心跳同步和异常处理。

如果您希望更快完成接入，优先考虑 [AI 快速接入](./ai-quickstart.md) 或 [SDK 标准接入](./sdk/)。

## 适用场景

- 当前语言暂无官方 SDK
- 已有自己的授权框架，只想接入雪松授权云的接口能力
- 需要自定义许可证保存位置、验签流程或心跳策略
- 对错误码、日志、离线策略有强定制要求

## 前置要求

| 条件 | 说明 |
|------|------|
| 雪松授权云账号 | 已开通可用账号 |
| 平台地址 | `https://lic.cedar-v.com/` |
| 产品编码 | 例如 `demo-app` |
| 测试授权码 | 例如 `LIC-DEMO-XXXX-XXXX` |
| 客户端硬件指纹 | 用于绑定当前设备 |
| 本地保存目录 | 用于安全保存许可证和与其配对的产品公钥 |

## 第一步：准备平台与接口路径

平台地址：

```plaintext
https://lic.cedar-v.com/
```

常用接口路径：

```plaintext
POST /api/v1/activate
POST /api/v1/heartbeat
POST /api/v1/trial-license/status
POST /api/v1/trial-license
POST /api/v1/license-by-fingerprint
```

详细接口、错误码和 JSON 示例见 [API 总览](./api/)。

## 第二步：准备硬件指纹

客户端激活时必须提交 `hardware_fingerprint`。硬件指纹应由客户端根据稳定设备特征生成，优先来源包括：

- Windows `MachineGuid`
- Linux `machine-id`
- macOS `IOPlatformUUID`
- 固件 `System UUID` 或经过有效性检查的主板、CPU 标识

不要采集或使用 MAC 地址、IP 地址、网卡名称、网卡编号等网络接口信息生成指纹，也不要把它们作为回退值。否则更换网卡、切换联网方式、启停 VPN 或虚拟网卡都可能使已激活设备被误判为新设备。

建议客户端固定字段来源和规范化规则，并测试正常重启、软件升级和网络环境变化后指纹保持一致。更多策略见 [硬件指纹策略](./hardware-fingerprint.md)。

## 第三步：完成首次在线激活

客户端调用公开激活接口：

```http
POST /api/v1/activate
```

请求体示例：

```json
{
  "authorization_code": "LIC-DEMO-XXXX-XXXX",
  "hardware_fingerprint": "demo-device-fingerprint",
  "software_version": "1.0.0",
  "product_code": "demo-app",
  "device_info": {
    "os": "Windows",
    "hostname": "demo-pc"
  }
}
```

激活成功后，服务端会返回：

| 字段 | 用途 |
|------|------|
| `license_key` | 后续心跳和服务端查询使用 |
| `license_file` | 客户端本地校验使用的许可证内容 |
| `public_key` | 当前产品的 RSA 公钥；用于验证并与许可证配对保存 |
| `heartbeat_interval` | 建议心跳间隔，单位秒 |

## 第四步：验证并保存许可证与产品公钥

首次激活成功后，使用响应中的 `public_key` 验证同次返回的 `license_file`。完整校验通过后，将二者配对保存：

```plaintext
license.dat
license.pubkey
```

如果启用运行期心跳，还需要保存：

```plaintext
license_key
heartbeat_interval
```

::: warning 注意
不要在验签完成前保存或使用许可证内容。需要固定信任根的产品可以额外启用公钥预置或钉扎，但它不是首次在线激活的必要条件。
:::

## 第五步：本地校验许可证

客户端每次启动时建议先执行本地校验：

1. 读取 `license.dat`
2. 读取与许可证配对保存的产品公钥
3. 解码许可证内容
4. 使用公钥验证签名
5. 检查授权状态、有效期和设备指纹
6. 根据 `feature_config`、`usage_limits`、`custom_parameters` 控制业务功能

详细规则见 [本地许可证校验](./license-validation.md)。

## 第六步：处理运行期心跳

在线或混合模式下，客户端可以定期调用：

```http
POST /api/v1/heartbeat
```

心跳用于同步许可证状态、使用数据和可能更新的许可证文件。网络短暂不可用时，客户端应根据本地许可证策略处理，不应让业务启动完全依赖实时联网。

## 原生 API 接入检查清单

| 检查项 | 状态 |
|--------|------|
| 已生成稳定硬件指纹 | [ ] |
| 已完成在线激活 | [ ] |
| 已使用响应公钥验证 `license_file` | [ ] |
| 已配对保存许可证和产品公钥 | [ ] |
| 已实现本地验签 | [ ] |
| 已处理授权过期、锁定、设备不匹配 | [ ] |
| 已实现心跳和使用数据上报 | [ ] |
| 已处理心跳失败时的业务策略 | [ ] |
| 已按响应体 `code` 处理异常 | [ ] |

## 接下来阅读

- [API 总览](./api/)
- [在线激活](./activation-online.md)
- [本地许可证校验](./license-validation.md)
- [常见问题排查](./troubleshooting.md)
- [生产上线检查清单](./production-checklist.md)
