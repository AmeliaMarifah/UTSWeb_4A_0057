function toggleMenu() {
  $('#nav-links').toggleClass('open');
}

$(window).on('scroll', function () {
  $('#navbar').toggleClass('scrolled',
    window.scrollY > 40);
});