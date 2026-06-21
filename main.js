// One-time entrance: every [data-reveal] part slides up and un-blurs, staggered,
// only on first load. Markup is visible by default, so if this script never runs
// the content is still fully shown (no JS dependency for legibility).
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (!els.length || reduce) return;

  var ease = 'cubic-bezier(.16,1,.3,1)';
  var dur = 0.9;
  var step = 0.11;

  // Hidden start state — identical treatment for every part.
  els.forEach(function (el) { el.classList.add('reveal-init'); });

  // Flush initial state before transitioning.
  void document.body.offsetWidth;

  els.forEach(function (el, i) {
    var delay = (i * step).toFixed(2);
    el.style.transition =
      'opacity ' + dur + 's ' + ease + ' ' + delay + 's, ' +
      'transform ' + dur + 's ' + ease + ' ' + delay + 's, ' +
      'filter ' + dur + 's ' + ease + ' ' + delay + 's';
  });

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      els.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'blur(0px)';
      });
    });
  });

  var total = (dur + els.length * step + 0.3) * 1000;
  setTimeout(function () {
    els.forEach(function (el) { el.style.willChange = ''; });
  }, total);
})();
