export function intersect(node: HTMLElement) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add('in-view');
          observer.unobserve(node); // Only animate once
        }
      });
    },
    {
      rootMargin: '0px 0px -50px 0px', // Trigger when element is slightly above the bottom
      threshold: 0.1
    }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
