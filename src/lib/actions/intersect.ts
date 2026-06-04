import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function intersect(node: HTMLElement) {
  if (typeof window === 'undefined') return;

  // Parse custom delay from inline style
  const delayStr = node.style.getPropertyValue('--reveal-delay');
  let delaySec = 0;
  if (delayStr) {
    const ms = parseInt(delayStr.replace('ms', '').trim(), 10);
    if (!isNaN(ms)) delaySec = ms / 1000;
  }

  // Set initial state
  gsap.set(node, { opacity: 0, y: 30 });
  
  // Disable CSS transitions during GSAP animation to prevent conflict
  node.style.transition = 'none';

  const anim = gsap.to(node, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: delaySec,
    ease: 'power3.out',
    onComplete: () => {
      // Restore CSS transitions for hover effects
      node.style.transition = '';
      // Clear GSAP's transform so CSS hover transforms work
      gsap.set(node, { clearProps: 'transform' });
    },
    scrollTrigger: {
      trigger: node,
      start: 'top 85%',
      toggleActions: 'play none none none',
    }
  });

  return {
    destroy() {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
    }
  };
}
