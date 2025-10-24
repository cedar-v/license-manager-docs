---
layout: home

hero:
  name: License Manager
  text: Software Licensing Platform
  tagline: Professional license code generation, distribution, validation, and management services for software systems
  image:
    src: /images/logo.png
    alt: License Manager
  actions:
    - theme: brand
      text: Getting Started
      link: /en/guide/getting-started
    - theme: alt
      text: Live Demo
      link: http://lm.cedar-v.com:18080
    - theme: alt
      text: GitHub
      link: https://github.com/cedar-v/license-manager

features:
  - icon: 🔧
    title: Customer Management
    details: Complete customer information management and status control, supporting CRUD operations, status management, and license association
    
  - icon: 🔐
    title: License Generation
    details: Supports online/offline licensing modes with hardware fingerprint binding for enhanced security
    
  - icon: 📊
    title: License Management
    details: Real-time status monitoring and license lifecycle management for complete control
    
  - icon: 📦
    title: Deployment Package
    details: Automatically generates deployment packages with configurations to simplify deployment
    
  - icon: 🌐
    title: API Services
    details: Provides comprehensive RESTful APIs for validation, activation, and heartbeat monitoring
    
  - icon: ⚡
    title: High Performance
    details: Native Go coroutines support 10,000+ concurrent connections, API response time <50ms, memory usage <100MB
    
  - icon: 🔒
    title: Security & Reliability
    details: JWT authentication, HMAC-SHA256 signature, hardware binding, HTTPS encryption for multi-layer security
    
  - icon: 🛠️
    title: Cross-Platform
    details: Supports multi-platform hardware information retrieval, Docker deployment, and system service operation
---

## Live Demo

Access: [lm.cedar-v.com:18080](http://lm.cedar-v.com:18080)

**Login Credentials:**
- Username: `admin`
- Password: `admin@123`

::: tip Note
This is a demonstration environment where you can experience the core features. We are continuously developing, and more features will be released soon.
:::

## Quick Installation

Check out the [Getting Started Guide](/en/guide/getting-started) for detailed deployment steps and configuration instructions.

## Tech Stack

<div class="tech-grid">
  <div class="tech-category">
    <h3>Frontend</h3>
    <ul>
      <li>Vue.js 3+</li>
      <li>Modern UI Components</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>Backend</h3>
    <ul>
      <li>Go 1.23+</li>
      <li>Gin Framework</li>
      <li>GORM</li>
      <li>Viper Config</li>
      <li>Logrus Logging</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>Database</h3>
    <ul>
      <li>MySQL 8+</li>
    </ul>
  </div>
  
  <div class="tech-category">
    <h3>Deployment</h3>
    <ul>
      <li>Docker</li>
      <li>System Service</li>
    </ul>
  </div>
</div>

## Open Source License

This project is licensed under the [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) license

- ✅ Free to use, study, modify, and distribute
- ✅ Commercial use allowed
- ⚠️ Derivative works must also be open source
- ℹ️ For proprietary licenses or commercial support, please contact the maintainers

## Join Community

<div class="community">
  <img src="/images/qrcode_1755081220153.jpg" alt="QQ Group QR Code" width="200" />
  
  <div>
    <h3>Scan to Join QQ Group</h3>
    <ul>
      <li>Share experiences and best practices</li>
      <li>Ask questions and get help</li>
      <li>Participate in feature discussions</li>
      <li>Provide feedback and suggestions</li>
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