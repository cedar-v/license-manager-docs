---
layout: home

hero:
  name: License Manager
  text: 软件授权管理平台
  tagline: 为软件系统提供专业的授权码生成、分发、验证和管理服务
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
    details: 完整的客户信息管理和状态控制，支持客户信息的增删改查、状态管理、授权关联等核心功能
    
  - icon: 🔐
    title: 授权生成
    details: 支持在线/离线授权模式，基于硬件指纹绑定的授权机制确保安全性
    
  - icon: 📊
    title: 授权管理
    details: 实时状态监控和授权生命周期管理，全面掌控授权状态
    
  - icon: 📦
    title: 部署包生成
    details: 自动生成包含配置的部署包，简化部署流程
    
  - icon: 🌐
    title: API服务
    details: 提供验证、激活、心跳监控等完善的RESTful API接口
    
  - icon: ⚡
    title: 高性能
    details: Go原生协程支持10,000+并发，API响应时间<50ms，内存占用<100MB
    
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

<div class="tech-stack">

**前端**
- Vue.js 3+
- 现代化UI组件

**后端**
- Go 1.23+
- Gin框架
- GORM
- Viper配置
- Logrus日志

**数据库**
- MySQL 8+

**部署**
- Docker
- 系统服务

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
.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
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
