<script>
  import { siteConfig } from '$lib/data/site';
  import { intersect } from '$lib/actions/intersect';
  import { Cloud } from 'lucide-svelte';
</script>

<section id="contact" class="final-cta">
  <div class="watermark-container">
    <Cloud size={800} strokeWidth={0.2} class="watermark-icon" />
  </div>
  
  <div class="container">
    <div class="cta-content scroll-reveal" use:intersect>
      <h2 class="cta-headline">Punya aplikasi internal yang perlu online secara privat?</h2>
      <p class="cta-desc">
        Jalankan portal internal, dashboard admin, database app, atau SOP portal dengan hosting privat yang ringan dan terkelola.
      </p>
      
      <a 
        href={siteConfig.whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn btn-primary btn-cta"
      >
        Konsultasi via WhatsApp
      </a>
    </div>
  </div>
</section>

<style>
  .final-cta {
    position: relative;
    padding: 6rem 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    border-top: 1px solid var(--color-border-subtle);
  }

  /* Subtle background glow effect */
  .final-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%);
    z-index: 0;
    pointer-events: none;
  }

  .watermark-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-accent-emerald);
    opacity: 0.02;
    z-index: 0;
    pointer-events: none;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cta-headline {
    font-size: 3.5rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
    background: linear-gradient(to bottom right, #fff, #a1a1aa);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cta-desc {
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    margin-bottom: 2.5rem;
    line-height: 1.6;
    max-width: 600px;
  }

  .btn-cta {
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    background: var(--color-accent-coral);
    color: #fff;
    box-shadow: 0 4px 20px rgba(255, 107, 74, 0.2);
  }

  .btn-cta:hover {
    background: var(--color-accent-coral-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 107, 74, 0.3);
  }

  @media (max-width: 768px) {
    .final-cta {
      padding: 5rem 0;
    }
    
    .cta-headline {
      font-size: 2rem;
    }
  }

  @media (max-width: 480px) {
    .cta-headline {
      font-size: 1.75rem;
    }
    
    .cta-desc {
      font-size: 1rem;
    }
  }
</style>
