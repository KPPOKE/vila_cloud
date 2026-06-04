<script lang="ts">
  import { services } from '$lib/data/site';
  import { CheckCircle2 } from 'lucide-svelte';
  import { intersect } from '$lib/actions/intersect';
</script>

<section id="services" class="section">
  <div class="container">
    <div class="section-header scroll-reveal" use:intersect>
      <h2 class="section-title" style="margin-bottom: 0;">Layanan yang Disediakan</h2>
    </div>
    
    <div class="services-grid">
      {#each services as service, i}
        {@const Icon = service.icon}
        <div class="card service-card scroll-reveal" use:intersect style="--reveal-delay: {i * 100}ms">
          <div class="service-icon">
            <Icon size={40} color="#00D4AA" strokeWidth={1.5} />
          </div>
          <h3 class="service-title">{service.title}</h3>
          <p class="service-desc">{service.description}</p>
          
          <ul class="feature-list">
            {#each service.features as feature}
              <li class="feature-item">
                <div class="checkmark-icon">
                  <CheckCircle2 size={16} strokeWidth={2.5} color="#00D4AA" />
                </div>
                <span class="feature-text">{feature}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem; /* Reduced from 2rem */
  }

  .service-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(16,185,129,0.1), rgba(16,185,129,0.8), rgba(16,185,129,0.1));
    opacity: 0.3;
    transition: opacity 0.3s ease;
  }

  .service-card:hover::before {
    opacity: 1;
    height: 4px;
  }

  .service-icon {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px; /* Reduced from 64 */
    height: 48px;
    background: rgba(16, 185, 129, 0.05); /* Emerald tint */
    border-radius: 12px;
    border: 1px solid rgba(16, 185, 129, 0.1);
  }

  .service-title {
    font-size: 1.125rem; /* Reduced */
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.5rem;
  }

  .service-desc {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .feature-list {
    list-style: none;
    margin-top: auto; /* push list to bottom if card stretches */
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    border-top: 1px solid var(--color-border-subtle);
    padding-top: 1.25rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--color-text-primary);
  }

  .checkmark-icon {
    flex-shrink: 0;
    margin-top: 3px;
  }

  @media (max-width: 992px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .services-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
