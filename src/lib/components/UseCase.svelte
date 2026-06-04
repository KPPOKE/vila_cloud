<script lang="ts">
  import { useCases } from '$lib/data/site';
  import { intersect } from '$lib/actions/intersect';
</script>

<section id="use-cases" class="section">
  <div class="container">
    <div class="section-header scroll-reveal" use:intersect>
      <h2 class="section-title">Built for internal systems, not just websites.</h2>
      <p class="section-subtitle mx-auto">
        Aman, terisolasi, dan dioptimalkan untuk aplikasi yang hanya boleh diakses oleh tim Anda.
      </p>
    </div>

    <div class="bento-grid">
      {#each useCases as useCase, i}
        {@const Icon = useCase.icon}
        <div class="bento-card {useCase.span || 'col-span-1'} group scroll-reveal {i === 0 || i === 4 ? 'featured-card' : ''}" use:intersect style="transition-delay: {i * 100}ms">
          <div class="bento-icon">
            <Icon size={28} class="text-emerald-400 group-hover:text-emerald-300 transition-colors" strokeWidth={1.5} />
          </div>
          <div class="bento-content">
            <h3 class="bento-title">{useCase.title}</h3>
            <p class="bento-desc">{useCase.description}</p>
          </div>
          
          <!-- UI Variations -->
          {#if i === 0}
            <div class="mt-6 flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
               <div class="h-8 w-full bg-surface-elevated rounded-md flex items-center px-3 border border-border-subtle"><div class="w-1/3 h-2 bg-emerald-500/50 rounded-full"></div></div>
               <div class="h-8 w-full bg-surface-elevated rounded-md flex items-center px-3 border border-border-subtle"><div class="w-1/2 h-2 bg-slate-600 rounded-full"></div></div>
               <div class="h-8 w-full bg-surface-elevated rounded-md flex items-center px-3 border border-border-subtle"><div class="w-2/5 h-2 bg-slate-600 rounded-full"></div></div>
            </div>
          {:else if i === 1}
            <div class="mt-6 flex gap-2 flex-wrap">
              <span class="px-2 py-1 text-[10px] uppercase font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">PostgreSQL</span>
              <span class="px-2 py-1 text-[10px] uppercase font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">Docker</span>
              <span class="px-2 py-1 text-[10px] uppercase font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">Redis</span>
            </div>
          {:else if i === 2}
             <div class="mt-6 flex justify-between items-center px-2 opacity-60 group-hover:opacity-100 transition-opacity">
               <div class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
               <div class="flex-1 h-[1px] border-t border-dashed border-emerald-500/30 mx-2"></div>
               <div class="w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center"><div class="w-2 h-2 bg-emerald-400 rounded-full"></div></div>
               <div class="flex-1 h-[1px] border-t border-dashed border-emerald-500/30 mx-2"></div>
               <div class="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
             </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .bento-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .bento-card {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-light);
    border-radius: 1.5rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  /* Subtle gradient overlay on hover */
  .bento-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.05), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .featured-card {
    border-top: 1px solid rgba(16, 185, 129, 0.4);
    background: linear-gradient(180deg, rgba(16, 185, 129, 0.03) 0%, transparent 100%), var(--color-bg-card);
  }

  .bento-card:hover {
    border-color: rgba(16, 185, 129, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
  }

  .bento-card:hover::after {
    opacity: 1;
  }

  .bento-icon {
    margin-bottom: auto; /* Push icon to top if card is tall */
    padding-bottom: 2rem;
  }

  .bento-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text-primary);
  }

  .bento-desc {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  /* Responsive Grid mapping based on tailwind classes added in site.ts */
  @media (min-width: 768px) {
    .bento-grid {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: minmax(220px, auto);
    }
  }

</style>
