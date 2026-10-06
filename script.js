(() => {
  const menu = document.getElementById('menuPanel');
  const menuButton = document.getElementById('menuButton');
  const menuClose = document.getElementById('menuClose');
  const lessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setMenu(open) {
    if (!menu || !menuButton) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }

  menuButton?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !lessMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const selector = link.getAttribute('href');
      const target = selector ? document.querySelector(selector) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: lessMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });

  const sparkleBox = document.getElementById('sparkles');
  if (sparkleBox && !lessMotion) {
    const colors = ['#ff91a5', '#ffe47d', '#76c9ff', '#b695ff', '#65d6a2'];
    for (let i = 0; i < 18; i += 1) {
      const star = document.createElement('i');
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.color = colors[i % colors.length];
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
      sparkleBox.appendChild(star);
    }
  }

  function makeNewsCard(item, index) {
    const article = document.createElement('article');
    article.className = 'news-card';
    const badge = document.createElement('span');
    badge.className = 'news-index';
    badge.textContent = String(index).padStart(2, '0');
    const date = document.createElement('time');
    date.className = 'news-date';
    date.dateTime = item.date || '';
    date.textContent = item.date || '---- -- --';
    const body = document.createElement('div');
    body.className = 'news-body';
    const cat = document.createElement('span');
    cat.className = 'news-category';
    cat.textContent = item.category || 'NEWS';
    const title = document.createElement('h2');
    title.textContent = item.title || 'お知らせ';
    const desc = document.createElement('p');
    desc.textContent = item.description || '';
    const links = document.createElement('div');
    links.className = 'news-links';

    if (item.pdf) {
      const open = document.createElement('a');
      open.className = 'pdf-button';
      open.href = item.pdf;
      open.target = '_blank';
      open.rel = 'noopener';
      open.textContent = 'PDFを開く ↗';
      links.appendChild(open);
    }

    if (item.image) {
      const photo = document.createElement('a');
      photo.className = 'photo-button-small';
      photo.href = item.image;
      photo.target = '_blank';
      photo.rel = 'noopener';
      photo.textContent = '写真を見る ↗';
      links.appendChild(photo);
    }

    if (!item.pdf && !item.image) {
      const note = document.createElement('span');
      note.className = 'news-note';
      note.textContent = 'CLASS NOTE';
      links.appendChild(note);
    }

    body.append(cat, title, desc, links);

    if (item.image) {
      const imageWrap = document.createElement('div');
      imageWrap.className = 'news-thumb';
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.title || 'ニュース画像';
      image.loading = 'lazy';
      imageWrap.appendChild(image);
      article.append(badge, date, body, imageWrap);
    } else {
      article.append(badge, date, body);
    }

    return article;
  }

  function renderNews(items, targetId, limit) {
    const box = document.getElementById(targetId);
    if (!box) return;
    const list = Array.isArray(items) ? items.slice() : [];
    list.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    const shown = typeof limit === 'number' ? list.slice(0, limit) : list;
    box.replaceChildren();
    shown.forEach((item, index) => box.appendChild(makeNewsCard(item, index + 1)));
    const empty = document.getElementById('newsEmpty');
    if (empty) empty.hidden = list.length > 0;
  }

  function renderGallery(items) {
    const box = document.getElementById('galleryList');
    if (!box) return;
    const list = Array.isArray(items) ? items : [];
    box.replaceChildren();
    list.forEach((item, index) => {
      if (!item?.image) return;
      const article = document.createElement('article');
      article.className = 'photo-card';
      const button = document.createElement('button');
      button.className = 'photo-open';
      button.type = 'button';
      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.title || `クラス写真 ${index + 1}`;
      image.loading = 'lazy';
      button.appendChild(image);
      const body = document.createElement('div');
      body.className = 'photo-card-body';
      const meta = document.createElement('small');
      meta.textContent = `PHOTO / ${String(index + 1).padStart(2, '0')}`;
      const title = document.createElement('h2');
      title.textContent = item.title || 'クラスの写真';
      const desc = document.createElement('p');
      desc.textContent = item.description || '';
      body.append(meta, title, desc);
      article.append(button, body);
      box.appendChild(article);

      button.addEventListener('click', () => openLightbox(image, title, desc));
    });
    const empty = document.getElementById('galleryEmpty');
    if (empty) empty.hidden = list.length > 0;
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(image, title, desc) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = title.textContent;
    lightboxCaption.textContent = desc.textContent ? `${title.textContent} — ${desc.textContent}` : title.textContent;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  const newsItems = typeof news !== 'undefined' ? news : [];
  const photoItems = typeof photos !== 'undefined' ? photos : [];
  renderNews(newsItems, 'homeNewsList', 2);
  renderNews(newsItems, 'newsList');
  renderGallery(photoItems);
})();
