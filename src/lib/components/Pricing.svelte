<script lang="ts">
  import { pricingPlans, pricingNote, siteConfig } from '$lib/data/site';
  import { Check, Star } from 'lucide-svelte';
  import { intersect } from '$lib/actions/intersect';
</script>

<section id="pricing" class="section">
  <div class="container">
    <div class="section-header-large scroll-reveal" use:intersect>
      <h2 class="section-title">Investasi Infra Tanpa Pusing</h2>
      <p class="section-subtitle mx-auto">
        Pilih paket yang sesuai dengan beban operasional tim Anda.
      </p>
    </div>

    <div class="pricing-grid">
      {#each pricingPlans as plan, i}
        <div class="card pricing-card {plan.recommended ? 'recommended' : ''} scroll-reveal" use:intersect style="transition-delay: {i * 150}ms">
          {#if plan.recommended}
            <div class="recommended-badge">
              <Star size={12} class="mr-1" /> RECOMMENDED
            </div>
          {/if}

          <h3 class="plan-name">{plan.name}</h3>
          
          <div class="plan-price-wrapper">
            <div class="plan-price">{plan.price}</div>
            <div class="plan-period">{plan.period}</div>
          </div>
          
          {#if plan.yearlyPrice}
            <div class="plan-yearly text-emerald-400 font-mono text-sm mt-1 mb-2">
              Billed at {plan.yearlyPrice}
            </div>
          {/if}
          
          <p class="plan-subtitle">{plan.subtitle}</p>

          <ul class="plan-features">
            {#each plan.features as feature}
              <li>
                <Check size={16} class="feature-icon" strokeWidth={3} />
                <span>{feature}</span>
              </li>
            {/each}
          </ul>

          <a
            href="https://wa.me/628159677746"
            target="_blank"
            rel="noopener noreferrer"
            class="btn {plan.recommended ? 'btn-primary' : 'btn-ghost'} w-full justify-center mt-auto"
          >
            {plan.cta}
          </a>
        </div>
      {/each}
    </div>

    <p class="pricing-note">
      {pricingNote}
    </p>
  </div>
</section>

<style>
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    align-items: stretch;
    max-width: 1000px;
    margin: 0 auto 3rem;
  }

  .pricing-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-light);
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s ease;
  }

  .pricing-card:not(.recommended):hover {
    border-color: rgba(255, 255, 255, 0.2);
    background: var(--color-bg-card-hover);
  }

  .pricing-card.recommended {
    background: linear-gradient(to bottom, var(--color-bg-card-hover), var(--color-bg-elevated));
    border: 1px solid rgba(16, 185, 129, 0.5);
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px var(--color-glow-primary);
    transform: scale(1.05); /* Visually dominant */
    z-index: 10;
  }

  .recommended-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-accent-primary);
    color: #060913;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
  }

  .plan-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1rem;
  }

  .plan-price-wrapper {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 0.5rem;
  }

  .plan-price {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
    letter-spacing: -0.03em;
  }

  .plan-period {
    color: var(--color-text-muted);
    font-size: 1rem;
  }

  .plan-subtitle {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .plan-features {
    list-style: none;
    margin: 0 0 2.5rem 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .plan-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.9375rem;
    color: var(--color-text-primary);
  }

  .w-full {
    width: 100%;
  }

  .justify-center {
    justify-content: center;
  }

  .mt-auto {
    margin-top: auto;
  }

  .pricing-note {
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
    font-family: var(--font-mono);
  }

  @media (max-width: 1024px) {
    .pricing-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .pricing-card.recommended {
      transform: none;
    }
  }
</style>
