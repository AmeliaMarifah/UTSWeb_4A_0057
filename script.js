function animateCounter(id, target, suffix = '') {
  let start = 0;

  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);

    $('#' + id).text(
      Math.floor(start).toLocaleString('id-ID') + suffix
    );

    if (start >= target) {
      clearInterval(timer);
    }
  }, 16);
}

function toggleMenu() {
  $('#nav-links').toggleClass('open');
}

$(window).on('scroll', function () {
  $('#navbar').toggleClass('scrolled',
    window.scrollY > 40);
});