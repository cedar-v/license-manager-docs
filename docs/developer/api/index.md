# API 总览

本页按当前后端实现整理客户端接入 API。默认对接雪松授权云平台：

```plaintext
https://lic.cedar-v.com/
```

客户端调用时应同时判断：

1. HTTP 状态码
2. 响应 JSON 中的 `code`

原因是当前后端部分业务错误会通过响应体 `code` 表达，不能只依赖 HTTP 状态码判断成功或失败。

## 通用响应结构

成功响应：

```json
{
  "code": "000000",
  "message": "成功",
  "data": {}
}
```

错误响应：

```json
{
  "code": "900001",
  "message": "请求参数无效",
  "timestamp": "2026-07-10T10:00:00+08:00"
}
```

## 当前开放的客户端接口

| 场景 | 接口 | 认证 | 说明 |
|------|------|------|------|
| 在线激活 | `POST /api/v1/activate` | 无需登录 | 使用授权码激活并获取许可证 |
| 心跳同步 | `POST /api/v1/heartbeat` | 无需登录 | 上报在线状态、使用数据，检查配置更新 |
| 试用状态查询 | `POST /api/v1/trial-license/status` | 无需登录 | 查询当前设备是否可领取产品试用 |
| 领取试用许可证 | `POST /api/v1/trial-license` | 无需登录 | 为设备自动签发试用授权和许可证 |
| 按设备指纹查询许可证 | `POST /api/v1/license-by-fingerprint` | 无需登录 | 查询该设备最新许可证和公钥 |

## 在线激活

客户端首次使用授权码激活软件。

```http
POST /api/v1/activate
Content-Type: application/json
```

### 请求字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `authorization_code` | 是 | 授权码。兼容 `{授权码}&{payload}` 格式，服务端会截取 `&` 前的授权码本体 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹 |
| `device_info` | 否 | 设备信息 |
| `software_version` | 否 | 客户端软件版本 |
| `product_code` | 否 | 产品项编码。传入时会校验授权码是否属于该产品 |
| `product` | 否 | 兼容旧字段，含义同 `product_code` |
| `procuct` | 否 | 兼容误拼字段，含义同 `product_code` |

### 请求示例

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

### 成功响应

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "license_key": "LIC-KEY-20260710-ABCDEFG",
    "license_file": "BASE64_LICENSE_FILE",
    "heartbeat_interval": 300,
    "public_key": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
  }
}
```

客户端需要保存：

- `license_file`
- `public_key`
- `license_key`
- `heartbeat_interval`

### 激活异常

| 后端触发条件 | HTTP | `code` | `message` 示例 |
|--------------|------|--------|----------------|
| JSON 格式错误、缺少授权码 | 400 | `900001` | 请求参数无效 |
| 授权码不存在 | 404 | `300001` | 授权码不存在 |
| 传入 `product_code` 但产品不匹配 | 404 | `300001` | 授权码不存在 |
| 授权码未到开始时间或已过期 | 404 | `300001` | 授权码不存在 |
| 授权码已锁定 | 当前实现按错误码映射 | `300003` | 授权码已被锁定 |
| 激活数量已达上限 | 409 | `300004` | 激活数量已达上限 |
| 租户不可用或权限不足 | 403 | `100005` | 权限不足 |
| 租户配额不足或资源冲突 | 409 | `900003` | 资源冲突 |
| 服务端异常 | 500 | `900004` | 服务器内部错误 |

错误响应示例：

```json
{
  "code": "300004",
  "message": "激活数量已达上限",
  "timestamp": "2026-07-10T10:00:00+08:00"
}
```

## 心跳同步

客户端定期上报在线状态和使用数据。服务端会更新最后心跳时间、最后在线 IP，并在授权配置更新时返回新的许可证文件。

```http
POST /api/v1/heartbeat
Content-Type: application/json
```

### 请求字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `license_key` | 是 | 激活或试用领取返回的许可证密钥 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹 |
| `config_updated_at` | 否 | 客户端本地配置更新时间，RFC3339 格式 |
| `usage_data` | 否 | 客户端使用数据，会保存到许可证 `usage_data` |
| `software_version` | 否 | 客户端软件版本 |

### 请求示例

```json
{
  "license_key": "LIC-KEY-20260710-ABCDEFG",
  "hardware_fingerprint": "demo-device-fingerprint",
  "software_version": "1.0.0",
  "config_updated_at": "2026-07-10T09:30:00+08:00",
  "usage_data": {
    "launch_count": 12,
    "active_minutes": 36,
    "module": "vision"
  }
}
```

### 成功响应：无配置更新

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "status": "active",
    "config_updated": false,
    "license_file": null,
    "heartbeat_interval": 300
  }
}
```

### 成功响应：有配置更新

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "status": "active",
    "config_updated": true,
    "license_file": "BASE64_NEW_LICENSE_FILE",
    "heartbeat_interval": 300
  }
}
```

客户端收到新的 `license_file` 后，应重新保存本地许可证，并继续使用当前许可证对应的公钥完成验签。

### 心跳异常

| 后端触发条件 | HTTP | `code` | `message` 示例 |
|--------------|------|--------|----------------|
| JSON 格式错误、缺少 `license_key` 或硬件指纹 | 400 | `900001` | 请求参数无效 |
| 许可证不存在 | 当前实现按错误码映射 | `300006` | 许可证不存在 |
| 许可证已被撤销 | 当前实现按错误码映射 | `300007` | 许可证已被撤销 |
| 租户不可用或权限不足 | 403 | `100005` | 权限不足 |
| 服务端异常 | 500 | `900004` | 服务器内部错误 |

错误响应示例：

```json
{
  "code": "300007",
  "message": "许可证已被撤销",
  "timestamp": "2026-07-10T10:00:00+08:00"
}
```

## 试用状态查询

客户端在展示“免费试用”入口前，可以先查询当前设备是否还能领取指定产品的试用授权。

```http
POST /api/v1/trial-license/status
Content-Type: application/json
```

### 请求字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `product_code` | 是 | 产品项编码，最大 50 字符 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹，最大 200 字符 |

### 请求示例

```json
{
  "product_code": "demo-app",
  "hardware_fingerprint": "demo-device-fingerprint"
}
```

### 可领取响应

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "product_code": "demo-app",
    "hardware_fingerprint": "demo-device-fingerprint",
    "trial_used": false,
    "can_issue_trial": true,
    "status": "available",
    "message": "可以领取体验"
  }
}
```

### 不可领取但请求成功

以下状态属于业务判断结果，HTTP 和 `code` 仍是成功：

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "product_code": "demo-app",
    "hardware_fingerprint": "demo-device-fingerprint",
    "trial_used": true,
    "can_issue_trial": false,
    "status": "used",
    "message": "该设备已领取过该产品体验"
  }
}
```

可能的 `data.status`：

| `status` | 说明 |
|----------|------|
| `available` | 可以领取试用 |
| `used` | 该设备已领取过该产品试用 |
| `formal_exists` | 该设备已有正式许可证，不能领取试用 |
| `product_unavailable` | 产品项未启用试用 |
| `tenant_inactive` | 租户不可用 |
| `unavailable` | 默认不可领取状态 |

### 查询异常

| 后端触发条件 | HTTP | `code` | `message` 示例 |
|--------------|------|--------|----------------|
| JSON 格式错误、缺少产品编码或硬件指纹、长度超限 | 400 | `900001` | 请求参数无效 |
| 产品项不存在或未启用体验 | 404 | `900002` | 产品项不存在或未启用体验 |
| 服务端异常 | 500 | `900004` | 服务器内部错误 |

## 领取试用许可证

客户端首次使用时，可以通过产品编码和硬件指纹领取试用许可证。后端会自动创建试用授权码、许可证和试用领取记录。

```http
POST /api/v1/trial-license
Content-Type: application/json
```

### 请求字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `product_code` | 是 | 产品项编码，最大 50 字符 |
| `hardware_fingerprint` | 是 | 当前设备硬件指纹，最大 200 字符 |
| `device_info` | 否 | 设备信息 |
| `software_version` | 否 | 客户端软件版本 |

### 请求示例

```json
{
  "product_code": "demo-app",
  "hardware_fingerprint": "demo-device-fingerprint",
  "software_version": "1.0.0",
  "device_info": {
    "os": "Windows",
    "hostname": "demo-pc"
  }
}
```

### 成功响应

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "license_key": "LIC-KEY-TRIAL-20260710-ABCDEFG",
    "license_file": "BASE64_LICENSE_FILE",
    "heartbeat_interval": 300,
    "public_key": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
    "trial": true,
    "trial_days": 14,
    "end_date": "2026-07-24T10:00:00+08:00"
  }
}
```

### 试用领取异常

| 后端触发条件 | HTTP | `code` | `message` 示例 |
|--------------|------|--------|----------------|
| JSON 格式错误、缺少产品编码或硬件指纹、长度超限 | 400 | `900001` | 请求参数无效 |
| 产品项不存在或未启用体验 | 404 | `900002` | 产品项不存在或未启用体验 |
| 产品项未启用体验 | 409 | `900003` | 产品项未启用体验 |
| 设备已有正式许可证 | 409 | `900003` | 该设备已有正式许可证，不能领取体验 |
| 设备已领取过该产品体验 | 409 | `900003` | 该设备已领取过该产品体验 |
| 租户不可用或权限不足 | 403 | `100005` | 权限不足 |
| 配额不足或资源冲突 | 409 | `900003` | 资源冲突 |
| 服务端异常 | 500 | `900004` | 服务器内部错误 |

错误响应示例：

```json
{
  "code": "900003",
  "message": "该设备已领取过该产品体验",
  "timestamp": "2026-07-10T10:00:00+08:00"
}
```

## 按设备指纹查询许可证

客户端可以根据设备指纹查询该设备最新的许可证信息，包含许可证文件和公钥，可用于恢复本地许可证或同步授权状态。

```http
POST /api/v1/license-by-fingerprint
Content-Type: application/json
```

### 请求字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `hardware_fingerprint` | 是 | 当前设备硬件指纹，最大 200 字符 |

### 请求示例

```json
{
  "hardware_fingerprint": "demo-device-fingerprint"
}
```

### 成功响应

```json
{
  "code": "000000",
  "message": "成功",
  "data": {
    "license_key": "LIC-KEY-20260710-ABCDEFG",
    "license_file": "BASE64_LICENSE_FILE",
    "heartbeat_interval": 300,
    "hardware_fingerprint": "demo-device-fingerprint",
    "status": "active",
    "source_type": "manual",
    "authorization_code": "LIC-DEMO-XXXX-XXXX",
    "end_date": "2027-07-10T10:00:00+08:00",
    "feature_config": {
      "modules": ["basic", "pro"]
    },
    "config_updated_at": "2026-07-10T10:00:00+08:00",
    "public_key": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
  }
}
```

### 查询异常

| 后端触发条件 | HTTP | `code` | `message` 示例 |
|--------------|------|--------|----------------|
| JSON 格式错误、缺少硬件指纹、长度超限 | 400 | `900001` | 请求参数无效 |
| 未找到该设备关联的许可证 | 当前实现返回 `640002`，HTTP 状态由错误码映射决定 | `640002` | 未知错误或平台配置的对应文案 |
| 服务端异常 | 500 | `900004` | 服务器内部错误 |

::: warning 注意
当前后端服务层在设备指纹未找到许可证时返回 `640002`。客户端应优先按响应体 `code` 做兼容处理，不要只依赖 HTTP 状态码。
:::

## 客户端处理建议

1. 所有接口都先判断 `code === "000000"`，再读取 `data`。
2. `license_file` 和 `public_key` 必须配对保存。
3. `heartbeat_interval` 使用服务端返回值，不要在客户端写死。
4. 心跳接口返回 `license_file` 时，说明授权配置可能更新，客户端应覆盖本地许可证。
5. 试用状态查询返回 `code=000000` 但 `can_issue_trial=false` 时，不应继续调用领取试用接口。
6. 对激活、心跳、试用领取、设备指纹查询都要记录 `code`、`message` 和请求时间，便于排查。

## 相关文档

- [激活接口](./activation.md)
- [错误码](./errors.md)
- [在线激活](../activation-online.md)
- [常见问题排查](../troubleshooting.md)
