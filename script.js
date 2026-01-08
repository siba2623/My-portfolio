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
            if (loadingScreen.parentNode) {
              loadingScreen.parentNode.removeChild(loadingScreen);
            }
          }, 500);
        }, 800); // Show loading for at least 0.8 seconds
      });

      // Fallback: hide loading screen after 2 seconds
      setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            if (loadingScreen.parentNode) {
              loadingScreen.parentNode.removeChild(loadingScreen);
            }
          }, 500);
        }
      }, 2000);
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
      const backdrop = document.getElementById('mobileMenuBackdrop');
      const body = document.body;
      
      if (!mobileToggle || !navLinks) return;

      // Toggle mobile menu
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('mobile-open');
        
        if (isOpen) {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        } else {
          this.openMobileMenu(navLinks, mobileToggle, backdrop, body);
        }
      });

      // Close mobile menu when clicking on backdrop
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        });
      }

      // Close mobile menu when clicking on a link
      const navLinksItems = navLinks.querySelectorAll('.nav-link');
      navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        const isClickInsideMenu = navLinks.contains(e.target);
        const isClickOnToggle = mobileToggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('mobile-open')) {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        }
      });

      // Close menu on window resize if open
      window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && navLinks.classList.contains('mobile-open')) {
          this.closeMobileMenu(navLinks, mobileToggle, backdrop, body);
        }
      }, 250));
    }

    openMobileMenu(navLinks, mobileToggle, backdrop, body) {
      navLinks.classList.add('mobile-open');
      mobileToggle.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      body.classList.add('menu-open');
      
      // Prevent background scrolling
      const scrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
    }

    closeMobileMenu(navLinks, mobileToggle, backdrop, body) {
      navLinks.classList.remove('mobile-open');
      mobileToggle.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      body.classList.remove('menu-open');
      
      // Restore scrolling
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
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

  // ===== AI CHATBOT FUNCTIONALITY =====
  class PortfolioChatbot {
    constructor() {
      this.chatbotToggle = document.getElementById('chatbot-toggle');
      this.chatbotWindow = document.getElementById('chatbot-window');
      this.chatbotClose = document.getElementById('chatbot-close');
      this.chatbotMessages = document.getElementById('chatbot-messages');
      this.chatbotInput = document.getElementById('chatbot-input');
      this.chatbotSend = document.getElementById('chatbot-send');
      this.chatbotBadge = document.querySelector('.chatbot-badge');
      
      this.isOpen = false;
      this.hasInteracted = false;
      
      this.knowledgeBase = {
        contact: {
          email: 'sibabalod@gmail.com',
          phone: '0799199415',
          location: 'Cape Town, South Africa',
          linkedin: 'https://www.linkedin.com/in/sibabalwe-dyantyi-258b41125',
          github: 'https://github.com/siba2623'
        },
        skills: [
          'Full-Stack Development',
          'AI & Machine Learning',
          'Prompt Engineering',
          'Data Analytics',
          'Frontend: HTML, CSS, JavaScript, React',
          'Backend: Node.js, Python',
          'Cybersecurity',
          'Data Visualization'
        ],
        projects: [
          {
            name: 'AI Chatbot Platform',
            description: 'Intelligent chatbot with NLP capabilities',
            link: 'https://app--synapse-ai-03ae5851.base44.app/Chat'
          },
          {
            name: 'GetItDone NGO Website',
            description: 'Community development and social impact website',
            link: 'https://a1getitdone.netlify.app'
          },
          {
            name: 'Data Visualization Dashboard',
            description: 'Interactive Tableau dashboard for business insights',
            link: 'https://public.tableau.com/app/profile/sibabalwe.dyantyi/viz/Groceriesdata/Dashboard13'
          },
          {
            name: 'Soil Analyzer Dashboard',
            description: 'Sustainable agriculture tool',
            link: 'https://www.figma.com/proto/HIhUfBOLKg3N81VxhaVmqC/Soil-Analyzer'
          }
        ],
        experience: '3+ years in full-stack development with focus on AI and data analytics',
        education: 'PPE at University of Cape Town, IT Support, Data Analytics, and Cybersecurity training',
        certifications: [
          'Google Cybersecurity Certificate',
          'IBM Data Analytics Certificate',
          'IBM Data Science Professional Certificate',
          'IT Specialist Certificate',
          'SANCS 2025 Participation Certificate'
        ]
      };
      
      this.init();
    }

    init() {
      if (!this.chatbotToggle) return;
      
      this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
      this.chatbotClose.addEventListener('click', () => this.closeChatbot());
      this.chatbotSend.addEventListener('click', () => this.sendMessage());
      this.chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
      
      // Quick reply buttons
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
          const action = e.target.dataset.action;
          this.handleQuickReply(action);
        }
      });
      
      // Show welcome message after 3 seconds
      setTimeout(() => {
        if (!this.hasInteracted) {
          this.showWelcomeNotification();
        }
      }, 3000);
    }

    toggleChatbot() {
      this.isOpen = !this.isOpen;
      this.chatbotWindow.classList.toggle('active');
      
      if (this.isOpen) {
        this.chatbotInput.focus();
        this.hasInteracted = true;
        this.hideBadge();
      }
    }

    closeChatbot() {
      this.isOpen = false;
      this.chatbotWindow.classList.remove('active');
    }

    showWelcomeNotification() {
      if (this.chatbotBadge) {
        this.chatbotBadge.style.display = 'flex';
      }
    }

    hideBadge() {
      if (this.chatbotBadge) {
        this.chatbotBadge.style.display = 'none';
      }
    }

    sendMessage() {
      const message = this.chatbotInput.value.trim();
      if (!message) return;
      
      this.addMessage(message, 'user');
      this.chatbotInput.value = '';
      
      // Show typing indicator
      this.showTypingIndicator();
      
      // Process message and respond
      setTimeout(() => {
        this.hideTypingIndicator();
        const response = this.processMessage(message);
        this.addMessage(response.text, 'bot', response.quickReplies);
      }, 1000);
    }

    addMessage(text, sender, quickReplies = null) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chatbot-message ${sender}-message`;
      
      const avatar = document.createElement('div');
      avatar.className = 'message-avatar';
      avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
      
      const content = document.createElement('div');
      content.className = 'message-content';
      content.innerHTML = `<p>${text}</p>`;
      
      if (quickReplies) {
        const repliesDiv = document.createElement('div');
        repliesDiv.className = 'quick-replies';
        quickReplies.forEach(reply => {
          const btn = document.createElement('button');
          btn.className = 'quick-reply';
          btn.dataset.action = reply.action;
          btn.textContent = reply.text;
          repliesDiv.appendChild(btn);
        });
        content.appendChild(repliesDiv);
      }
      
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(content);
      
      this.chatbotMessages.appendChild(messageDiv);
      this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chatbot-message bot-message typing-indicator-message';
      typingDiv.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      `;
      this.chatbotMessages.appendChild(typingDiv);
      this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    hideTypingIndicator() {
      const typingIndicator = this.chatbotMessages.querySelector('.typing-indicator-message');
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }

    processMessage(message) {
      const lowerMessage = message.toLowerCase();
      
      // Contact information
      if (lowerMessage.includes('email') || lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
        return {
          text: `You can reach Sibabalwe at:<br><br>
                 📧 Email: <strong>${this.knowledgeBase.contact.email}</strong><br>
                 📱 Phone: <strong>${this.knowledgeBase.contact.phone}</strong><br>
                 📍 Location: ${this.knowledgeBase.contact.location}<br><br>
                 Feel free to use the contact form on this page or reach out directly!`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'Skills', action: 'skills' }
          ]
        };
      }
      
      // Phone number
      if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
        return {
          text: `You can call Sibabalwe at: <strong>${this.knowledgeBase.contact.phone}</strong><br><br>
                 Or email at: ${this.knowledgeBase.contact.email}`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'More Info', action: 'about' }
          ]
        };
      }
      
      // Skills
      if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
        const skillsList = this.knowledgeBase.skills.map(skill => `• ${skill}`).join('<br>');
        return {
          text: `Sibabalwe's key skills include:<br><br>${skillsList}<br><br>
                 With ${this.knowledgeBase.experience}.`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'Contact Info', action: 'contact' }
          ]
        };
      }
      
      // Projects
      if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
        const projectsList = this.knowledgeBase.projects.map(project => 
          `<strong>${project.name}</strong>: ${project.description}`
        ).join('<br><br>');
        return {
          text: `Here are some featured projects:<br><br>${projectsList}<br><br>
                 Scroll down to the Projects section to see more details and live demos!`,
          quickReplies: [
            { text: 'Contact Info', action: 'contact' },
            { text: 'Skills', action: 'skills' }
          ]
        };
      }
      
      // Certifications
      if (lowerMessage.includes('certificate') || lowerMessage.includes('certification') || lowerMessage.includes('credential')) {
        const certsList = this.knowledgeBase.certifications.map(cert => `• ${cert}`).join('<br>');
        return {
          text: `Sibabalwe holds the following professional certifications:<br><br>${certsList}<br><br>
                 Scroll down to the Certifications section to view and download certificates!`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'Contact Info', action: 'contact' }
          ]
        };
      }

      // Experience
      if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about')) {
        return {
          text: `Sibabalwe is a passionate full-stack developer with ${this.knowledgeBase.experience}.<br><br>
                 <strong>Education:</strong> ${this.knowledgeBase.education}<br><br>
                 He specializes in creating innovative solutions that bridge complex technology with user needs.`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'Certifications', action: 'certifications' },
            { text: 'Contact Info', action: 'contact' }
          ]
        };
      }
      
      // Hire/availability
      if (lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('freelance')) {
        return {
          text: `Sibabalwe is open to new opportunities! 🎉<br><br>
                 For project inquiries or collaboration:<br>
                 📧 ${this.knowledgeBase.contact.email}<br>
                 📱 ${this.knowledgeBase.contact.phone}<br><br>
                 You can also fill out the contact form on this page.`,
          quickReplies: [
            { text: 'View Projects', action: 'projects' },
            { text: 'Skills', action: 'skills' }
          ]
        };
      }
      
      // Greetings
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return {
          text: `Hello! 👋 I'm here to help you learn more about Sibabalwe's work and experience. What would you like to know?`,
          quickReplies: [
            { text: 'Contact Info', action: 'contact' },
            { text: 'Skills', action: 'skills' },
            { text: 'Projects', action: 'projects' }
          ]
        };
      }
      
      // Default response
      return {
        text: `I can help you with information about:<br><br>
               • Contact details (email, phone)<br>
               • Skills and experience<br>
               • Professional certifications<br>
               • Projects and portfolio<br>
               • Availability for hire<br><br>
               What would you like to know?`,
        quickReplies: [
          { text: 'Contact Info', action: 'contact' },
          { text: 'Certifications', action: 'certifications' },
          { text: 'Projects', action: 'projects' }
        ]
      };
    }

    handleQuickReply(action) {
      let message = '';
      
      switch(action) {
        case 'contact':
          message = 'contact information';
          break;
        case 'skills':
          message = 'skills and experience';
          break;
        case 'projects':
          message = 'projects';
          break;
        case 'certifications':
          message = 'certifications';
          break;
        case 'about':
          message = 'about Sibabalwe';
          break;
        default:
          message = 'help';
      }
      
      this.addMessage(message, 'user');
      
      setTimeout(() => {
        this.showTypingIndicator();
        setTimeout(() => {
          this.hideTypingIndicator();
          const response = this.processMessage(message);
          this.addMessage(response.text, 'bot', response.quickReplies);
        }, 800);
      }, 300);
    }
  }

  // Initialize chatbot
  const chatbot = new PortfolioChatbot();

  // ===== ANIMATED STATISTICS COUNTERS =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/\D/g, ''));
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < numericValue) {
        element.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // ===== SCROLL INDICATOR =====
  function setupScrollIndicator() {
    // Create scroll indicator element
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <span class="scroll-indicator-text">Scroll</span>
      <div class="scroll-indicator-icon"></div>
    `;
    document.body.appendChild(indicator);

    // Show/hide based on scroll position
    const toggleIndicator = throttle(() => {
      const scrolled = window.scrollY;
      
      if (scrolled < 100) {
        indicator.classList.add('visible');
      } else {
        indicator.classList.remove('visible');
      }
    }, 100);

    window.addEventListener('scroll', toggleIndicator, { passive: true });
    toggleIndicator();
  }

  // ===== ENHANCED BACK TO TOP WITH PROGRESS =====
  function enhanceBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    const updateProgress = throttle(() => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / docHeight) * 100;
      
      // Update circular progress
      if (backToTopBtn.style) {
        backToTopBtn.style.setProperty('--scroll-progress', `${scrollPercent}%`);
      }
    }, 10);

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // ===== SMOOTH REVEAL ANIMATIONS =====
  function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.why-hire-card, .timeline-item, .tech-item');
    
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(el);
      });
    }
  }

  // ===== INITIALIZE ALL ENHANCEMENTS =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      animateCounters();
      setupScrollIndicator();
      enhanceBackToTop();
      setupRevealAnimations();
    });
  } else {
    animateCounters();
    setupScrollIndicator();
    enhanceBackToTop();
    setupRevealAnimations();
  }

})();