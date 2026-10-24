const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// fade sections in as they scroll into view; count stats up once
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add('in');
    e.target.querySelectorAll('.count').forEach(countUp);
    io.unobserve(e.target);
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

function countUp(el) {
  const to = Number(el.dataset.to);
  if (reduced) { el.textContent = to; return; }
  const start = performance.now(), ms = 1200;
  const step = (t) => {
    const p = Math.min((t - start) / ms, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// rotating headline
const words = ['real-time data platforms', 'AI-driven delivery', 'cost-efficient cloud systems', 'high-scale streaming pipelines'];
const word = document.querySelector('.word');
let i = 0;
if (word && !reduced) {
  setInterval(() => {
    word.classList.add('out');
    setTimeout(() => { i = (i + 1) % words.length; word.textContent = words[i]; word.classList.remove('out'); }, 350);
  }, 2600);
}

// spotlight that follows the cursor on bento tiles
document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('pointermove', (e) => {
    const r = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
    tile.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
