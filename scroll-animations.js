document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.getAttribute('data-delay');
      if (delay) {
        el.style.transitionDelay = `${delay}s`;
      }
      // Apply delay first, then add classes on next frame so browser registers the delay
      requestAnimationFrame(() => {
        el.classList.add('visible', 'active');
      });
      observer.unobserve(el);
    }
  }), { threshold: 0.15 });

  // Handle any elements that are added dynamically or present on load
  const observeElements = () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };
  
  observeElements();
  
  // Re-run for dynamically added content if needed in the future
  window.initScrollAnimations = observeElements;
});
