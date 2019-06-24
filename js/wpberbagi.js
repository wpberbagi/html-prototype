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
    var navbar_container = $(".navbar2 .b-container");
    if(navbar_container.length){
      if (navbar_container.offset().top > 100) {
        navbar_container.addClass("shrink");
      } else {
        navbar_container.removeClass("shrink");
      }
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  $('input.input-preview').change(function(){
    var input = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var input_parent = $(input).closest('form'),
            image_preview = input_parent.find('.image-preview');
          image_preview.attr('src', e.target.result).removeClass('d-none');
      };
      reader.readAsDataURL(input.files[0]);
    }
  })

})(jQuery); // End of use strict