<script lang="ts">
  import { faqItems } from '$lib/data/site';
  import { intersect } from '$lib/actions/intersect';

  // State to track which FAQ is open (only one at a time)
  let openIndex: number | null = $state(null);

  function toggle(index: number) {
    if (openIndex === index) {
      openIndex = null; // close if clicking the same one
    } else {
      openIndex = index; // open new one
    }
  }
</script>

<section id="faq" class="section">
  <div class="container">
    <h2 class="section-title scroll-reveal" use:intersect>Pertanyaan yang Sering Diajukan</h2>

    <div class="faq-container card scroll-reveal" use:intersect style="--reveal-delay: 200ms">
      {#each faqItems as item, i}
        <div class="faq-item" class:is-open={openIndex === i}>
          <button 
            class="faq-question" 
            onclick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span class="faq-icon">{openIndex === i ? '−' : '+'}</span>
          </button>
          
          <div class="faq-answer-wrapper" style="max-height: {openIndex === i ? '500px' : '0'}">
            <div class="faq-answer">
              {item.answer}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .section {
    padding: 6rem 0;
  }

  .section-title {
    text-align: center;
    margin-bottom: 3rem;
  }

  .faq-container {
    max-width: 800px;
    margin: 0 auto;
    background: #141A2E;
    border: 1px solid var(--color-border-subtle);
    border-radius: 1rem;
    overflow: hidden;
  }

  .faq-item {
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .faq-item:last-child {
    border-bottom: none;
  }

  .faq-question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    font-size: 1.05rem;
    font-weight: 600;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .faq-question:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .faq-item.is-open .faq-question {
    color: var(--color-accent-primary);
  }

  .faq-icon {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1;
    color: var(--color-text-secondary);
    transition: transform 0.3s ease;
  }

  .faq-item.is-open .faq-icon {
    color: var(--color-accent-primary);
    transform: rotate(180deg);
  }

  .faq-answer-wrapper {
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .faq-answer {
    padding: 0 1.5rem 1.5rem;
    color: var(--color-text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  @media (max-width: 640px) {
    .faq-question {
      padding: 1.25rem;
      font-size: 1rem;
    }
    
    .faq-answer {
      padding: 0 1.25rem 1.25rem;
    }
  }
</style>
