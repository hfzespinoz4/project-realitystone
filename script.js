const body = document.body;
const toggleTheme = document.getElementById('toggleTheme');
const scrollBar = document.getElementById('scrollBar');

if (toggleTheme) {
  toggleTheme.addEventListener('click', () => {
    body.classList.toggle('light');
    toggleTheme.textContent = body.classList.contains('light') ? 'Dark Mode' : 'Toggle Mode';
  });
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

revealElements.forEach(el => observer.observe(el));

function updateScrollBar() {
  if (!scrollBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  scrollBar.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateScrollBar, { passive: true });
updateScrollBar();