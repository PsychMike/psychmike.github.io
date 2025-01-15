(function ($) {
    "use strict";
  
    /*****************************************************************
     * 1) PAGE SCROLL (Requires jQuery Easing: 'easeInOutExpo')
     *****************************************************************/
    $('.page-scroll').on('click', function(event) {
      event.preventDefault();
      var $anchor = $(this);
  
      $('html, body')
        .stop()
        .animate(
          { scrollTop: $($anchor.attr('href')).offset().top - 64 },
          1500,
          'easeInOutExpo'
        );
    });
  
    /*****************************************************************
     * 2) ON-SCROLL ANIMATED HEADER (Adds/Removes .navbar-shrink)
     *    Source: https://github.com/codrops/AnimatedHeader
     *****************************************************************/
    var cbpAnimatedHeader = (function() {
      var docElem       = document.documentElement,
          header        = document.querySelector('.navbar-fixed-top'),
          didScroll     = false,
          changeHeaderOn = 10;
  
      function init() {
        window.addEventListener('scroll', function() {
          if (!didScroll) {
            didScroll = true;
            setTimeout(scrollPage, 250);
          }
        }, false);
      }
  
      function scrollPage() {
        var sy = scrollY();
        if (sy >= changeHeaderOn) {
          classie.add(header, 'navbar-shrink');
        } else {
          classie.remove(header, 'navbar-shrink');
        }
        didScroll = false;
      }
  
      function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
      }
  
      init();
    })();
  
    /*****************************************************************
     * 3) SCROLLSPY (Highlights nav items as scrolling occurs)
     *****************************************************************/
    $('body').scrollspy({
      target: '.navbar',
      offset: 65
    });
  
    /*****************************************************************
     * 4) PAGE LOADER (Fades out .page-loader once window is loaded)
     *****************************************************************/
    $(window).on('load', function() {
      $(".page-loader").fadeOut("slow");
    });
  
    /*****************************************************************
     * 5) OWL CAROUSEL
     *    Docs: http://owlgraphic.com/owlcarousel
     *****************************************************************/
    // Intro text carousel
    $("#owl-intro-text").owlCarousel({
      singleItem : true,
      autoPlay : 6000,
      stopOnHover : true,
      navigation : false,
      navigationText : false,
      pagination : true
    });
  
    // Partner carousel
    $("#owl-partners").owlCarousel({
      items : 4,
      itemsDesktop : [1199, 3],
      itemsDesktopSmall : [980, 2],
      itemsTablet: [768, 2],
      autoPlay : 5000,
      stopOnHover : true,
      pagination : false
    });
  
    // Testimonials carousel
    $("#owl-testimonial").owlCarousel({
      singleItem: true,
      pagination: true,
      autoHeight: true,
      autoPlay: 6000,  // e.g. 6 seconds
      stopOnHover: true
    });
  
    /*****************************************************************
     * 6) PARALLAX VIA STELLAR: https://github.com/markdalgleish/stellar.js
     *****************************************************************/
    $.stellar({
      horizontalScrolling: false,
      verticalScrolling: true
    });
  
    /*****************************************************************
     * 7) WOW ANIMATION SCROLL: https://github.com/matthieua/WOW
     *****************************************************************/
    new WOW().init();
  
    /*****************************************************************
     * 8) COUNTER-UP (Requires waypoints.js)
     *    Docs: https://github.com/bfintal/Counter-Up
     *****************************************************************/
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });
  
    /*****************************************************************
     * 9) ISOTOPE SETUP (For portfolio filtering)
     *****************************************************************/
    $(window).on('load', function() {
      // Handle active class on portfolio menu
      $('.portfolio_menu ul li').on('click', function(){
        $('.portfolio_menu ul li').removeClass('active_prot_menu');
        $(this).addClass('active_prot_menu');
      });
  
      var $container = $('#portfolio');
      $container.isotope({
        itemSelector: '.col-sm-4',
        layoutMode: 'fitRows'
      });
  
      $('#filters').on('click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
        return false;
      });
    });
  
    /*****************************************************************
     * 10) SCROLL TO TOP BUTTON
     *****************************************************************/
    // Show/hide button on scroll
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.scrolltotop').fadeIn();
      } else {
        $('.scrolltotop').fadeOut();
      }
    });
    // Scroll to top on click
    $('.scrolltotop').click(function() {
      $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
      return false;
    });
  
    /*****************************************************************
     * 11) MOBILE NAVIGATION & SUBMENU TOGGLING
     *****************************************************************/
    $(document).ready(function () {
      // Main mobile menu toggle
      $(".menu-trigger").on("click", function () {
        // Toggle the 'active' class
        $(this).toggleClass("active");
        
        // Your existing menu toggle code, if any:
        $("#navbar-menu").slideToggle(200);
      });
      
  
      // Submenu toggle on small screens
      $(".submenu > a").on("click", function (e) {
        if ($(window).width() < 767) {
          e.preventDefault();
          $(this).next("ul").slideToggle(200);
        }
      });
    });
  
    // Close mobile nav on resize above 767px
    $(window).on('resize', function() {
      if ($(window).width() > 767) {
        $("#navbar-menu").removeAttr("style");
        $(".menu-trigger").removeClass("active");
      }
    });
  
    /*****************************************************************
     * 12) OPTIONAL: Close Bootstrap Nav on Link Click
     *    Uncomment if using a standard .navbar-collapse for mobile.
     *****************************************************************/
    /*
    $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
      }
    });
    */
  
  })(window.jQuery);
  