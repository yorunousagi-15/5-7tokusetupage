(() => {
  const menu = document.getElementById('menu');
  const open = document.getElementById('menuButton');
  const close = document.getElementById('menuClose');

  function setMenu(state) {
    menu.classList.toggle('is-open', state);
    menu.setAttribute('aria-hidden', String(!state));
    open.setAttribute('aria-expanded', String(state));
    document.body.style.overflow = state ? 'hidden' : '';
  }

  open.addEventListener('click', () => setMenu(true));
  close.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
