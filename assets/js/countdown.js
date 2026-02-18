/* =====================================================
   COUNTDOWN TIMER SYSTEM
   For match countdowns and tournament timers
   ===================================================== */

function initCountdowns() {
  const countdownElements = document.querySelectorAll('[data-countdown]');
  
  countdownElements.forEach(element => {
    const targetDate = new Date(element.getAttribute('data-countdown')).getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        element.innerHTML = '<span class="text-gradient">LIVE NOW!</span>';
        return;
      }
      
      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Format output
      element.innerHTML = `
        <div class="countdown-display" style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
          ${days > 0 ? `<div class="countdown-unit">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${days}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Days</div>
          </div>` : ''}
          <div class="countdown-unit">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">${String(hours).padStart(2, '0')}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Hours</div>
          </div>
          <div class="countdown-unit">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-secondary);">${String(minutes).padStart(2, '0')}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Mins</div>
          </div>
          <div class="countdown-unit">
            <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-accent);">${String(seconds).padStart(2, '0')}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); text-transform: uppercase;">Secs</div>
          </div>
        </div>
      `;
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCountdowns);
} else {
  initCountdowns();
}