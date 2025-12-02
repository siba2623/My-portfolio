// ===== PORTFOLIO ENHANCED JAVASCRIPT =====

(function() {
  'use strict';

  // ===== UTILITY FUNCTIONS =====
  
  // Debounce function for performance optimization
  function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Toast notification system
  function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `site-toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });
    
    // Remove toast
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // Smooth scroll with offset for fixed header
  function smoothScrollTo(target, offset = 80) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  // ===== MAIN APPLICATION =====
  
  class PortfolioApp {
    constructor() {
      this.init();
    }

    init() {
      this.setupEventListeners();
      this.initializeComponents();
      this.handleInitialLoad();
    }

    setupEventListeners() {
      // Wait for DOM to be fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.bindEvents();
        });
      } else {
        this.bindEvents();
      }
    }

    bindEvents() {
      // Navigation
      this.setupNavigation();
      
      // Header scroll effects
      this.setupHeaderEffects();
      
      // Scroll animations
      this.setupScrollAnimations();
      
      // Theme toggle
      this.setupThemeToggle();
      
      // Mobile menu
      this.setupMobileMenu();
      
      // Contact form
      this.setupContactForm();
      
      // Typed text effect
      this.setupTypedEffect();
      
      // Project interactions
      this.setupProjectInteractions();
      
      // Copy email functionality
      this.setupEmailCopy();
      
      // Floating elements animation
      this.setupFloatingElements();
    }

    initializeComponents() {
      // Initialize any components that need setup
      this.initializeTheme();
      this.initializeScrollSpy();
    }

    handleInitialLoad() {
      // Handle any initial load requirements
      this.handleHashNavigation();
      this.setupLoadingScreen();
      this.setupBackToTop();
      this.setupScrollProgress();
    }

    // ===== NAVIGATION =====
    setupNavigation() {
      // Smooth scroll for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#' || !href) return;
          
          e.preventDefault();
          smoothScrollTo(href);
          
          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        });
      });
    }

    // ===== HEADER EFFECTS =====
    setupHeaderEffects() {
      const header = document.querySelector('.header');
      if (!header) return;

      const handleScroll = throttle(() => {
        const scrolled = window.scrollY > 50;
        header.classList.toggle('scrolled', scrolled);
      }, 10);

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
    }

    // ===== SCROLL ANIMATIONS =====
    setupScrollAnimations() {
      // Intersection Observer for reveal animations
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.reveal-on-scroll, .project-card, .skill-category, .about-visual, .hero-visual').forEach(el => {
          observer.observe(el);
        });
      } else {
        // Fallback for browsers without Intersection Observer
        document.querySelectorAll('.reveal-on-scroll, .project-card, .skill-category').forEach(el => {
          el.classList.add('revealed');
        });
      }
    }

    // ===== SCROLL SPY =====
    initializeScrollSpy() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      
      if (!sections.length || !navLinks.length) return;

      const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.id;
          const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
          
          if (navLink) {
            navLink.classList.toggle('active', entry.isIntersecting);
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }

    // ===== THEME TOGGLE =====
    setupThemeToggle() {
      const themeToggle = document.getElementById('themeToggle');
      if (!themeToggle) return;

      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    initializeTheme() {
      const savedTheme = localStorage.getItem('portfolio-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark-theme');
      }
    }

    toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark-theme');
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      
      showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 1500);
    }

    // ===== MOBILE MENU =====
    setupMobileMenu() {
      const mobileToggle = document.getElementById('mobileMenuToggle');
      const navLinks = document.querySelector('.nav-links');
      
      if (!mobileToggle || !navLinks) return;

      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        mobileToggle.classList.toggle('active');
      });

      // Close mobile menu when clicking on a link
      navLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
          navLinks.classList.remove('mobile-open');
          mobileToggle.classList.remove('active');
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('mobile-open');
          mobileToggle.classList.remove('active');
        }
      });
    }

    // ===== TYPED EFFECT =====
    setupTypedEffect() {
      const typedElement = document.getElementById('typed');
      if (!typedElement) return;

      const phrases = [
        'Full-Stack Developer',
        'AI Engineer',
        'Prompt Engineer', 
        'Data Analyst',
        'Problem Solver',
        'Tech Enthusiast'
      ];

      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let isPaused = false;

      const typeSpeed = 100;
      const deleteSpeed = 50;
      const pauseTime = 2000;

      const type = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isPaused) {
          isPaused = false;
          setTimeout(type, pauseTime);
          return;
        }

        if (isDeleting) {
          typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          
          if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        } else {
          typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
          
          if (charIndex === currentPhrase.length) {
            isDeleting = true;
            isPaused = true;
          }
        }

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
      };

      // Start typing effect
      setTimeout(type, 1000);
    }

    // ===== CONTACT FORM =====
    setupContactForm() {
      const form = document.getElementById('contact-form');
      const status = document.getElementById('form-status');
      
      if (!form) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            if (status) {
              status.textContent = '✅ Thank you! Your message has been sent successfully.';
              status.className = 'form-status success';
            }
            showToast('Message sent successfully!', 'success');
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          if (status) {
            status.textContent = '❌ Oops! Something went wrong. Please try again.';
            status.className = 'form-status error';
          }
          showToast('Failed to send message. Please try again.', 'error');
        } finally {
          // Restore button state
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }
      });

      // Form validation
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    }

    validateField(field) {
      const value = field.value.trim();
      let isValid = true;
      let message = '';

      // Remove existing validation classes
      field.classList.remove('valid', 'invalid');

      if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
      } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        }
      }

      // Add validation class
      field.classList.add(isValid ? 'valid' : 'invalid');

      // Show/hide validation message
      let validationMsg = field.parentNode.querySelector('.validation-message');
      if (!isValid) {
        if (!validationMsg) {
          validationMsg = document.createElement('span');
          validationMsg.className = 'validation-message';
          field.parentNode.appendChild(validationMsg);
        }
        validationMsg.textContent = message;
      } else if (validationMsg) {
        validationMsg.remove();
      }

      return isValid;
    }

    // ===== PROJECT INTERACTIONS =====
    setupProjectInteractions() {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });

        // Add click handler for project details
        card.addEventListener('click', (e) => {
          // Don't trigger if clicking on a link
          if (e.target.closest('a')) return;
          
          this.showProjectModal(card);
        });
      });
    }

    showProjectModal(card) {
      const title = card.querySelector('h3')?.textContent || 'Project';
      const description = card.querySelector('p')?.textContent || 'No description available.';
      const features = Array.from(card.querySelectorAll('.project-features span')).map(span => span.textContent);
      const links = card.querySelector('.project-links')?.innerHTML || '';

      const modal = document.createElement('div');
      modal.className = 'project-modal';
      modal.innerHTML = `
        <div class="project-modal-inner">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <h3>${title}</h3>
          <div class="project-modal-body">
            <p>${description}</p>
            ${features.length ? `
              <h4>Key Features:</h4>
              <ul>
                ${features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
          <div class="modal-actions">
            ${links}
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';

      // Close modal handlers
      const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
      };

      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escapeHandler);
        }
      });
    }

    // ===== EMAIL COPY FUNCTIONALITY =====
    setupEmailCopy() {
      const emailElement = document.getElementById('contactEmail');
      if (!emailElement || !navigator.clipboard) return;

      emailElement.style.cursor = 'pointer';
      emailElement.title = 'Click to copy email address';

      emailElement.addEventListener('click', async () => {
        try {
          const email = emailElement.textContent.trim();
          await navigator.clipboard.writeText(email);
          showToast('Email address copied to clipboard!', 'success', 2000);
        } catch (error) {
          showToast('Failed to copy email address', 'error');
        }
      });
    }

    // ===== FLOATING ELEMENTS ANIMATION =====
    setupFloatingElements() {
      const floatingElements = document.querySelectorAll('.floating-element');
      
      floatingElements.forEach((element, index) => {
        const speed = element.dataset.speed || 1;
        const delay = index * 0.5;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${6 / speed}s`;
      });
    }

    // ===== HASH NAVIGATION =====
    handleHashNavigation() {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          smoothScrollTo(hash);
        }, 100);
      }
    }

    // ===== LOADING SCREEN =====
    setupLoadingScreen() {
      const loadingScreen = document.getElementById('loading-screen');
      if (!loadingScreen) return;

      // Hide loading screen after page load
      window.addEventListener('load', () => {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }, 1000); // Show loading for at least 1 second
      });

      // Fallback: hide loading screen after 3 seconds
      setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.remove();
          }, 500);
        }
      }, 3000);
    }

    // ===== BACK TO TOP BUTTON =====
    setupBackToTop() {
      const backToTopBtn = document.getElementById('backToTop');
      if (!backToTopBtn) return;

      const toggleVisibility = throttle(() => {
        const scrolled = window.scrollY > 300;
        backToTopBtn.classList.toggle('visible', scrolled);
      }, 100);

      window.addEventListener('scroll', toggleVisibility, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // ===== SCROLL PROGRESS INDICATOR =====
    setupScrollProgress() {
      const progressBar = document.querySelector('.scroll-progress-bar');
      if (!progressBar) return;

      const updateProgress = throttle(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
      }, 10);

      window.addEventListener('scroll', updateProgress, { passive: true });
      updateProgress(); // Initial call
    }

    // ===== PERFORMANCE MONITORING =====
    monitorPerformance() {
      // Monitor page load performance
      window.addEventListener('load', () => {
        if ('performance' in window) {
          const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
          console.log(`Page loaded in ${loadTime}ms`);
        }
      });
    }
  }

  // ===== ADDITIONAL UTILITIES =====

  // Lazy loading for images
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Service Worker registration for PWA capabilities
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // ===== INITIALIZE APPLICATION =====
  
  // Create and initialize the portfolio app
  const portfolioApp = new PortfolioApp();
  
  // Setup additional features
  setupLazyLoading();
  
  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
  });

  // ===== LIGHTBOX MODAL FUNCTIONALITY =====
  function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (!modal || !lightboxImage) return;

    // Open modal on image click
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const imageSrc = this.src;
        const imageAlt = this.alt;
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Close modal on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Initialize lightbox when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }

  // Expose utilities globally for debugging
  window.portfolioUtils = {
    showToast,
    smoothScrollTo,
    debounce,
    throttle
  };

})();