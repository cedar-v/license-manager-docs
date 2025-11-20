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
---

## 核心能力

<section class="lm-feature-grid" aria-label="核心能力">
  <article class="lm-feature-card" style="--accent-from:#3b82f6; --accent-to:#22d3ee;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:user-id-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>客户管理</h3>
      <p>客户档案、联系人、授权关系统一维护，配合状态与风控策略。</p>
    </div>
  </article>
  
  <article class="lm-feature-card" style="--accent-from:#8b5cf6; --accent-to:#ec4899;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:slider-minimalistic-horizontal-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>授权生成</h3>
      <p>在线/离线授权、批量发放、硬件指纹绑定与密钥加密一站打包。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#f97316; --accent-to:#facc15;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:chart-2-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>授权管理</h3>
      <p>生命周期可视化、到期提醒、锁定/解锁、日志审计一应俱全。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#0ea5e9; --accent-to:#14b8a6;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:suitcase-lines-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>部署包生成</h3>
      <p>自动生成包含配置的部署包，交付标准化，部署更轻松。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#14b8a6; --accent-to:#22d3ee;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:link-minimalistic-2-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>API 服务</h3>
      <p>验证、激活、心跳、租户隔离等 RESTful API，易于系统集成。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#f43f5e; --accent-to:#fb7185;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:rocket-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>高性能</h3>
      <p>Go 原生协程支撑 10,000+ 并发，API 响应 <50ms，内存 <100MB。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#0f172a; --accent-to:#475569;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:shield-minimalistic-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>安全可靠</h3>
      <p>JWT 认证、HMAC-SHA256 签名、硬件绑定、HTTPS 多重防护。</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#16a34a; --accent-to:#4ade80;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:earth-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>跨平台</h3>
      <p>支持多平台硬件信息获取，Docker 部署，系统服务运行。</p>
    </div>
  </article>
</section>

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
.lm-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 2.5rem 0 3rem;
}

.lm-feature-card {
  display: flex;
  gap: 1rem;
  padding: 1.35rem;
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg), var(--vp-c-bg-soft) 55%);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.lm-feature-card:hover,
.lm-feature-card:focus-within {
  border-color: color-mix(in srgb, var(--vp-c-brand) 65%, transparent);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 85%, var(--vp-c-brand) 10%);
}

.lm-feature-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
  color: #fff;
  border: 1px solid color-mix(in srgb, #fff 25%, transparent);
  flex-shrink: 0;
}

.lm-feature-icon iconify-icon {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.8rem;
  line-height: 1;
}

.lm-feature-card h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--vp-c-text-1);
}

.lm-feature-card p {
  margin: 0.3rem 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.tech-category {
  background: color-mix(in srgb, var(--vp-c-bg), var(--vp-c-bg-soft) 65%);
  border-radius: 0.9rem;
  padding: 1.35rem;
  border: 1px solid var(--vp-c-divider);
}

.tech-category h3 {
  margin: 0 0 0.85rem 0;
  font-size: 1.05rem;
  color: var(--vp-c-brand);
}

.tech-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-category li {
  padding: 0.45rem 0;
  color: var(--vp-c-text-2);
}

.tech-category li:before {
  content: "·";
  display: inline-block;
  width: 1rem;
  color: var(--vp-c-brand);
}

.community {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg), var(--vp-c-bg-soft) 60%);
  flex-wrap: wrap;
}

.community img {
  border-radius: 0.75rem;
}

.community ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.community li {
  padding: 0.3rem 0;
  color: var(--vp-c-text-2);
}

.community li:before {
  content: "✓ ";
  color: var(--vp-c-brand);
  font-weight: 600;
}

@media (max-width: 720px) {
  .community {
    flex-direction: column;
    text-align: center;
  }

  .lm-feature-card {
    padding: 1.25rem;
  }
}
</style>
