<script lang="ts">
  import { securityFeatures, securityDisclaimer } from '$lib/data/site';
  import { ShieldCheck } from 'lucide-svelte';
  import { intersect } from '$lib/actions/intersect';
</script>

<section id="security" class="section">
  <div class="container">
    <div class="section-header scroll-reveal" use:intersect>
      <div class="inline-flex items-center gap-2 mb-4 text-emerald-400 font-mono text-sm tracking-widest uppercase">
        <ShieldCheck size={16} /> Security Architecture
      </div>
      <h2 class="section-title">Built for Enterprise-grade Privacy</h2>
      <p class="section-subtitle mx-auto">
        Setiap aplikasi internal yang kami hosting dilengkapi dengan lapisan proteksi bawaan.
      </p>
    </div>

    <div class="security-architecture">
      <div class="layers-container">
        {#each securityFeatures as feature, i}
          {@const Icon = feature.icon}
          <div class="layer-card scroll-reveal" use:intersect style="transition-delay: {i * 150}ms">
            <div class="layer-number font-mono">0{i + 1}</div>
            <div class="layer-icon">
              <Icon size={24} class="text-emerald-400" strokeWidth={1.5} />
            </div>
            <div class="layer-content">
              <h3 class="layer-title">{feature.title}</h3>
              <p class="layer-desc">{feature.description}</p>
            </div>
          </div>
          
          {#if i < securityFeatures.length - 1}
            <div class="layer-connector"></div>
          {/if}
        {/each}
      </div>
    </div>

    <div class="security-disclaimer">
      <p>{securityDisclaimer}</p>
    </div>
  </div>
</section>

<style>
  .security-architecture {
    max-width: 800px;
    margin: 0 auto 3rem;
    position: relative;
  }

  /* Create a vertical stacked effect */
  .layers-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .layer-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-light);
    border-radius: 12px;
    padding: 1.5rem 2rem;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .layer-card:hover {
    border-color: rgba(16, 185, 129, 0.4);
    background: var(--color-bg-card-hover);
    transform: translateX(4px);
    box-shadow: -4px 4px 20px rgba(0,0,0,0.4);
  }

  .layer-number {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    opacity: 0.5;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }

  .layer-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(16, 185, 129, 0.05);
    border-radius: 8px;
    border: 1px solid rgba(16, 185, 129, 0.1);
  }

  .layer-content {
    flex-grow: 1;
  }

  .layer-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.25rem;
  }

  .layer-desc {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .layer-connector {
    height: 24px;
    width: 2px;
    background: linear-gradient(to bottom, var(--color-border-light), transparent);
    margin: 0 auto;
    z-index: 1;
  }

  .security-disclaimer {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    font-style: italic;
  }

  @media (max-width: 640px) {
    .layer-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem;
    }
  }
</style>
