<script lang="ts">
  import { siteConfig, targetAudience } from '$lib/data/site';
  import { Shield, CheckCircle2, Lock, Clock, Users, Database } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { TextPlugin } from 'gsap/dist/TextPlugin';

  let badgeRef: HTMLElement;
  let headlineContainerRef: HTMLElement;
  let headlineTextRef: HTMLElement;
  let cursorRef: HTMLElement;
  let descRef: HTMLElement;
  let actionsRef: HTMLElement;
  let visualRef: HTMLElement;
  let stripRef: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(TextPlugin);
    
    gsap.set([badgeRef, descRef, actionsRef, stripRef], { opacity: 0, y: 20 });
    gsap.set(visualRef, { opacity: 0, x: 30 }); // Visual slides from right
    gsap.set(headlineContainerRef, { opacity: 0 });
    
    // Blinking cursor (never stops)
    const cursorAnim = gsap.to(cursorRef, { opacity: 0, ease: "steps(1)", repeat: -1, duration: 0.8 });
    
    // Main reveal timeline (doesn't wait for typing)
    const tl = gsap.timeline();
    
    tl.to(badgeRef, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 });
    tl.to(headlineContainerRef, { opacity: 1, duration: 0.1 }); 

    tl.to([descRef, actionsRef], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    }, "+=0.2");
    
    tl.to(visualRef, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, "-=0.6");
    tl.to(stripRef, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4");
    
    // Infinite Typing Loop Timeline
    const phrases = [
      "Internal apps deserve <br/> private infrastructure.", // English
      "Aplikasi internal pantas <br/> mendapat infrastruktur privat.", // Indonesian
      "Aplicaciones internas merecen <br/> infraestructura privada.", // Spanish
      "Les applications internes méritent <br/> une infrastructure privée." // French
    ];

    const typeTl = gsap.timeline({ repeat: -1 });
    
    phrases.forEach((phrase) => {
      // Create a paused tween for this specific phrase
      const typeTween = gsap.to(headlineTextRef, {
        duration: 1.5,
        text: phrase,
        ease: "none",
        paused: true
      });

      // Proxy object to control the progress of the paused tween
      let proxy = { p: 0 };

      // Type out (forward)
      typeTl.to(proxy, {
        p: 1,
        duration: 1.5,
        ease: "none",
        onUpdate: () => typeTween.progress(proxy.p)
      });
      
      // Pause to read
      typeTl.to({}, { duration: 3.5 });
      
      // Delete (backspace effect - backward)
      typeTl.to(proxy, {
        p: 0,
        duration: 1,
        ease: "none",
        onUpdate: () => typeTween.progress(proxy.p)
      });
    });

    return () => {
      tl.kill();
      typeTl.kill();
      cursorAnim.kill();
    }
  });
</script>

<section class="hero relative overflow-hidden section">
  <div class="glow-blob glow-1"></div>
  <div class="glow-blob glow-2"></div>

  <div class="container relative z-10">
    <div class="hero-grid">
      <!-- Left Content -->
      <div class="hero-content">
        <div class="badge" bind:this={badgeRef} style="opacity: 0; transform: translateY(20px);">
          <Shield size={14} />
          PRIVATE • AMAN • TERKELOLA
        </div>

        <h1 class="hero-headline" bind:this={headlineContainerRef} style="opacity: 0;">
          <span bind:this={headlineTextRef}></span><span class="typing-cursor" bind:this={cursorRef}>|</span>
        </h1>

        <p class="hero-desc" bind:this={descRef} style="opacity: 0; transform: translateY(20px);">
          {siteConfig.description}
        </p>

        <div class="hero-actions" bind:this={actionsRef} style="opacity: 0; transform: translateY(20px);">
          <a href="#pricing" class="btn btn-primary cta-btn-glow">
            Mulai dari Rp249.000/bulan
          </a>
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
            Konsultasi WhatsApp
          </a>
        </div>
      </div>

      <!-- Right Content: Control Room Mockup -->
      <div class="hero-visual" bind:this={visualRef} style="opacity: 0; transform: translateX(30px);">
        <div class="mockup-window">
          <div class="mockup-header">
            <div class="mockup-dots">
              <span class="dot close"></span>
              <span class="dot min"></span>
              <span class="dot max"></span>
            </div>
            <div class="mockup-title">Vila Cloud Control Room</div>
          </div>
          
          <div class="mockup-body">
            <div class="dashboard-grid">
              
              <!-- App Status -->
              <div class="dash-card">
                <div class="dash-label">App Status</div>
                <div class="dash-value flex items-center gap-2 text-emerald-400 font-mono">
                  <CheckCircle2 size={16} /> Online
                </div>
              </div>

              <!-- App Name -->
              <div class="dash-card">
                <div class="dash-label">App</div>
                <div class="dash-value font-mono">Internal Portal</div>
              </div>

              <!-- Database -->
              <div class="dash-card">
                <div class="dash-label">Database</div>
                <div class="dash-value flex items-center gap-2 font-mono">
                  <Database size={16} class="text-emerald-500" /> Private
                </div>
              </div>

              <!-- Backup -->
              <div class="dash-card">
                <div class="dash-label">Backup</div>
                <div class="dash-value flex items-center gap-2 font-mono">
                  <Clock size={16} class="text-blue-400" /> Scheduled 02:00
                </div>
              </div>

              <!-- SSL -->
              <div class="dash-card">
                <div class="dash-label">SSL</div>
                <div class="dash-value flex items-center gap-2 font-mono">
                  <Lock size={16} class="text-emerald-500" /> Enabled
                </div>
              </div>

              <!-- Roles -->
              <div class="dash-card col-span-2">
                <div class="dash-label">Roles</div>
                <div class="dash-value flex items-center gap-2 font-mono text-sm">
                  <Users size={16} /> Superadmin, Manager, Staff etc
                </div>
              </div>

              <!-- Sensitive Data -->
              <div class="dash-card">
                <div class="dash-label">Sensitive Data</div>
                <div class="dash-value font-mono text-orange-400">Restricted</div>
              </div>

              <!-- Plan -->
              <div class="dash-card">
                <div class="dash-label">Monthly Plan</div>
                <div class="dash-value font-mono">Rp249.000</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Built For Strip -->
    <div class="built-for-strip" bind:this={stripRef} style="opacity: 0; transform: translateY(20px);">
      <span class="built-for-label">Built for:</span>
      <div class="built-for-items">
        {#each targetAudience as audience, i}
          <span class="built-for-item">{audience}</span>
          {#if i < targetAudience.length - 1}
            <span class="built-for-dot">•</span>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding-top: 8rem;
    padding-bottom: 6rem;
    min-height: 90vh;
    display: flex;
    align-items: center;
  }

  .glow-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
  }

  .glow-1 {
    top: -10%;
    right: -5%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--color-glow-primary) 0%, transparent 70%);
  }

  .glow-2 {
    bottom: 0;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin-bottom: 5rem;
  }

  .hero-content {
    max-width: 560px;
  }

  .hero-headline {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 1.5rem 0;
    letter-spacing: -0.04em;
    background: linear-gradient(to right, #fff, #94a3b8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    min-height: 2.2em; /* prevent layout shift during typing */
  }

  .typing-cursor {
    color: var(--color-accent-primary);
    -webkit-text-fill-color: var(--color-accent-primary); /* override gradient */
    font-weight: 300;
  }

  .hero-desc {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .cta-btn-glow {
    animation: pulse-glow 3s infinite;
  }

  /* Mockup Styling */
  .hero-visual {
    perspective: 1000px;
  }

  .mockup-window {
    background: var(--color-bg-card);
    border: 1px solid var(--color-border-light);
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transform: rotateY(-5deg) rotateX(2deg);
    transition: transform 0.5s ease;
  }

  .mockup-window:hover {
    transform: rotateY(0) rotateX(0);
  }

  .mockup-header {
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid var(--color-border-subtle);
    padding: 12px 16px;
    display: flex;
    align-items: center;
  }

  .mockup-dots {
    display: flex;
    gap: 6px;
    margin-right: 16px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .dot.close { background: #FF5F56; }
  .dot.min { background: #FFBD2E; }
  .dot.max { background: #27C93F; }

  .mockup-title {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    flex-grow: 1;
    text-align: center;
    margin-right: 44px; /* balance out the dots width */
  }

  .mockup-body {
    padding: 24px;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2));
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .col-span-2 {
    grid-column: span 2;
  }

  .dash-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 12px 16px;
  }

  .dash-label {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .dash-value {
    font-size: 0.875rem;
    color: var(--color-text-primary);
  }

  .font-mono {
    font-family: var(--font-mono);
  }

  /* Built For Strip */
  .built-for-strip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid var(--color-border-subtle);
    padding-top: 2rem;
  }

  .built-for-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .built-for-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .built-for-item {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  .built-for-dot {
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }

  @media (max-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    
    .hero-content {
      max-width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .hero-actions {
      justify-content: center;
    }

    .mockup-window {
      transform: none;
    }
  }

  @media (max-width: 768px) {
    .hero-headline {
      font-size: 2.5rem;
    }
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
    .col-span-2 {
      grid-column: span 1;
    }
  }
</style>
