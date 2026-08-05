# 激活接口

激活接口用于客户端使用授权码获取许可证文件。正式客户端应预先内置产品公钥，并提交授权码、产品编码和硬件指纹；服务端校验通过后返回许可证、公钥、许可证密钥和心跳间隔。

## 在线激活

```http
POST /api/v1/activate
```

请求字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `authorization_code` | 是 | 授权码 |
| `hardware_fingerprint` | 是 | 硬件指纹 |
| `product_code` | 否（正式接入推荐固定传入） | 客户端产品编码，用于校验授权码关联产品 |
| `software_version` | 否 | 软件版本 |
| `device_info` | 否 | 设备信息 |

响应字段：

| 字段 | 说明 |
|------|------|
| `license_key` | 许可证密钥 |
| `license_file` | Base64 编码的加密许可证文件 |
| `public_key` | 兼容字段；使用内置产品公钥接入时无需处理 |
| `heartbeat_interval` | 心跳间隔，单位秒 |

::: warning 公钥信任规则
客户端使用发布前内置的产品公钥验证 `license_file`，无需处理响应中的 `public_key`。
:::

## 心跳同步

```http
POST /api/v1/heartbeat
```

请求字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `license_key` | 是 | 激活成功后返回的许可证密钥 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹 |
| `software_version` | 否 | 软件版本 |
| `config_updated_at` | 否 | 客户端配置更新时间 |
| `usage_data` | 否 | 使用数据 |

响应字段：

| 字段 | 说明 |
|------|------|
| `status` | 许可证状态 |
| `config_updated` | 配置是否有更新 |
| `license_file` | 如有更新，返回新的许可证文件 |
| `heartbeat_interval` | 下次心跳间隔 |

## 状态码

| 状态码 | 场景 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数无效 |
| 404 | 授权码或许可证不存在 |
| 409 | 授权码已锁定、已过期，或许可证已被撤销 |

## 相关文档

- [在线激活](../activation-online.md)
- [本地许可证校验](../license-validation.md)
- [错误码](./errors.md)
