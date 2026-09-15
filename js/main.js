/* Let's Get It Cleaned — small progressive-enhancement helpers */
(function () {
  'use strict';

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- Current year in footer ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Reveal sections on scroll ---- */
  var targets = document.querySelectorAll('.card, .step, .review, .cl-col, .why-list li, .section-head');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---- Quote form: client-side validation + graceful fallback ---- */
  var form = document.getElementById('quote-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      var name = form.querySelector('#name');
      var phone = form.querySelector('#phone');
      var invalid = null;

      [name, phone].forEach(function (field) {
        var ok = field.value.trim().length > (field === phone ? 6 : 1);
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !invalid) invalid = field;
      });

      if (invalid) {
        e.preventDefault();
        status.textContent = 'Please add your name and a phone number so we can reach you.';
        invalid.focus();
        return;
      }

      /* No form backend wired up yet (see README): fall back to an email hand-off
         so a submission is never silently lost. Remove this block once the form
         is connected to Netlify Forms, Formspree or similar. */
      if (!form.dataset.backendReady) {
        e.preventDefault();
        var body = [
          'Name: ' + form.name.value,
          'Phone: ' + form.phone.value,
          'Email: ' + form.email.value,
          'Service: ' + form.service.value,
          'Home size: ' + form.size.value,
          '',
          form.details.value
        ].join('\n');

        status.textContent = 'Opening your email app so you can send this request…';
        window.location.href =
          'mailto:hello@letsgetitcleaned.com' +
          '?subject=' + encodeURIComponent('Quote request — ' + form.name.value) +
          '&body=' + encodeURIComponent(body);
      }
    });
  }
})();
