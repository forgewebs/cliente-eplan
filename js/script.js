(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  var links = menu.querySelectorAll('a');

  // 1. Abrir/fechar menu mobile
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // 2. Fechar menu ao clicar em um link
  links.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // 3. Marcar o link da seção visível como "active"
  var sections = document.querySelectorAll('main section[id]');
  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  // 4. Ano automático no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // 5. Formulário sem backend
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = 'Formulário em fase de configuração. Em breve ele será conectado ao sistema de envio de mensagens.';
  });
})();
