(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) document.documentElement.classList.add('reduce-motion');

  function safeParse(value) {
    try { return JSON.parse(value); } catch (_) { return null; }
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => { node.textContent = value || ''; });
  }

  function setHtml(selector, values) {
    document.querySelectorAll(selector).forEach((node) => {
      node.innerHTML = (values || []).map((value) => `<span>${String(value)}</span>`).join('');
    });
  }

  function setHref(selector, value) {
    document.querySelectorAll(selector).forEach((node) => { node.setAttribute('href', value || '/repository'); });
  }

  function activateButton(button, groupSelector) {
    document.querySelectorAll(groupSelector).forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
  }

  document.querySelectorAll('[data-command]').forEach((button) => {
    button.addEventListener('click', () => {
      const stage = safeParse(button.getAttribute('data-command'));
      if (!stage) return;
      activateButton(button, '[data-command]');
      setText('[data-command-panel="stage"]', stage.stage);
      setText('[data-command-panel="summary"]', stage.summary);
      setHtml('[data-command-panel="items"]', stage.items);
      setText('[data-command-panel="outcome"]', stage.outcome);
    });
  });

  document.querySelectorAll('[data-module]').forEach((button) => {
    button.addEventListener('click', () => {
      const module = safeParse(button.getAttribute('data-module'));
      if (!module) return;
      activateButton(button, '[data-module]');
      setText('[data-inspector="name"]', module.name);
      setText('[data-inspector="purpose"]', module.purpose);
      setText('[data-inspector="problem"]', module.problem);
      setText('[data-inspector="layer"]', module.layer);
      setText('[data-inspector="responsibilities"]', (module.responsibilities || []).join(', '));
      setText('[data-inspector="integrations"]', (module.integrations || []).join(', '));
      setText('[data-inspector="evidence"]', module.evidence);
      setText('[data-inspector="related"]', module.relatedArea);
      setHref('[data-inspector="href"]', module.href);
    });
  });

  document.querySelectorAll('[data-journey]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = safeParse(button.getAttribute('data-journey'));
      if (!step) return;
      activateButton(button, '[data-journey]');
      setText('[data-journey-panel="event"]', step.stage);
      setText('[data-journey-panel="business"]', step.businessPurpose);
      setText('[data-journey-panel="system"]', step.systemResponsibility);
      setText('[data-journey-panel="financial"]', step.financialResponsibility);
      setText('[data-journey-panel="next"]', step.nextStage);
    });
  });

  document.querySelectorAll('[data-layer-name]').forEach((button) => {
    button.addEventListener('click', () => {
      activateButton(button, '[data-layer-name]');
      setText('[data-layer-panel="name"]', button.getAttribute('data-layer-name'));
      setText('[data-layer-panel="desc"]', button.getAttribute('data-layer-desc'));
      setHtml('[data-layer-panel="components"]', String(button.getAttribute('data-layer-components') || '').split(', ').filter(Boolean));
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
