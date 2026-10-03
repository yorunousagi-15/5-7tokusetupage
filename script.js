(() => {
  const menu = document.getElementById('menu');
  const open = document.getElementById('menuButton');
  const close = document.getElementById('menuClose');

  if (menu && open && close) {
    function setMenu(state) {
      menu.classList.toggle('is-open', state);
      menu.setAttribute('aria-hidden', String(!state));
      open.setAttribute('aria-expanded', String(state));
      document.body.style.overflow = state ? 'hidden' : '';
    }

    open.addEventListener('click', () => setMenu(true));
    close.addEventListener('click', () => setMenu(false));
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') setMenu(false);
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const sparkles = document.getElementById('sparkles');
  if (sparkles && !reduceMotion) {
    const colors = ['#ff9cad', '#ffd96e', '#83cfff', '#b99aff', '#8ae0b4'];

    for (let i = 0; i < 22; i += 1) {
      const star = document.createElement('i');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.color = colors[i % colors.length];
      star.style.transform = `scale(${0.45 + Math.random() * 0.9})`;
      sparkles.appendChild(star);
    }
  }

  const blackHole = document.querySelector('.black-hole');
  if (blackHole && !reduceMotion) {
    window.addEventListener('pointermove', event => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      blackHole.style.transform = `translate(${x * 6}px, ${y * 5}px)`;
    });
  }
})();
