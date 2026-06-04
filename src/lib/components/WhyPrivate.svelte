<script>
  import { comparisonData, comparisonNote } from '$lib/data/site';
  import { Check, X, ShieldAlert, ShieldCheck } from 'lucide-svelte';
  import { intersect } from '$lib/actions/intersect';
</script>

<section id="why-private" class="section">
  <div class="container">
    <div class="section-header scroll-reveal" use:intersect>
      <h2 class="section-title">Kenapa Tidak Cukup Pakai Shared Hosting?</h2>
    </div>

    <div class="split-comparison scroll-reveal" use:intersect style="transition-delay: 200ms">
      <!-- Left Side: Shared Hosting -->
      <div class="split-side shared-side">
        <div class="side-header">
          <div class="icon-wrapper bg-red-900/20 text-red-400">
            <ShieldAlert size={24} />
          </div>
          <h3>Shared Hosting Biasa</h3>
        </div>
        <ul class="comparison-list">
          {#each comparisonData as item}
            <li>
              <X size={18} class="text-red-400 shrink-0 mt-0.5" />
              <div>
                <span class="feature-label">{item.feature}</span>
                <span class="feature-desc">{item.shared}</span>
              </div>
            </li>
          {/each}
        </ul>
      </div>

      <!-- VS Badge -->
      <div class="vs-badge">VS</div>

      <!-- Right Side: Private Ops Console -->
      <div class="split-side private-side">
        <div class="glow-bg"></div>
        <div class="side-header">
          <div class="icon-wrapper bg-emerald-900/30 text-emerald-400">
            <ShieldCheck size={24} />
          </div>
          <h3>Private Ops Console</h3>
        </div>
        <ul class="comparison-list">
          {#each comparisonData as item}
            <li>
              <Check size={18} class="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span class="feature-label text-emerald-50">{item.feature}</span>
                <span class="feature-desc text-white font-medium">{item.private}</span>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="comparison-note scroll-reveal" use:intersect style="transition-delay: 400ms">
      <p>{comparisonNote}</p>
    </div>
  </div>
</section>

<style>
  .split-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    max-width: 900px;
    margin: 0 auto 3rem;
    position: relative;
    border-radius: 24px;
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-subtle);
    overflow: hidden;
    box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
  }

  .vs-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .split-side {
    padding: 3rem 2.5rem;
    position: relative;
  }

  .shared-side {
    background: rgba(255, 255, 255, 0.02);
    border-right: 1px solid var(--color-border-subtle);
    opacity: 0.85; /* Dimmed */
  }

  .private-side {
    background: linear-gradient(to bottom, rgba(16, 185, 129, 0.05), transparent);
  }

  .glow-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 100px;
    background: radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15), transparent 70%);
    pointer-events: none;
  }

  .side-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .side-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .shared-side h3 {
    color: var(--color-text-secondary);
  }

  .private-side h3 {
    color: var(--color-text-primary);
  }

  .comparison-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .comparison-list li {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .feature-label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: 0.25rem;
  }

  .feature-desc {
    display: block;
    font-size: 0.9375rem;
    line-height: 1.4;
    color: var(--color-text-secondary);
  }

  .comparison-note {
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    max-width: 700px;
    margin: 0 auto;
    padding: 1.5rem;
    background: rgba(16, 185, 129, 0.05);
    border: 1px solid rgba(16, 185, 129, 0.1);
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    .split-comparison {
      grid-template-columns: 1fr;
    }
    
    .shared-side {
      border-right: none;
      border-bottom: 1px solid var(--color-border-subtle);
      padding: 2rem 1.5rem;
    }

    .private-side {
      padding: 2rem 1.5rem;
    }
  }
</style>
