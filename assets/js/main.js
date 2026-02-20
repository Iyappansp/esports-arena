/* =====================================================
   E-SPORTS ARENA - MAIN JAVASCRIPT
   Core functionality for all pages
   ===================================================== */

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
  const themeToggle = document.querySelector('[data-testid="theme-toggle"]');
  const savedTheme = localStorage.getItem('theme');
  
  // Load saved theme
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  
  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
    });
  }
}

// ==================== RTL TOGGLE ====================
function initRTLToggle() {
  const rtlToggle = document.querySelector('[data-testid="rtl-toggle"]');
  const html = document.documentElement;
  const savedDir = localStorage.getItem('direction');
  
  // Load saved direction
  if (savedDir === 'rtl') {
    html.setAttribute('dir', 'rtl');
  }
  
  // Toggle RTL
  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      html.setAttribute('dir', currentDir);
      localStorage.setItem('direction', currentDir);
      
      // Update button text
      rtlToggle.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
    });
  }
}

// ==================== NAVBAR ====================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggler = document.querySelector('[data-testid="navbar-toggle"]');
  const navbarMenu = document.querySelector('[data-testid="navbar-menu"]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navbarToggler && navbarMenu) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
    
    // Close menu button
    const closeBtn = navbarMenu.querySelector('.mobile-menu-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        navbarToggler.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    }
    
    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggler.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
  
  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ==================== SCROLL REVEAL ANIMATION ====================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ==================== ANIMATED COUNTERS ====================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.getAttribute('data-counter'));
        animateCounter(entry.target, target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// ==================== VIDEO PLAYER ====================
function playVideo() {
  const container = document.getElementById('video-placeholder');
  if (container) {
    container.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/erTa9fMj9m4?autoplay=1" title="Valorant Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0;"></iframe>';
  }
}

// ==================== FORM VALIDATION ====================
function initFormValidation() {
  const forms = document.querySelectorAll('[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      // Get all required fields
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        
        // Clear previous errors
        formGroup.classList.remove('error');
        
        // Validate empty fields
        if (!value) {
          formGroup.classList.add('error');
          isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = form.querySelector('[data-success-message]');
        if (successMessage) {
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 3000);
        }
        
        // Reset form
        form.reset();
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && !value) {
          formGroup.classList.add('error');
        } else {
          formGroup.classList.remove('error');
        }
      });
      
      input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        if (formGroup.classList.contains('error')) {
          formGroup.classList.remove('error');
        }
      });
    });
  });
}

// ==================== MODAL SYSTEM ====================
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  const modals = document.querySelectorAll('[data-modal]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-trigger');
      const modal = document.querySelector(`[data-modal="${modalId}"]`);
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modals.forEach(modal => {
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    
    // Close button
    const closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
  });
  
  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
  });
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRTLToggle();
  initNavbar();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initFormValidation();
  initModals();
});