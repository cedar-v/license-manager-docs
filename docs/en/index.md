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
---

## Key Capabilities

<section class="lm-feature-grid" aria-label="Key Capabilities">
  <article class="lm-feature-card" style="--accent-from:#3b82f6; --accent-to:#22d3ee;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:user-id-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>Customer Management</h3>
      <p>Unified profiles, contacts, license relations, plus risk control policies.</p>
    </div>
  </article>
  
  <article class="lm-feature-card" style="--accent-from:#8b5cf6; --accent-to:#ec4899;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:slider-minimalistic-horizontal-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>License Generation</h3>
      <p>Online/offline modes, batch delivery, fingerprint binding, and key encryption.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#f97316; --accent-to:#facc15;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:chart-2-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>License Management</h3>
      <p>Lifecycle visibility, expiration alerts, lock/unlock, and full audit trails.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#0ea5e9; --accent-to:#14b8a6;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:suitcase-lines-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>Deployment Package</h3>
      <p>Generate configuration-ready bundles automatically for streamlined delivery.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#14b8a6; --accent-to:#22d3ee;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:link-minimalistic-2-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>API Services</h3>
      <p>RESTful APIs for validation, activation, heartbeat, and tenant isolation.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#f43f5e; --accent-to:#fb7185;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:rocket-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>High Performance</h3>
      <p>Go coroutines handle 10k+ concurrency with &lt;50 ms responses and &lt;100 MB memory.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#0f172a; --accent-to:#475569;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:shield-minimalistic-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>Security & Reliability</h3>
      <p>JWT auth, HMAC-SHA256 signatures, hardware binding, HTTPS encryption.</p>
    </div>
  </article>

  <article class="lm-feature-card" style="--accent-from:#16a34a; --accent-to:#4ade80;">
    <div class="lm-feature-icon">
      <iconify-icon icon="solar:earth-bold-duotone"></iconify-icon>
    </div>
    <div>
      <h3>Cross-Platform</h3>
      <p>Multi-platform fingerprinting, Docker deployment, and system service support.</p>
    </div>
  </article>
</section>

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