/**
 * Main JavaScript Entry Point
 * プロフィールページのメインスクリプト
 */

// Development mode check
const isDev = import.meta.env.DEV;

// Application state
const App = {
  // Initialize application
  init() {
    console.log('Riku Miura Profile Site - Development Environment');
    console.log(`Build time: ${__BUILD_TIME__}`);
    console.log(`Development mode: ${isDev}`);

    this.setupFontLoading();
    this.setupEventListeners();
  },

  // Font loading optimization
  setupFontLoading() {
    if ('fonts' in document) {
      // Check if fonts are loaded
      const fontCheck = [
        new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2)'),
        new FontFace('Noto Sans JP', 'url(https://fonts.gstatic.com/s/notosansjp/v52/nwpBtKy2OAdRwma-g7jG6nFAFYnAhSs8kW7xAI8.woff2)')
      ];

      Promise.all(fontCheck.map(font => font.load())).then(fonts => {
        fonts.forEach(font => document.fonts.add(font));
        document.body.classList.remove('font-loading');
        document.body.classList.add('font-loaded');
        console.log('Fonts loaded successfully');
      }).catch(error => {
        console.warn('Font loading failed:', error);
        // Fallback to system fonts
        document.body.classList.remove('font-loading');
        document.body.classList.add('font-loaded');
      });
    }
  },

  // Setup basic event listeners
  setupEventListeners() {
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    // Remove keyboard navigation class on mouse click
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Initialize smooth scroll and navigation
    this.setupSmoothScroll();
    this.setupNavigationHighlight();
    this.setupExternalLinks();
    this.setupScrollRestoration();

    // Performance monitoring (development only)
    if (isDev) {
      this.setupPerformanceMonitoring();
    }
  },

  // Smooth scroll implementation
  setupSmoothScroll() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          e.preventDefault();

          // Check user's motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          if (prefersReducedMotion) {
            targetSection.scrollIntoView();
          } else {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }

          // Update focus for accessibility
          targetSection.setAttribute('tabindex', '-1');
          targetSection.focus();

          // Update URL without triggering scroll
          if (history.replaceState) {
            history.replaceState(null, null, href);
          }
        }
      });

      // Keyboard support for navigation links
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  },

  // Navigation highlight based on scroll position
  setupNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    // Use Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active class to corresponding nav link
            const correspondingLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (correspondingLink) {
              correspondingLink.classList.add('active');
              correspondingLink.setAttribute('aria-current', 'page');
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px' // Trigger when section is 20% from top
      }
    );

    sections.forEach(section => observer.observe(section));
  },

  // External links handling
  setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[rel*="external"]');

    externalLinks.forEach(link => {
      // Ensure proper attributes for security
      if (!link.getAttribute('rel').includes('noopener')) {
        link.setAttribute('rel', link.getAttribute('rel') + ' noopener');
      }
      if (!link.getAttribute('rel').includes('noreferrer')) {
        link.setAttribute('rel', link.getAttribute('rel') + ' noreferrer');
      }

      // Open in new tab
      link.setAttribute('target', '_blank');

      // Add accessibility attributes
      link.setAttribute('aria-describedby', 'external-link-desc');

      // Create description element if it doesn't exist
      if (!document.getElementById('external-link-desc')) {
        const desc = document.createElement('span');
        desc.id = 'external-link-desc';
        desc.className = 'sr-only';
        desc.textContent = '新しいタブで開きます';
        document.body.appendChild(desc);
      }
    });
  },

  // Scroll position restoration
  setupScrollRestoration() {
    // Restore scroll position on page load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Save scroll position before page unload
    let scrollTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        try {
          sessionStorage.setItem('scrollPosition', window.scrollY.toString());
        } catch (e) {
          // Handle quota exceeded errors
          console.warn('Cannot save scroll position:', e);
        }
      }, 100);
    });

    // Restore scroll position on load
    try {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }
    } catch (e) {
      console.warn('Cannot restore scroll position:', e);
    }
  },

  // Performance monitoring for development
  setupPerformanceMonitoring() {
    // Web Vitals monitoring
    if ('PerformanceObserver' in window) {
      // Core Web Vitals tracking
      const vitals = {
        FCP: null,
        LCP: null,
        CLS: null,
        FID: null
      };

      // First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
            console.log(`✅ First Contentful Paint: ${entry.startTime.toFixed(1)}ms`);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.LCP = lastEntry.startTime;
        console.log(`✅ Largest Contentful Paint: ${lastEntry.startTime.toFixed(1)}ms`);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        vitals.CLS = clsValue;
        console.log(`✅ Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          vitals.FID = entry.processingStart - entry.startTime;
          console.log(`✅ First Input Delay: ${vitals.FID.toFixed(1)}ms`);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Performance timing
      window.addEventListener('load', () => {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

        console.group('📊 Performance Metrics');
        console.log(`Page Load Time: ${loadTime}ms`);
        console.log(`DOM Ready: ${domReady}ms`);
        console.log(`DNS Lookup: ${timing.domainLookupEnd - timing.domainLookupStart}ms`);
        console.log(`Server Response: ${timing.responseEnd - timing.requestStart}ms`);
        console.groupEnd();

        // Report core web vitals summary
        setTimeout(() => {
          console.group('🎯 Core Web Vitals Summary');
          console.log(`FCP: ${vitals.FCP?.toFixed(1) || 'N/A'}ms (target: < 1800ms)`);
          console.log(`LCP: ${vitals.LCP?.toFixed(1) || 'N/A'}ms (target: < 2500ms)`);
          console.log(`CLS: ${vitals.CLS?.toFixed(4) || 'N/A'} (target: < 0.1)`);
          console.log(`FID: ${vitals.FID?.toFixed(1) || 'N/A'}ms (target: < 100ms)`);
          console.groupEnd();
        }, 3000);
      });
    }

    // Memory usage monitoring
    if ('memory' in performance) {
      const logMemory = () => {
        const memory = performance.memory;
        console.log(`💾 Memory Usage: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB / ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`);
      };

      // Log memory every 30 seconds
      setInterval(logMemory, 30000);
    }
  }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}

// Error handling
window.addEventListener('error', (error) => {
  console.error('JavaScript Error:', error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

export default App;
