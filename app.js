(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) document.documentElement.classList.add('reduce-motion');

  function safeParse(value) {
    try { return JSON.parse(value); } catch (_) { return null; }
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => { node.textContent = value || ''; });
  }

  function setHref(selector, value) {
    document.querySelectorAll(selector).forEach((node) => { node.setAttribute('href', value || '/repository'); });
  }

  function activateButton(button, groupSelector) {
    document.querySelectorAll(groupSelector).forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
  }

  document.querySelectorAll('[data-module]').forEach((button) => {
    button.addEventListener('click', () => {
      const module = safeParse(button.getAttribute('data-module'));
      if (!module) return;
      activateButton(button, '[data-module]');
      setText('[data-inspector="name"]', module.name);
      setText('[data-inspector="purpose"]', module.purpose);
      setText('[data-inspector="layer"]', module.layer);
      setText('[data-inspector="problem"]', module.problem);
      setText('[data-inspector="evidence"]', module.evidence);
      setHref('[data-inspector="href"]', module.href);
    });
  });

  document.querySelectorAll('[data-journey]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = safeParse(button.getAttribute('data-journey'));
      if (!step) return;
      activateButton(button, '[data-journey]');
      setText('[data-journey-panel="event"]', step[0]);
      setText('[data-journey-panel="component"]', step[1]);
      setText('[data-journey-panel="control"]', step[2]);
      setText('[data-journey-panel="data"]', step[3]);
      setText('[data-journey-panel="result"]', step[4]);
    });
  });

  document.querySelectorAll('[data-layer-name]').forEach((button) => {
    button.addEventListener('click', () => {
      activateButton(button, '[data-layer-name]');
      setText('[data-layer-panel="name"]', button.getAttribute('data-layer-name'));
      setText('[data-layer-panel="desc"]', button.getAttribute('data-layer-desc'));
    });
  });

  document.querySelectorAll('.method-card').forEach((card) => {
    card.addEventListener('toggle', () => {
      if (!card.open) return;
      document.querySelectorAll('.method-card').forEach((other) => {
        if (other !== card) other.removeAttribute('open');
      });
    });
  });
})();
