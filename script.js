// Toggle de navegação para dispositivos móveis
const toggle = document.querySelector('.nav-toggle'); 
const menu = document.querySelector('.nav-menu'); 

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', String(!isOpen));
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#' || targetId.length === 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    // Permitir rolagem suave; em seguida, definir o foco
    setTimeout(() => {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }, 400);
  });
});

//Ano atual
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Link ativo com base na página atual
(function markActiveNav() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Ignorar ancora na página para marcação de página ativa
    if (href.startsWith('#')) return;
    const target = href.includes('#') ? href.split('#')[0] : href;
    const normalized = target === '' ? 'index.html' : target;
    if (normalized === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();