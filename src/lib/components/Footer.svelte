<script lang="ts">
  import { siteConfig, navLinks } from '$lib/data/site';
  import { Cloud } from '@lucide/svelte';
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Left: Brand Info -->
      <div class="footer-brand">
        <a href="/" class="logo" aria-label="{siteConfig.brand} home">
          <span class="logo-icon">
            <Cloud size={24} color="#00D4AA" strokeWidth={2.5} />
          </span>
          <span class="logo-text">{siteConfig.brand}</span>
        </a>
        <p class="brand-desc">
          {siteConfig.description}
        </p>
      </div>

      <!-- Right: Navigation -->
      <div class="footer-nav">
        <ul class="nav-list">
          {#each navLinks as link}
            <li>
              <a href="{link.href}" class="nav-link">{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom: Copyright -->
    <div class="footer-bottom">
      <p class="copyright">{siteConfig.copyright}</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg-primary); /* Or slightly darker if you prefer */
    padding: 4rem 0 2rem;
    border-top: 1px solid var(--color-border-subtle);
  }

  .footer-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 3rem;
  }

  .footer-brand {
    max-width: 380px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    margin-bottom: 1.25rem;
  }

  .logo-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.02em;
  }

  .brand-desc {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .footer-nav {
    display: flex;
  }

  .nav-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem 3rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }

  .nav-link:hover {
    color: var(--color-accent-primary);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    padding-top: 1.5rem;
    display: flex;
    justify-content: flex-start;
  }

  .copyright {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .footer-grid {
      flex-direction: column;
      gap: 2.5rem;
    }

    .footer-nav {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .nav-list {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
