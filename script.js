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

  function renderGallery(items) {
    const target = document.getElementById('galleryList');
    if (!target) return;

    const list = Array.isArray(items) ? items : [];
    const existingImages = new Set(
      [...target.querySelectorAll('[data-static-photo="true"]')]
        .map(card => card.dataset.image)
        .filter(Boolean)
    );

    list.forEach((item, index) => {
      if (!item || !item.image || existingImages.has(item.image)) return;

      const article = document.createElement('article');
      article.className = 'photo-card reveal visible';
      article.dataset.galleryGenerated = 'true';
      article.dataset.image = item.image;

      const button = document.createElement('button');
      button.className = 'photo-button';
      button.type = 'button';
      button.setAttribute('aria-label', `${item.title || '写真'}を拡大表示`);

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.title || `クラス写真 ${index + 1}`;
      image.loading = 'lazy';
      button.appendChild(image);

      const body = document.createElement('div');
      body.className = 'photo-body';

      const meta = document.createElement('small');
      meta.textContent = `PHOTO / ${String(target.children.length + 1).padStart(2, '0')}`;

      const title = document.createElement('h2');
      title.textContent = item.title || 'クラスの写真';

      const description = document.createElement('p');
      description.textContent = item.description || '';

      body.append(meta, title, description);
      article.append(button, body);
      target.appendChild(article);
    });

    const allCards = [...target.querySelectorAll('.photo-card')];
    const empty = document.getElementById('galleryEmpty');
    if (empty) empty.hidden = allCards.length > 0;

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) return;

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    allCards.forEach(card => {
      const button = card.querySelector('.photo-button');
      const image = card.querySelector('img');
      const title = card.querySelector('h2');
      const description = card.querySelector('p');
      if (!button || !image) return;
      if (button.dataset.lightboxReady === 'true') return;

      button.dataset.lightboxReady = 'true';
      button.addEventListener('click', () => {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = title?.textContent || image.alt || 'クラス写真';
        const captionText = description?.textContent
          ? `${title?.textContent || 'クラスの写真'} — ${description.textContent}`
          : (title?.textContent || image.alt || 'クラスの写真');
        lightboxCaption.textContent = captionText;
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    if (lightboxClose.dataset.lightboxReady !== 'true') {
      lightboxClose.dataset.lightboxReady = 'true';
      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeLightbox();
      });
    }
  }

  if (typeof CLASS_GALLERY !== 'undefined') {
    renderGallery(CLASS_GALLERY);
  }
