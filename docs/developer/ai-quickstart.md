# AI 原生 API 快速接入 <Badge type="tip" text="推荐" />

AI 接入分为两段：

1. **协议提示词**：所有场景都需要，包含接口输入输出、许可证结构、验签算法、状态和错误码。
2. **业务提示词**：按项目场景选择一个模板，并根据实际业务修改其中的占位项。

::: warning 对接前必须准备产品公钥
1. 在雪松授权云中创建或选择一个产品。
2. 在产品列表点击“获取公钥”，复制完整的 PEM 公钥。
3. 将产品编码和产品公钥填入下面提示词的 `PRODUCT_CODE`、`PRODUCT_PUBLIC_KEY_PEM`。
4. AI 会把产品公钥写入客户端代码或随程序发布的只读资源，并使用它验证许可证。

公钥可以公开，也可以提供给 AI；不要提供产品私钥。接口响应中的 `public_key` 无需处理。
:::

::: tip 使用方法
“对接项目”是指您自己的、需要加入授权功能的软件项目，不是 License Manager 服务端或本文档仓库。

先用 AI 编程工具打开对接项目，并将对接项目根目录设为工作目录；然后依次粘贴“协议提示词”和一个“业务提示词”。AI 会自行读取和修改工作目录中的代码，不需要您手工复制项目代码。

不要只粘贴业务模板，也不要把真实授权码写进提示词。
:::

## 第一段：协议提示词

这段提示词提供接入所需的完整技术规则。复制时请保持内容完整，不要修改接口字段、状态定义或验签步骤。

```text
<license_manager_protocol>
<metadata>
name=雪松授权云客户端接入协议
api_version=v1
revision=2026-08-17
default_api_base=https://lic.cedar-v.com
transport=HTTPS + JSON
authentication=以下客户端公开接口不需要登录或 API Key
</metadata>

<product_trust>
PRODUCT_CODE=<必填：雪松授权云产品编码>
PRODUCT_PUBLIC_KEY_PEM=<必填：从产品列表“获取公钥”复制的完整PEM公钥>

- 在开发或构建阶段把 PRODUCT_PUBLIC_KEY_PEM 写入客户端代码，或打包为随程序发布的只读资源。
- 所有许可证都使用 PRODUCT_PUBLIC_KEY_PEM 验签。
- 忽略激活、试用和恢复接口响应中的 public_key，不比较、不保存，也不用它更新 PRODUCT_PUBLIC_KEY_PEM。
</product_trust>

<hardware_fingerprint_contract>
- 生成稳定、确定的 hardware_fingerprint；禁止使用 MAC、IP、网卡名称或网卡编号等网络接口信息。
- 优先使用操作系统或固件提供的稳定设备标识，如 Windows MachineGuid、Linux machine-id、macOS IOPlatformUUID 或固件 System UUID，规范化后生成哈希。
</hardware_fingerprint_contract>

<response_contract>
请求头：
Content-Type: application/json
Accept: application/json

成功：
{"code":"000000","message":"成功","data":{...}}

失败：
{"code":"非000000","message":"错误说明","timestamp":"RFC3339时间"}

客户端必须同时判断 HTTP 状态码和响应体 code。只有 code == "000000" 才能读取 data；HTTP 2xx 不代表业务成功。
</response_contract>

<endpoints>
1. 在线激活
POST /api/v1/activate
必填：authorization_code、hardware_fingerprint。
接口兼容可选：product_code、software_version、device_info；但正式产品接入必须传入固定 PRODUCT_CODE。device_info 为任意 JSON 对象。
请求：
{
  "authorization_code":"运行时输入的授权码",
  "hardware_fingerprint":"稳定设备指纹",
  "product_code":"固定PRODUCT_CODE，客户端必须传入",
  "software_version":"软件版本，可选",
  "device_info":{"os":"操作系统","hostname":"主机名"}
}
成功 data：
{
  "license_key":"后续心跳使用",
  "license_file":"Base64许可证",
  "heartbeat_interval":300,
  "public_key":"兼容字段；客户端无需处理"
}
authorization_code 兼容“授权码&附加串”，服务端只使用 & 前的授权码。

2. 心跳
POST /api/v1/heartbeat
必填：license_key、hardware_fingerprint。
可选：config_updated_at、usage_data、software_version。
请求：
{
  "license_key":"激活或试用返回值",
  "hardware_fingerprint":"与激活相同",
  "config_updated_at":"RFC3339，可选",
  "usage_data":{"产品自定义使用数据":"完整快照，不是增量补丁"},
  "software_version":"软件版本，可选"
}
成功 data：
{
  "status":"active",
  "config_updated":false,
  "license_file":null,
  "heartbeat_interval":300
}
config_updated=true 时可能返回新的 license_file；心跳不返回新 public_key，始终使用客户端内置的 PRODUCT_PUBLIC_KEY_PEM 验签。

3. 查询试用资格
POST /api/v1/trial-license/status
必填：product_code（最多 50 字符）、hardware_fingerprint（最多 200 字符）。
请求：
{"product_code":"产品编码","hardware_fingerprint":"稳定设备指纹"}
成功 data：
{
  "product_code":"产品编码",
  "hardware_fingerprint":"稳定设备指纹",
  "trial_used":false,
  "can_issue_trial":true,
  "status":"available",
  "message":"可以领取体验"
}
code 成功但 can_issue_trial=false 仍表示不可领取。
status 可能为 available、used、formal_exists、product_unavailable、tenant_inactive、unavailable。

4. 领取试用
POST /api/v1/trial-license
必填：product_code（最多 50 字符）、hardware_fingerprint（最多 200 字符）。
可选：software_version（最多 50 字符）、device_info。
请求：
{
  "product_code":"产品编码",
  "hardware_fingerprint":"稳定设备指纹",
  "software_version":"软件版本，可选",
  "device_info":{"os":"操作系统","hostname":"主机名"}
}
成功 data：
{
  "license_key":"许可证密钥",
  "license_file":"Base64许可证",
  "heartbeat_interval":300,
  "public_key":"兼容字段；客户端无需处理",
  "trial":true,
  "trial_days":14,
  "end_date":"RFC3339时间"
}

5. 按设备指纹恢复许可证
POST /api/v1/license-by-fingerprint
必填：hardware_fingerprint（最多 200 字符）。
请求：
{"hardware_fingerprint":"稳定设备指纹"}
成功 data 包含：
license_key、license_file、heartbeat_interval、hardware_fingerprint、status、
source_type、authorization_code、end_date、feature_config、config_updated_at、public_key。
</endpoints>

<license_file_contract>
license_file 是 Base64 编码的 JSON：
{
  "algorithm":"RSA-PSS-SHA256",
  "data":"未经改写的原始JSON字符串",
  "signature":"Base64签名"
}

验签顺序不可改变：
1. Base64 解码 license_file，解析顶层 algorithm、data、signature。
2. algorithm 必须等于 RSA-PSS-SHA256。
3. 从客户端内置的 PRODUCT_PUBLIC_KEY_PEM 解析 RSA 公钥。
4. Base64 解码 signature。
5. 对 data 原始 UTF-8 字节计算 SHA-256。禁止解析 data 后重新序列化再验签。
6. 使用 RSA-PSS + SHA-256 验签，PSS salt length 等于 SHA-256 哈希长度 32 字节。
7. 只有验签成功后才能解析 data 和读取授权内容。

data 当前可能包含：
license_key、authorization_code_id、authorization_code、product_code、hardware_fingerprint、
status、activated_at、config_updated_at、generated_at、start_date、end_date、
deployment_type、max_activations、feature_config、usage_limits、custom_parameters。

校验规则：
- 当前许可证有效状态是 active；revoked、空值及任何未知状态都必须阻断。
- normal、locked、expired 是授权码状态，不是当前许可证 data.status 枚举。
- start_date 或 end_date 存在时按 RFC3339 解析，要求 start_date <= 当前时间 <= end_date。
- hardware_fingerprint 必须与当前设备完全一致。
- deployment_type 可能为 standalone、cloud、hybrid。
- feature_config、usage_limits、custom_parameters 是产品自定义 JSON，不得臆造固定字段。
</license_file_contract>

<error_codes>
900001 请求参数无效
300001 授权码不存在、产品不匹配或授权码不在有效期
300003 授权码已锁定
300004 激活数量已达上限
300006 许可证不存在
300007 许可证已撤销
900002 产品不存在或未启用试用
900003 试用、配额或资源冲突
100005 权限不足
640002 按设备指纹未找到许可证
900004 服务端内部错误
</error_codes>

<protocol_invariants>
- 使用对接项目语言的 HTTP 能力和成熟密码学库，不使用 License Manager SDK。
- 客户端只持久化可变的 license_file；产品公钥随程序交付。
- 忽略接口响应中的 public_key，不比较、不保存、不更新内置产品公钥。
- 激活、试用、恢复或心跳返回许可证后，使用内置产品公钥完成验签，再检查状态、时间和指纹，然后保存或替换。
- 日志不得输出完整授权码、license_key、license_file、客户敏感信息或任何私钥。
- HTTP 客户端必须设置超时；生产环境使用 HTTPS。
- 网络错误、HTTP 错误、业务 code 错误和本地许可证错误必须能够区分。
</protocol_invariants>

<usage>
这是固定协议上下文，不代表具体业务需求。必须结合后续业务提示词，在对接项目中实施；如果没有业务提示词，先询问用户选择业务场景，不要自行添加试用、心跳或离线流程。
</usage>
</license_manager_protocol>
```

## 第二段：选择业务提示词

先从 A–D 选择一个主流程；如果许可证配置还要控制具体业务，再追加模板 E。

下面模板是起点，不是强制产品流程。复制前请修改 `PRODUCT_CODE`、`PRODUCT_PUBLIC_KEY_PEM`、授权保护范围、文件位置和断网策略；不需要的功能直接删除。

<span id="template-a"></span>

### 模板 A：最小在线激活

适合只需要首次联网激活，后续依靠本地许可证判断是否到期的软件。不实现试用和心跳。

```text
<business_requirement>
场景：最小在线激活
PRODUCT_CODE=<产品编码>
PRODUCT_PUBLIC_KEY_PEM=<从产品列表“获取公钥”复制的完整PEM公钥>
PROTECTED_BUSINESS=<需要授权保护的启动入口或业务功能；让 AI 从项目中识别>
LICENSE_DIR=<让 AI 选择当前操作系统规范的应用数据目录>

请先检查对接项目的启动、配置、持久化和日志方式，然后直接实现：
1. 首次启动没有本地许可证时，让用户输入授权码，调用在线激活接口。
2. 将 PRODUCT_PUBLIC_KEY_PEM 写入代码或只读资源；使用它验证响应中的 license_file，忽略响应中的 public_key，成功后只原子保存 license_file。
3. 后续每次启动都先做本地验签、active 状态、有效期和设备指纹检查，再放行 PROTECTED_BUSINESS。
4. 长时间运行的程序在关键业务执行前或固定本地周期重新检查 end_date；不重复调用激活接口。
5. 不实现试用、心跳和远程配置。
6. 授权失败时阻断受保护业务，但保留激活入口和可读错误提示。

完成实现后，说明修改文件和运行方式。
</business_requirement>
```

<span id="template-b"></span>

### 模板 B：在线激活 + 免费试用

适合正式授权和限时试用并存的软件。不默认启用心跳。

```text
<business_requirement>
场景：在线激活与免费试用
PRODUCT_CODE=<产品编码>
PRODUCT_PUBLIC_KEY_PEM=<从产品列表“获取公钥”复制的完整PEM公钥>
PROTECTED_BUSINESS=<需要授权保护的启动入口或业务功能；让 AI 从项目中识别>
LICENSE_DIR=<让 AI 选择当前操作系统规范的应用数据目录>

请先检查对接项目，然后直接实现：
1. 启动时优先验证本地正式或试用许可证；有效则直接进入业务。
2. 没有本地许可证时，同时提供“输入授权码”和“免费试用”两个明确入口。
3. 用户选择试用后，先调用试用资格接口；只有 code=000000 且 can_issue_trial=true 才能领取。
4. 激活或领取返回的许可证必须按固定协议验签后再保存。
5. 正式许可证与试用状态明确区分；试用不得静默覆盖仍有效的正式许可证。
6. 到期后阻断受保护业务，并引导用户输入正式授权码。
7. 不实现心跳；如果项目需要远程撤销或配置同步，应改用模板 C。

完成实现后，说明修改文件和运行方式。
</business_requirement>
```

<span id="template-c"></span>

### 模板 C：在线激活 + 心跳远程管控

适合需要远程撤销、续期、配置更新或用量上报的软件。

```text
<business_requirement>
场景：在线激活与远程授权管控
PRODUCT_CODE=<产品编码>
PRODUCT_PUBLIC_KEY_PEM=<从产品列表“获取公钥”复制的完整PEM公钥>
PROTECTED_BUSINESS=<需要授权保护的启动入口或业务功能；让 AI 从项目中识别>
LICENSE_DIR=<让 AI 选择当前操作系统规范的应用数据目录>
NETWORK_FAILURE_POLICY=<例如：本地许可证有效时继续运行并告警；请按业务修改>

请先检查对接项目，然后直接实现：
1. 启动时先校验本地许可证；没有本地文件时依次提供按指纹恢复和授权码激活入口。
2. 本地校验通过即可启动业务，不把每次启动强绑定到实时网络。
3. cloud 或 hybrid 模式按服务端 heartbeat_interval 在后台发送心跳，不能写死间隔。
4. usage_data 发送当前完整快照；并发更新必须安全。
5. config_updated_at 优先使用许可证字段；首次为空时保存激活成功时间作为本地同步时间。
6. 心跳返回新 license_file 时，先用内置 PRODUCT_PUBLIC_KEY_PEM 完成全部校验，再原子替换；失败时保留旧文件。
7. 收到 code=300007、status 非 active 或有效的撤销结果后，立即阻断后续受保护业务。
8. 临时网络失败按 NETWORK_FAILURE_POLICY 处理，不能误判为撤销，也不能卡死应用启动。
9. 根据对接项目业务映射 feature_config、usage_limits、custom_parameters；不确定字段含义时列出映射点让用户修改。

完成实现后，说明修改文件和运行方式。
</business_requirement>
```

<span id="template-d"></span>

### 模板 D：纯离线部署 + 手工导入

适合工厂内网、隔离网络或不允许客户端访问公网的交付场景。离线设备不调用任何在线接口。

```text
<business_requirement>
场景：纯离线部署与手工导入
PRODUCT_CODE=<产品编码>
PRODUCT_PUBLIC_KEY_PEM=<从产品列表“获取公钥”复制的完整PEM公钥>
PROTECTED_BUSINESS=<需要授权保护的启动入口或业务功能；让 AI 从项目中识别>
LICENSE_DIR=<让 AI 选择当前操作系统规范的应用数据目录>
IMPORT_FORMAT=<默认只导入 license_file 文本；可按项目修改>

请先检查对接项目，然后直接实现：
1. 按协议中的 hardware_fingerprint_contract 定义稳定硬件指纹算法，明确禁止采集或使用 MAC 及其他网络接口信息；固定字段来源、顺序、大小写和规范化规则，并提供“显示/复制/导出指纹”功能。
2. 将 PRODUCT_PUBLIC_KEY_PEM 写入代码或随程序发布的只读资源；手工导入入口只接收 license_file，不允许导入或替换验签公钥。
3. 离线客户端不调用 activate、heartbeat、trial-license 或 license-by-fingerprint。
4. 导入时先按固定协议完成 RSA-PSS 验签，再检查 active 状态、有效期和设备指纹；全部通过后才原子保存。
5. 每次启动和关键业务执行前进行本地校验，到期、篡改或设备变化时阻断受保护业务。
6. 提供安全的许可证替换流程；新文件验证失败时保留旧许可证。
7. 根据对接项目业务映射 feature_config、usage_limits、custom_parameters。
8. 明确提示：换机、续期、撤销和配置变更需要交付人员重新签发并导入，无法实时远程同步。

不要虚构离线签发 API 或离线请求文件协议。平台外部签发过程不属于客户端实现范围。

完成实现后，说明修改文件、指纹导出和许可证导入方式。
</business_requirement>
```

<span id="template-e"></span>

### 模板 E：许可证配置控制业务（可叠加）

这是附加模板，不能单独替代激活或离线导入流程。适合按许可证控制模块、设备数、并发数、额度、算法参数或客户定制参数的产品。

```text
<business_addon>
能力：使用许可证配置控制业务
BASE_TEMPLATE=<已选择的 A、B、C 或 D>
PROTECTED_FEATURES=<列出需要控制的模块或业务动作；让 AI 从项目中识别后供用户修改>
FEATURE_MAPPING=<feature_config 字段与业务功能的映射；不明确时让 AI 生成待填写清单>
LIMIT_MAPPING=<usage_limits 字段、计量单位、当前用量来源与业务限制的映射>
PARAMETER_MAPPING=<custom_parameters 字段与业务参数的映射>

在已选择的主流程上追加实现：
1. 只有许可证签名、状态、有效期和设备指纹全部通过后，才能读取配置。
2. 将动态 JSON 转换为项目内部明确的数据结构或授权快照，不允许业务代码到处直接读取原始 map/dictionary。
3. feature_config 控制模块、菜单、接口或业务动作是否允许；实际业务执行入口必须再次校验，不能只隐藏 UI。
4. usage_limits 控制数量、额度、频率或并发。明确每个字段的单位、当前用量来源、累计方式和到限行为；本地累计更新必须原子且并发安全。
5. custom_parameters 只作为经过类型和范围校验的业务参数使用，不得当成可执行代码、脚本、路径或未过滤命令。
6. 对缺失字段、错误类型、负数、超大值和未知字段定义明确策略。涉及付费能力时默认拒绝，不能静默开放。
7. 如果字段业务含义无法从对接项目和示例数据确认，生成一张“许可证字段 → 业务行为”映射表让用户填写，不要自行猜测。
8. 模板 C 的心跳收到新 license_file，或模板 D 手工导入新许可证后，先完整校验，再原子生成新授权快照并通知运行中的业务组件。
9. 配置降级或功能被关闭时，新请求立即按新配置处理；对正在执行的任务采用项目明确的安全停止或执行完毕策略。
10. 日志记录字段名、决策结果和脱敏后的用量，不记录完整许可证内容。

完成后输出一张最终的“许可证字段 → 代码位置 → 业务行为 → 失败策略”映射表，方便确认对接结果。
</business_addon>
```

## 如何选择

| 业务需求 | 选择 |
|---|---|
| 首次激活，之后只检查本地有效期 | 模板 A |
| 需要正式授权和免费试用 | 模板 B |
| 需要远程撤销、配置更新或用量上报 | 模板 C |
| 客户设备完全不能联网 | 模板 D |
| 许可证内的配置需要控制具体业务 | 在 A–D 之后追加模板 E |

如果需求跨场景，可以组合模板，但应删除重复流程，并明确以下边界：是否允许断网、是否支持试用、是否需要远程撤销、哪些业务受授权保护、功能和用量字段如何映射。

## 提交给 AI 前检查

- AI 编程工具当前打开的是需要加入授权功能的对接项目根目录。
- 已完整复制第一段协议提示词。
- 已在平台为授权码关联产品，并取得该产品的 PEM 公钥。
- 已把 `PRODUCT_CODE` 和 `PRODUCT_PUBLIC_KEY_PEM` 替换为真实产品信息；公钥完整保留 BEGIN/END 行和换行。
- 已从 A–D 中选择一个主流程，并修改其中的产品编码和业务占位项。
- 已确认指纹算法不读取、不使用 MAC 或其他网络接口信息，并测试切换网络、启停 VPN、增删虚拟网卡后指纹不变。
- 如需使用许可证配置控制业务，已在主流程后追加模板 E。
- 提示词中没有真实授权码、许可证、产品私钥或客户敏感信息；产品公钥可以提供给 AI。
