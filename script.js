(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 36);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const filters = document.querySelectorAll('[data-filter]');
  const products = document.querySelectorAll('[data-category]');
  filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    products.forEach((product) => {
      product.hidden = filter !== 'all' && product.dataset.category !== filter;
    });
  }));

  const tag = document.querySelector('meta[name="amazon-associate-tag"]')?.content.trim();
  if (tag) {
    document.querySelectorAll('.amazon-link').forEach((link) => {
      const url = new URL(link.href);
      url.searchParams.set('tag', tag);
      link.href = url.toString();
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
