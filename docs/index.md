---
layout: home

hero:
  name: License Manager
  text: 软件授权管理平台
  tagline: 一站式解决授权码生成、发放、验证与全生命周期管理
  image:
    src: /images/logo.png
    alt: License Manager
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 在线演示
      link: http://lm.cedar-v.com:18080
    - theme: alt
      text: GitHub
      link: https://github.com/cedar-v/license-manager

features:
  - icon: 🔧
    title: 客户管理
    details: 客户档案、联系人、授权关系统一维护，配合状态与风控策略
    
  - icon: 🔐
    title: 授权生成
    details: 支持在线/离线授权、批量发放、硬件指纹绑定与密钥加密
    
  - icon: 📊
    title: 授权管理
    details: 生命周期可视化、到期提醒、锁定/解锁、日志审计一应俱全
    
  - icon: 📦
    title: 部署包生成
    details: 自动生成包含配置的部署包，简化部署流程
    
  - icon: 🌐
    title: API服务
    details: 验证、激活、心跳、租户隔离等 RESTful API，易于系统集成
    
  - icon: ⚡
    title: 高性能
    details: Go 原生协程支撑 10,000+ 并发，API 响应 <50ms，内存 <100MB
    
  - icon: 🔒
    title: 安全可靠
    details: JWT认证、HMAC-SHA256签名、硬件绑定、HTTPS加密，多重安全保障
    
  - icon: 🛠️
    title: 跨平台
    details: 支持多平台硬件信息获取，Docker部署，系统服务运行
---

## 在线演示

访问地址：[lm.cedar-v.com:18080](http://lm.cedar-v.com:18080)

**登录凭证：**
- 用户名：`admin`
- 密码：`admin@123`

::: tip 提示
这是一个功能演示环境，您可以体验已开发的核心特性。我们正在持续开发中，更多功能将陆续上线。
:::

## 快速安装

查看 [快速开始文档](/guide/getting-started) 了解详细的部署步骤和配置说明。

## 技术栈

<div class="tech-grid">
  <div class="tech-category">
    <h3>前端</h3>
    <ul>
      <li>Vue.js 3+</li>
      <li>现代化UI组件</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>后端</h3>
    <ul>
      <li>Go 1.23+</li>
      <li>Gin框架</li>
      <li>GORM</li>
      <li>Viper配置</li>
      <li>Logrus日志</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>数据库</h3>
    <ul>
      <li>MySQL 8+</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>部署</h3>
    <ul>
      <li>Docker</li>
      <li>系统服务</li>
    </ul>
  </div>
</div>

## 开源许可

本项目采用 [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) 开源许可证

- ✅ 自由使用、学习、修改和分发
- ✅ 允许商业使用
- ⚠️ 衍生作品必须同样开源
- ℹ️ 如需专有许可证或商业支持，请联系项目维护者

## 加入社区

<div class="community">
  <img src="/images/qrcode_1755081220153.jpg" alt="QQ群二维码" width="200" />
  
  <div>
    <h3>扫码加入QQ群</h3>
    <ul>
      <li>分享使用经验和最佳实践</li>
      <li>提出问题和获得帮助</li>
      <li>参与新功能讨论</li>
      <li>反馈问题和改进建议</li>
    </ul>
  </div>
</div>

<style>
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.tech-category {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
}

.tech-category h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: var(--vp-c-brand);
  border-bottom: 2px solid var(--vp-c-brand);
  padding-bottom: 0.5rem;
}

.tech-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-category li {
  padding: 0.5rem 0;
  color: var(--vp-c-text-2);
}

.tech-category li:before {
  content: "▸ ";
  color: var(--vp-c-brand);
  font-weight: bold;
  margin-right: 0.5rem;
}

.community {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
}

.community img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.community ul {
  list-style: none;
  padding: 0;
}

.community li {
  padding: 0.25rem 0;
}

.community li:before {
  content: "✓ ";
  color: var(--vp-c-brand);
  font-weight: bold;
}
</style>
