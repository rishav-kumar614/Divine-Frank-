/* Instagram Carousel Logic
   - Arrow buttons: prev / next
   - Dot indicators: click to jump
   - Touch swipe support
   - Smooth translateX transition (handled in CSS)
*/
(function () {
  const track   = document.getElementById('igTrack');
  const prevBtn = document.getElementById('igPrev');
  const nextBtn = document.getElementById('igNext');
  const dots    = document.querySelectorAll('#igDots .ig-dot');

  if (!track || !prevBtn || !nextBtn) return;

  const TOTAL_SLIDES = 3;
  let current = 0;

  function goTo(index) {
    // Clamp
    index = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    current = index;

    // Slide the track: each slide is 33.333333% of the track width = 100% of viewport
    track.style.transform = `translateX(-${current * 33.333333}%)`;

    // Update dots
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

    // Disable / enable arrows
    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === TOTAL_SLIDES - 1);

    // Accessibility
    prevBtn.setAttribute('aria-disabled', current === 0 ? 'true' : 'false');
    nextBtn.setAttribute('aria-disabled', current === TOTAL_SLIDES - 1 ? 'true' : 'false');
  }

  // Initialise
  goTo(0);

  // Arrow clicks
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Dot clicks
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // --- Touch / swipe support ---
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging  = false;

  const viewport = track.closest('.ig-carousel-viewport');

  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging  = false;
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    // If vertical scroll dominates, don't hijack
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (!isDragging && dy > dx) return;
    isDragging = true;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const THRESHOLD = 50; // px needed to trigger a slide
    if (deltaX < -THRESHOLD) goTo(current + 1);
    else if (deltaX > THRESHOLD) goTo(current - 1);
    isDragging = false;
  }, { passive: true });

  // --- Keyboard support (when focus is inside carousel) ---
  document.querySelector('.ig-carousel-wrapper').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
})();
