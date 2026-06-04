<script lang="ts">
  import { navLinks, siteConfig } from '$lib/data/site';
  import { Cloud } from '@lucide/svelte';

  let scrollY = $state(0);
  let mobileMenuOpen = $state(false);

  let scrolled = $derived(scrollY > 50);

  $effect(() => {
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function handleNavClick(e: MouseEvent, href: string) {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      mobileMenuOpen = false;
    }
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<nav class="navbar" class:scrolled>
  <div class="navbar-inner">
    <!-- Logo -->
    <a href="/" class="logo" aria-label="{siteConfig.brand} home">
      <span class="logo-icon">
        <Cloud size={24} color="#00D4AA" strokeWidth={2.5} />
      </span>
      <span class="logo-text">{siteConfig.brand}</span>
    </a>

    <!-- Desktop Navigation -->
    <ul class="nav-links">
      {#each navLinks as link}
        <li>
          <a
            href={link.href}
            class="nav-link"
            onclick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Desktop CTA -->
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="cta-btn"
    >
      Konsultasi via WhatsApp
    </a>

    <!-- Mobile Hamburger -->
    <button
      class="hamburger"
      onclick={toggleMobileMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileMenuOpen}
    >
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
      <span class="hamburger-line" class:open={mobileMenuOpen}></span>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      <ul class="mobile-nav-links">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              class="mobile-nav-link"
              onclick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-cta-btn"
      >
        Konsultasi via WhatsApp
      </a>
    </div>
  {/if}
</nav>

<style>
  /* ── Navbar Container ── */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: transparent;
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .navbar.scrolled {
    background: rgba(10, 14, 26, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  /* ── Inner Layout ── */
  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* ── Logo ── */
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    flex-shrink: 0;
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

  /* ── Desktop Nav Links ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    display: inline-block;
    padding: 8px 14px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .nav-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }

  /* ── Desktop CTA Button ── */
  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #0a0e1a;
    background: #00d4aa;
    border-radius: 8px;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background 0.2s ease, transform 0.15s ease;
  }

  .cta-btn:hover {
    background: #00e8bb;
    transform: translateY(-1px);
  }

  /* ── Hamburger ── */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    padding: 0;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s ease;
  }

  .hamburger:hover {
    border-color: rgba(255, 255, 255, 0.25);
  }

  .hamburger-line {
    display: block;
    width: 18px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .hamburger-line.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger-line.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger-line.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ── Mobile Menu ── */
  .mobile-menu {
    display: none;
    flex-direction: column;
    padding: 16px 24px 24px;
    background: rgba(10, 14, 26, 0.97);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-nav-link {
    display: block;
    padding: 12px 16px;
    font-size: 1rem;
    font-weight: 500;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 8px;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .mobile-nav-link:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }

  .mobile-cta-btn {
    display: block;
    margin-top: 16px;
    padding: 14px 20px;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #0a0e1a;
    background: #00d4aa;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    transition: background 0.2s ease;
  }

  .mobile-cta-btn:hover {
    background: #00e8bb;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .nav-links,
    .cta-btn {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .mobile-menu {
      display: flex;
    }
  }
</style>
