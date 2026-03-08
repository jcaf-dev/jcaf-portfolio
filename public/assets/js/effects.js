export function setupBlastHover() {
  document.querySelectorAll('.blast').forEach(letter => {
    letter.addEventListener('mouseover', () => {
      letter.classList.add('exaggerated-stretch');
      setTimeout(() => letter.classList.remove('exaggerated-stretch'), 800);
    });
  });
}

export function setProgressBars() {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const targetWidth = bar.getAttribute("data-width");
    if (targetWidth) bar.style.width = `${targetWidth}%`;
  });
}

export function setupStars() {
  
  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

  console.log("reduce motion:", prefersReducedMotion);

  if (prefersReducedMotion) return;

  const hero = document.getElementById('hero');
  const starsContainer = document.getElementById('stars-container');


  if (!hero || !starsContainer) return;


  let rafPending = false;
  let lastX = 0, lastY = 0;

  function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${x - size / 2}px`;
    star.style.top = `${y - size / 2}px`;

    const moveX = (Math.random() - 0.5) * 300;
    const moveY = (Math.random() - 0.5) * 300;

    star.style.setProperty('--move-x', `${moveX}px`);
    star.style.setProperty('--move-y', `${moveY}px`);

    starsContainer.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;

    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      createStar(lastX, lastY);
      rafPending = false;
    });
  }, { passive: true });
}