---
layout: home
title: 雪松授权云｜软件授权管理与接入文档
titleTemplate: false
description: 为现有软件接入使用期限、硬件指纹绑定、功能配置与使用限制。雪松授权云免费版可长期用于正式业务，支持在线接入、离线授权与私有化部署。

hero:
  name: 雪松授权云
  text: 给你的软件加上授权控制
  tagline: 管理使用期限、绑定设备、按授权开放功能。已有软件产品，即可开始接入。
  image:
    src: /images/logo.png
    alt: 雪松授权云
  actions:
    - theme: brand
      text: 免费开始使用
      link: https://lic.cedar-v.com/
    - theme: alt
      text: 查看接入指南
      link: /guide/getting-started.html
---

<div class="cedar-home">

<div class="cedar-free">
  <strong>免费版可长期使用，也可正式商用</strong>
  <span>没有试用期限，额度够用即可持续使用，需要更多额度时再升级。</span>
</div>

<section>
  <h2>你决定软件怎么授权</h2>
  <div class="cedar-cards">
    <div class="cedar-card">
      <h3>控制使用期限</h3>
      <p>设置授权有效期，支持从首次激活开始计时，满足按月、按年交付。</p>
    </div>
    <div class="cedar-card">
      <h3>绑定使用设备</h3>
      <p>通过硬件指纹绑定设备，设置每个授权码允许激活的设备数量。</p>
    </div>
    <div class="cedar-card">
      <h3>区分功能与额度</h3>
      <p>配置功能、使用限制和自定义参数，由你的软件读取并执行授权规则。</p>
    </div>
  </div>
  <a class="cedar-more" href="/guide/features.html">查看完整功能 →</a>
</section>

<section>
  <h2>从已有软件，到授权交付</h2>
  <div class="cedar-cards cedar-steps">
    <a class="cedar-card" href="/guide/getting-started.html">
      <span class="cedar-step">01</span>
      <h3>创建产品和授权码</h3>
      <p>注册后添加软件产品，设置期限、设备数量及按需使用的高级规则。</p>
    </a>
    <a class="cedar-card" href="/developer/ai-quickstart.html">
      <span class="cedar-step">02</span>
      <h3>接入自己的软件</h3>
      <p>使用 AI 接入指南完成对接，也可通过开发者文档自行接入。</p>
    </a>
    <a class="cedar-card" href="/developer/production-checklist.html">
      <span class="cedar-step">03</span>
      <h3>验证后交付客户</h3>
      <p>确认激活、到期和受保护功能符合预期，再向客户发放授权。</p>
    </a>
  </div>
</section>

<section class="cedar-options">
  <div>
    <h2>有特殊的交付环境？</h2>
    <p>通常从云端接入开始，无需自行部署授权服务。客户环境有其他要求时，再选择对应方案。</p>
  </div>
  <div class="cedar-option-links">
    <a href="/developer/activation-offline.html">客户设备不能联网 <span>查看离线授权 →</span></a>
    <a href="/guide/self-hosting.html">需要自行部署服务 <span>查看部署说明 →</span></a>
  </div>
</section>

<section class="cedar-footer">
  <div>
    <h2>接入或部署有疑问？</h2>
    <p>扫码咨询接入支持、私有化部署与交付方案。</p>
    <p class="cedar-brand">雪松授权云（Cedar License Cloud）· 本文档中的 License Manager 为授权管理系统名称。</p>
    <a href="/developer/">开发者中心</a><span class="cedar-divider"> / </span><a href="https://cedar-v.com/">访问官网</a>
  </div>
  <img src="/images/qrcode_1755081220153.jpg" alt="雪松授权云咨询二维码" width="112" height="112" loading="lazy">
</section>

</div>

<style>
.cedar-home { max-width: 1152px; margin: 0 auto; padding: 0 24px 48px; }
.cedar-home section { margin-top: 48px; }
.cedar-home h2 { margin: 0 0 20px; padding: 0; border: 0; font-size: 24px; line-height: 1.4; background: none; color: var(--vp-c-text-1); -webkit-text-fill-color: currentColor; }
.cedar-home h3 { margin: 0 0 10px; font-size: 17px; color: var(--vp-c-text-1); }
.cedar-home p { margin: 0; line-height: 1.8; color: var(--vp-c-text-2); font-size: 14px; }
.cedar-free { display: flex; flex-wrap: wrap; gap: 6px 20px; padding: 18px 22px; border-radius: 12px; background: var(--vp-c-brand-soft); font-size: 14px; }
.cedar-free strong { color: var(--vp-c-text-1); }
.cedar-free span { color: var(--vp-c-text-2); }
.cedar-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.cedar-card { padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.cedar-home a { color: var(--vp-c-brand-1); text-decoration: none; }
.cedar-home a:hover { text-decoration: underline; }
.cedar-more { display: inline-block; margin-top: 16px; font-size: 14px; }
.cedar-steps a:hover { border-color: var(--vp-c-brand-1); text-decoration: none; }
.cedar-home a:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 4px; }
.cedar-step { display: block; margin-bottom: 12px; color: var(--vp-c-brand-1); font-size: 14px; font-weight: 700; }
.cedar-options { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding-top: 32px; border-top: 1px solid var(--vp-c-divider); }
.cedar-option-links { display: grid; gap: 12px; align-content: center; }
.cedar-option-links a { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; padding: 14px 18px; border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: 14px; }
.cedar-option-links span { color: var(--vp-c-brand-1); }
.cedar-footer { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding-top: 32px; border-top: 1px solid var(--vp-c-divider); font-size: 14px; }
.cedar-footer h2 { font-size: 20px; margin-bottom: 8px; }
.cedar-footer .cedar-brand { margin: 12px 0; font-size: 12px; }
.cedar-footer img { flex-shrink: 0; border-radius: 8px; }
.cedar-divider { color: var(--vp-c-text-3); padding: 0 8px; }
@media (max-width: 640px) {
  .cedar-cards, .cedar-options { grid-template-columns: 1fr; }
  .cedar-home section { margin-top: 32px; }
  .cedar-home h2 { font-size: 21px; }
  .cedar-card { padding: 20px; }
  .cedar-footer { align-items: flex-start; flex-direction: column; }
}
</style>
