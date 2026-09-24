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

  const calculator = document.querySelector('[data-cost-calculator]');
  if (calculator) {
    const fields = {
      watts: calculator.querySelector('[data-watts]'),
      rate: calculator.querySelector('[data-rate]'),
      hours: calculator.querySelector('[data-hours]'),
      days: calculator.querySelector('[data-days]')
    };
    const outputs = {
      hour: calculator.querySelector('[data-hour-cost]'),
      day: calculator.querySelector('[data-day-cost]'),
      month: calculator.querySelector('[data-month-cost]'),
      energy: calculator.querySelector('[data-energy]')
    };
    const money = (pence) => pence < 100 ? `${pence.toFixed(1)}p` : `£${(pence / 100).toFixed(2)}`;
    const calculate = () => {
      const watts = Math.max(0, Number(fields.watts.value) || 0);
      const rate = Math.max(0, Number(fields.rate.value) || 0);
      const hours = Math.min(24, Math.max(0, Number(fields.hours.value) || 0));
      const days = Math.min(31, Math.max(0, Number(fields.days.value) || 0));
      const hourlyPence = (watts / 1000) * rate;
      const dailyPence = hourlyPence * hours;
      outputs.hour.textContent = money(hourlyPence);
      outputs.day.textContent = money(dailyPence);
      outputs.month.textContent = money(dailyPence * days);
      outputs.energy.textContent = `${((watts / 1000) * hours).toFixed(2)} kWh`;
    };
    Object.values(fields).forEach((field) => field.addEventListener('input', calculate));
    calculate();
  }
})();
