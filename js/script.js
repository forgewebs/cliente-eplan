
(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  var links = menu.querySelectorAll('a');

  // 1. Abrir/fechar menu mobile
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Fechar menu' : 'Abrir menu'
    );
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // 2. Fechar menu ao clicar em um link
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  // 3. Marcar a seção visível no menu
  var sections = document.querySelectorAll('main section[id]');

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + id
      );
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // 4. Ano automático no rodapé
  var year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 5. Envio do formulário pelo Web3Forms
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      var button = form.querySelector('button[type="submit"]');
      var originalText = button.textContent;

      status.textContent = 'Enviando mensagem...';
      button.disabled = true;
      button.textContent = 'Enviando...';

      try {
        var response = await fetch(
          'https://api.web3forms.com/submit',
          {
            method: 'POST',
            body: new FormData(form)
          }
        );

        var result = await response.json();

        if (response.ok && result.success) {
          status.textContent =
            'Mensagem enviada com sucesso! Obrigado pelo contato.';
          form.reset();
        } else {
          status.textContent =
            'Não foi possível enviar a mensagem. Verifique os dados e tente novamente.';
        }
      } catch (error) {
        status.textContent =
          'Erro de conexão. Verifique sua internet e tente novamente.';
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }
})();
