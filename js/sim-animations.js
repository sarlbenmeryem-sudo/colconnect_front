/* =========================
   sim-animations.js
   ColConnect — SIM Indicator Animations
   (non-module, attaché à window.SIM)
   ========================= */

(function () {
  function animateSimIndicator(element) {
    if (!element) return;
    element.classList.add('fade-in');
    setTimeout(() => element.classList.remove('fade-in'), 1000);
  }

  // Count-Up (smooth)
  function countUp(targetElement, start, end, durationMs) {
    if (!targetElement) return;
    start = Number(start) || 0;
    end = Number(end) || 0;
    durationMs = Number(durationMs) || 1200;

    const startTime = performance.now();
    const range = end - start;

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const value = Math.round(start + range * progress);
      targetElement.textContent = String(value);

      if (progress < 1) requestAnimationFrame(tick);
      else targetElement.textContent = String(end);
    }
    requestAnimationFrame(tick);
  }

  // Progress bar (expects element = .bar)
  function updateProgressBar(barElement, percentage) {
    if (!barElement) return;
    const pct = Math.max(0, Math.min(100, Number(percentage) || 0));
    barElement.style.width = pct + '%';
    barElement.textContent = pct + '%';
    if (pct >= 100) barElement.classList.add('complete');
    else barElement.classList.remove('complete');
  }

  function animateProgressBar(barElement, targetWidth, durationMs) {
    if (!barElement) return;
    targetWidth = Math.max(0, Math.min(100, Number(targetWidth) || 0));
    durationMs = Number(durationMs) || 1200;

    const startTime = performance.now();
    const startWidth = parseFloat(barElement.style.width) || 0;
    const range = targetWidth - startWidth;

    function tick(now) {
      const progress = Math.min(1, (now - startTime) / durationMs);
      const value = startWidth + range * progress;
      updateProgressBar(barElement, value);

      if (progress < 1) requestAnimationFrame(tick);
      else updateProgressBar(barElement, targetWidth);
    }
    requestAnimationFrame(tick);
  }

  function setStatusIndicator(element, status) {
    if (!element) return;
    element.textContent = status;
    element.classList.remove('status-success', 'status-failure');
    if (status === 'success') element.classList.add('status-success');
    if (status === 'failure') element.classList.add('status-failure');
  }

  function updateStatus(element, message) {
    if (!element) return;
    element.textContent = message;
  }

  // Demo simulation helper (optional)
  function runSimulation(opts) {
    opts = opts || {};
    const progressBar = document.getElementById(opts.progressBarId || 'progress-bar');
    const statusIndicator = document.getElementById(opts.statusId || 'status-indicator');

    let progress = 0;
    const step = Number(opts.step) || 10;
    const everyMs = Number(opts.everyMs) || 1000;

    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setStatusIndicator(statusIndicator, 'success');
        return;
      }
      progress += step;
      updateProgressBar(progressBar, progress);
    }, everyMs);
  }

  // Expose globally
  window.SIM = {
    animateSimIndicator,
    countUp,
    updateProgressBar,
    animateProgressBar,
    setStatusIndicator,
    updateStatus,
    runSimulation
  };
})();
