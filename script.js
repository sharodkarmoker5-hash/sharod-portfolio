/* =========================================================
   Sharod Karmoker – Portfolio (Vanilla JS)
   ========================================================= */
(function () {
  'use strict';

  var CONFIG = {
    email: 'sharodkarmoker5@gmail.com',
    whatsapp: '8801707737378',
    facebook: 'https://www.facebook.com/share/1Gn829jSPA/',
    instagram: 'https://www.instagram.com/sharod_karmoker/'
  };

  var header = document.getElementById('siteHeader');
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = links.map(function (l) { return document.getElementById(l.dataset.section); });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  navToggle.addEventListener('click', function () {
    setMenu(!navLinks.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Active link ---------- */
  function setActive(id) {
    links.forEach(function (l) {
      var on = l.dataset.section === id;
      l.classList.toggle('active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
  }

  /* ---------- Smooth scroll on click ---------- */
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var id = link.dataset.section;
      var target = document.getElementById(id);
      if (!target) return;
      setMenu(false);
      setActive(id);
      lockSpy = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      clearTimeout(lockTimer);
      lockTimer = setTimeout(function () { lockSpy = false; spy(); }, 900);
    });
  });

  /* ---------- Scroll spy ---------- */
  var lockSpy = false, lockTimer, ticking = false;
  function spy() {
    if (lockSpy) return;
    var probe = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0].id;
    sections.forEach(function (s) {
      if (s.offsetTop <= probe) current = s.id;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { spy(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', spy);
  window.addEventListener('load', function () {
    var hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      document.getElementById(hash).scrollIntoView();
    }
    spy();
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  /* ---------- Form ---------- */
  var form = document.getElementById('contactForm');
  var fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
  };
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var labels = { name: 'your name', email: 'your email', subject: 'a subject', message: 'your message' };

  function setError(key, msg) {
    var input = fields[key];
    var box = document.getElementById(key + 'Error');
    box.textContent = msg || '';
    input.closest('.field').classList.toggle('invalid', !!msg);
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  function validateField(key) {
    var v = fields[key].value.trim();
    if (!v) { setError(key, 'Please enter ' + labels[key] + '.'); return false; }
    if (key === 'email' && !emailRe.test(v)) { setError(key, 'Please enter a valid email address.'); return false; }
    setError(key, '');
    return true;
  }
  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      if (fields[key].closest('.field').classList.contains('invalid')) validateField(key);
    });
  });

  function getData() {
    return {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      subject: fields.subject.value.trim(),
      message: fields.message.value.trim()
    };
  }
  function buildText(d) {
    return 'Name: ' + d.name + '\n' +
           'Email: ' + d.email + '\n' +
           'Subject: ' + d.subject + '\n\n' +
           'Message:\n' + d.message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, firstBad = null;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) { ok = false; if (!firstBad) firstBad = fields[key]; }
    });
    if (!ok) { firstBad.focus(); return; }
    openModal();
  });

  /* ---------- Modal ---------- */
  var modal = document.getElementById('sendModal');
  var modalBox = modal.querySelector('.modal-box');
  var chooseView = document.getElementById('chooseView');
  var copyView = document.getElementById('copyView');
  var copyText = document.getElementById('copyText');
  var copyNote = document.getElementById('copyNote');
  var copyTitle = document.getElementById('copyTitle');
  var openProfile = document.getElementById('openProfile');
  var lastFocus = null;

  function showChoose() { chooseView.hidden = false; copyView.hidden = true; }
  function openModal() {
    lastFocus = document.activeElement;
    showChoose();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalBox.focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') { // simple focus trap
      var f = modal.querySelectorAll('button:not([hidden]), a[href], textarea');
      var vis = Array.prototype.filter.call(f, function (n) { return n.offsetParent !== null; });
      if (!vis.length) return;
      var first = vis[0], last = vis[vis.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  function showCopyView(channel) {
    var d = getData();
    var name = channel === 'facebook' ? 'Facebook' : 'Instagram';
    var url = channel === 'facebook' ? CONFIG.facebook : CONFIG.instagram;
    copyTitle.textContent = 'Send via ' + name;
    copyNote.textContent = 'Your message is ready. Copy it, then paste it into ' + name +
      (channel === 'facebook' ? ' Messenger' : ' Direct Messages') + '. It is not sent automatically.';
    copyText.value = buildText(d);
    openProfile.href = url;
    openProfile.textContent = 'Open ' + name;
    chooseView.hidden = true;
    copyView.hidden = false;
    copyText.focus();
  }

  modal.querySelectorAll('.option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var channel = btn.dataset.channel;
      var d = getData();

      if (channel === 'email') {
        var body = 'Name: ' + d.name + '\r\nEmail: ' + d.email + '\r\n\r\n' + d.message;
        window.location.href = 'mailto:' + CONFIG.email +
          '?subject=' + encodeURIComponent(d.subject) +
          '&body=' + encodeURIComponent(body);
        closeModal();
      } else if (channel === 'whatsapp') {
        var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(buildText(d));
        window.open(url, '_blank', 'noopener');
        closeModal();
      } else {
        var profile = channel === 'facebook' ? CONFIG.facebook : CONFIG.instagram;
        window.open(profile, '_blank', 'noopener');
        showCopyView(channel);
      }
    });
  });

  document.getElementById('backBtn').addEventListener('click', function () {
    showChoose();
  });

  /* ---------- Copy message ---------- */
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }
  document.getElementById('copyBtn').addEventListener('click', function () {
    copyToClipboard(copyText.value).then(function () {
      showToast('Message copied successfully!');
    }).catch(function () {
      copyText.focus();
      copyText.select();
      showToast('Press and hold the text to copy it manually.');
    });
  });
})();
