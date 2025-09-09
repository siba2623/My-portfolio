(function () {
  // Safe scroll lock helpers
  function disableScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  function enableScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Toast notifications
  function showToast(text, timeout = 3000) {
    const t = document.createElement('div');
    t.className = 'site-toast';
    t.textContent = text;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('visible'));
    setTimeout(() => t.classList.remove('visible'), timeout - 250);
    setTimeout(() => t.remove(), timeout);
  }

  // Small util: debounce
  function debounce(fn, wait = 100) {
    let id;
    return function (...args) {
      clearTimeout(id);
      id = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Smooth internal link scrolling (accounts for fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // Sticky header
    const header = document.querySelector('header');
    function onScrollHeader() {
      if (!header) return;
      header.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', debounce(onScrollHeader, 20), { passive: true });
    onScrollHeader();

    // Scrollspy
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if ('IntersectionObserver' in window && sections.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const link = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (link) link.classList.toggle('active', entry.isIntersecting);
        });
      }, { threshold: 0.5 });
      sections.forEach(s => obs.observe(s));
    }

    // Reveal on scroll
    const revealTargets = document.querySelectorAll('.reveal-on-scroll, .project-card, .about-image, .hero-image, .skills-container');
    if ('IntersectionObserver' in window && revealTargets.length) {
      const revObs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealTargets.forEach(t => revObs.observe(t));
    } else {
      revealTargets.forEach(t => t.classList.add('revealed'));
    }

    // Typed effect (element with id="typed")
    (function typedEffect() {
      const el = document.getElementById('typed');
      if (!el) return;
      const phrases = ['Fullstack Developer', 'AI & Prompt Engineer', 'Data Enthusiast', 'Problem Solver'];
      let pIndex = 0, charIndex = 0, deleting = false;
      const typeSpeed = 60, pause = 1400;
      function tick() {
        const current = phrases[pIndex];
        if (!deleting) {
          charIndex++;
          el.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, pause);
            return;
          }
        } else {
          charIndex--;
          el.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            pIndex = (pIndex + 1) % phrases.length;
          }
        }
        setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed);
      }
      tick();
    })();

    // Contact form: open user's email client prefilled to send to your address
    (function contactFormMailto() {
      const form = document.getElementById('contactForm');
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (form.name?.value || '').trim();
        const email = (form.email?.value || '').trim();
        const message = (form.message?.value || '').trim();
        if (!name || !email || !message) {
          showToast('Please fill in all fields.');
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          showToast('Please enter a valid email address.');
          form.email.focus();
          return;
        }

        const to = 'sibabalod@gmail.com';
        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const bodyLines = [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          'Message:',
          message
        ];
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

        // Attempt to open the default mail client
        try {
          window.location.href = mailto;
          showToast('Opening your email client to send the message.');
          form.reset();
        } catch {
          showToast('Unable to open email client. Please email sibabalod@gmail.com directly.');
        }
      });
    })();

    // Project modal with safe scroll lock
    (function projectModal() {
      const cards = document.querySelectorAll('.project-card');
      if (!cards.length) return;
      cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const title = card.querySelector('h3')?.textContent?.trim() || 'Project';
          const desc = card.querySelector('p')?.outerHTML || '<p>No description provided.</p>';
          const linksHTML = card.querySelector('.project-links') ? card.querySelector('.project-links').outerHTML : '';
          const modal = document.createElement('div');
          modal.className = 'project-modal';
          modal.innerHTML = `
            <div class="project-modal-inner" role="dialog" aria-modal="true" aria-label="${title}">
              <button class="modal-close" aria-label="Close">×</button>
              <h3>${title}</h3>
              <div class="project-modal-body">${desc}</div>
              <div class="modal-actions">${linksHTML}</div>
            </div>`;
          document.body.appendChild(modal);
          disableScroll();

          const closeModal = () => {
            if (!modal.parentElement) return;
            modal.remove();
            enableScroll();
            document.removeEventListener('keydown', onKey);
          };
          const onKey = (e) => { if (e.key === 'Escape') closeModal(); };

          modal.querySelector('.modal-close')?.addEventListener('click', closeModal);
          modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });
          document.addEventListener('keydown', onKey);
        });
      });
    })();

    // Copy email to clipboard (id="contactEmail") — also keeps mailto link accessible
    (function copyEmail() {
      const el = document.getElementById('contactEmail');
      if (!el || !navigator.clipboard) return;
      el.style.cursor = 'pointer';
      el.title = 'Click to copy email';
      el.addEventListener('click', async () => {
        try {
          // If the element contains a mailto link, copy the plain address
          const text = el.textContent.trim() || el.querySelector('a')?.getAttribute('href')?.replace(/^mailto:/, '') || '';
          await navigator.clipboard.writeText(text);
          showToast('Email copied to clipboard');
        } catch {
          showToast('Unable to copy email');
        }
      });
    })();

    // Theme toggle (id="themeToggle")
    (function themeToggle() {
      const toggle = document.getElementById('themeToggle');
      const html = document.documentElement;
      const saved = localStorage.getItem('site-theme');
      if (saved === 'dark') html.classList.add('dark-theme');
      if (!toggle) return;
      toggle.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark-theme');
        localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
        showToast(isDark ? 'Dark mode' : 'Light mode', 1200);
      });
    })();

    // Hire buttons -> scroll to contact
    document.querySelectorAll('.hire-me-btn, .btn-accent').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const target = document.getElementById('contact');
        if (!target) return;
        e.preventDefault();
        const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // Safety: restore scrolling if accidentally left disabled
    setTimeout(() => {
      if (!document.querySelector('.project-modal') && (document.body.style.overflow === 'hidden' || document.documentElement.style.overflow === 'hidden')) {
        enableScroll();
      }
    }, 400);

    window.addEventListener('beforeunload', enableScroll);
  });

  // Global safety: exposed helper to restore scroll from console if needed
  window.__restoreSiteScroll = enableScroll;
})();