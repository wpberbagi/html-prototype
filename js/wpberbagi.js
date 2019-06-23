(function ($) {
  "use strict"; // Start of use strict

  // Global var
  var body = $('body');

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Toggle responsivevmenu
  var burgerContain = $('.b-container');
  var burgerNav = $('.b-nav');

  $(document).on('click', '.b-menu', function (e) {
    e.preventDefault();
    body.toggleClass('open');
    burgerContain.toggleClass('open');
    burgerNav.toggleClass('open');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  body.scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($(".navbar2 .b-container").offset().top > 100) {
			$(".navbar2 .b-container").addClass("shrink");
		} else {
			$(".navbar2 .b-container").removeClass("shrink");
		}
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict