(function ($) {
	"use strict";
  
	/*********************************************
	 * 1) OWL CAROUSEL SETUP (MEN / WOMEN / KIDS)
	 *********************************************/
	$('.owl-men-item').owlCarousel({
	  items: 5,
	  loop: true,
	  dots: true,
	  nav: true,
	  margin: 30,
	  responsive:{
		0: { items: 1 },
		600: { items: 2 },
		1000: { items: 3 }
	  }
	});
  
	$('.owl-women-item').owlCarousel({
	  items: 5,
	  loop: true,
	  dots: true,
	  nav: true,
	  margin: 30,
	  responsive:{
		0: { items: 1 },
		600: { items: 2 },
		1000: { items: 3 }
	  }
	});
  
	$('.owl-kid-item').owlCarousel({
	  items: 5,
	  loop: true,
	  dots: true,
	  nav: true,
	  margin: 30,
	  responsive:{
		0: { items: 1 },
		600: { items: 2 },
		1000: { items: 3 }
	  }
	});
  
	/***************************************
	 * 2) SCROLL-BASED HEADER BACKGROUND
	 ***************************************/
	$(window).scroll(function() {
	  var scroll  = $(window).scrollTop();
	  var box     = $('#top').height();
	  var header  = $('header').height();
  
	  if (scroll >= box - header) {
		$("header").addClass("background-header");
	  } else {
		$("header").removeClass("background-header");
	  }
	});
  
	/***************************************
	 * 3) SCROLL REVEAL INIT (IF IN USE)
	 ***************************************/
	window.sr = new scrollReveal();
  
	/*****************************************************
	 * 4) PAGE SCROLL ANIMATION (ELEVATOR-STYLE LINKS)
	 *****************************************************/
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
	  if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') 
		  && location.hostname === this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
		  var width = $(window).width();
		  // Close mobile nav if under 991px
		  if(width < 991) {
			$('.menu-trigger').removeClass('active');
			$('#navbar-menu').slideUp(200);
		  }
		  $('html,body').animate({
			scrollTop: (target.offset().top) - 80
		  }, 700);
		  return false;
		}
	  }
	});
  
	// Highlight menu item on scroll
	$(document).ready(function () {
	  $(document).on("scroll", onScroll);
  
	  // Smoothscroll
	  $('.scroll-to-section a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");
  
		$('.scroll-to-section a').each(function () {
		  $(this).removeClass('active');
		});
		$(this).addClass('active');
  
		var target = $(this.hash);
		$('html, body').stop().animate({
		  scrollTop: (target.offset().top) - 79
		}, 500, 'swing', function () {
		  window.location.hash = target;
		  $(document).on("scroll", onScroll);
		});
	  });
	});
  
	function onScroll(event){
	  var scrollPos = $(document).scrollTop();
	  $('.nav a').each(function () {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		// If scroll is within a section, highlight its nav link
		if (refElement.position() && 
			refElement.position().top <= scrollPos && 
			refElement.position().top + refElement.height() > scrollPos) {
		  $('.nav ul li a').removeClass("active");
		  currLink.addClass("active");
		} else {
		  currLink.removeClass("active");
		}
	  });
	}
  
	/**************************************************
	 * 5) PAGE LOADING ANIMATION (PRELOADER / COVER)
	 **************************************************/
	$(window).on('load', function() {
	  // Optional parallax cover
	  if($('.cover').length) {
		$('.cover').parallax({
		  imageSrc: $('.cover').data('image'),
		  zIndex: '1'
		});
	  }
  
	  // Preloader fade-out
	  $("#preloader").animate({ 'opacity': '0' }, 600, function() {
		setTimeout(function() {
		  $("#preloader").css("visibility", "hidden").fadeOut();
		}, 300);
	  });
	});
  
	/***********************************************
	 * 6) MOBILE NAV (MENU & SUBMENU TOGGLING)
	 ***********************************************/
	$(document).ready(function () {
	  // Main mobile menu toggle
	  $(".menu-trigger").on("click", function () {
		$(this).toggleClass("active");
		$("#navbar-menu").slideToggle(200);
	  });
  
	  // Submenu toggle on small screens
	  // This prevents the link from navigating
	  // and toggles the submenu items
	  $(".submenu > a").on("click", function (e) {
		// Only apply on smaller screens
		if ($(window).width() < 767) {
		  e.preventDefault();
		  $(this).next("ul").slideToggle(200);
		}
	  });
	});
  
	// Re-check layout on window resize
	// (Closes the mobile nav if screen gets resized above mobile breakpoint)
	$(window).on('resize', function() {
	  if ($(window).width() > 767) {
		$("#navbar-menu").removeAttr("style");
		$(".menu-trigger").removeClass("active");
	  }
	});
  
  })(window.jQuery);
  