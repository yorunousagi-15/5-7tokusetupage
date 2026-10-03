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
  function renderNews(items, targetId, limit) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const list = Array.isArray(items) ? items.slice() : [];
    list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const shown = typeof limit === 'number' ? list.slice(0, limit) : list;

    target.innerHTML = '';

    shown.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'news-card reveal visible';

      const date = document.createElement('time');
      date.className = 'news-date';
      date.dateTime = item.date || '';
      date.textContent = item.date || '---- -- --';

      const number = document.createElement('span');
      number.className = 'news-number';
      number.textContent = String(index + 1).padStart(2, '0');

      const body = document.createElement('div');
      body.className = 'news-card-body';

      const category = document.createElement('span');
      category.className = 'news-category';
      category.textContent = item.category || 'NEWS';

      const title = document.createElement('h2');
      title.textContent = item.title || '無題のお知らせ';

      const description = document.createElement('p');
      description.textContent = item.description || '';

      const actions = document.createElement('div');
      actions.className = 'news-actions-row';

      const openLink = document.createElement('a');
      openLink.className = 'news-pdf-link';
      openLink.href = item.pdf || '#';
      openLink.target = '_blank';
      openLink.rel = 'noopener';
      openLink.textContent = 'PDFを開く ↗';

      const downloadLink = document.createElement('a');
      downloadLink.className = 'news-download-link';
      downloadLink.href = item.pdf || '#';
      downloadLink.download = '';
      downloadLink.textContent = '保存 ↓';

      if (!item.pdf) {
        openLink.setAttribute('aria-disabled', 'true');
        downloadLink.setAttribute('aria-disabled', 'true');
      }

      actions.append(openLink, downloadLink);
      body.append(category, title, description, actions);
      article.append(number, date, body);
      target.appendChild(article);
    });

    const empty = document.getElementById('newsEmpty');
    if (empty) empty.hidden = shown.length > 0;
  }

  if (typeof CLASS_NEWS !== 'undefined') {
    renderNews(CLASS_NEWS, 'homeNewsList', 2);
    renderNews(CLASS_NEWS, 'newsList');
  }

})();
