/* ─────────────────────────────────────────────────────────
   F8 Bank — script.js
   ───────────────────────────────────────────────────────── */

const body        = document.body;
const toggleBtn   = document.getElementById('toggleTheme');
const scrollBar   = document.getElementById('scrollBar');

/* ══════════════════════════════════════════════════════════
   THEME TOGGLE
   ── default: dark mode (Forest Night)
   ── toggle:  light mode (Warm Canvas)
   ── labels:  show what clicking WILL DO, not current state
   ══════════════════════════════════════════════════════════ */

function applyTheme(toLightMode) {
  body.classList.toggle('light', toLightMode);
  updateToggleLabel();
  try { localStorage.setItem('f8-theme', toLightMode ? 'light' : 'dark'); } catch (e) {}
}

function updateToggleLabel() {
  if (!toggleBtn) return;
  const inLight = body.classList.contains('light');
  // Label = what will happen when clicked
  toggleBtn.innerHTML = inLight
    ? '<i class="ph ph-moon"></i> Dark mode'
    : '<i class="ph ph-sun"></i> Light mode';
}

// Restore saved preference; default to dark
(function initTheme() {
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem('f8-theme') || 'dark'; } catch (e) {}
  // Apply without transition on first load
  body.classList.toggle('light', savedTheme === 'light');
  updateToggleLabel();
  // Enable smooth transitions after first paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { body.classList.add('theme-ready'); });
  });
})();

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    applyTheme(!body.classList.contains('light'));
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target); // fire once only
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════ */
function updateScrollBar() {
  if (!scrollBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = maxScroll > 0 ? `${(scrollTop / maxScroll) * 100}%` : '0%';
}
window.addEventListener('scroll', updateScrollBar, { passive: true });
updateScrollBar();
