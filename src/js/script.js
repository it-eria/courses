//= vendors/jquery-3.1.1.min.js
//= vendors/slick.js
//= vendors/jquery.nice-select.js

var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;


function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;  
  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';  
  $('.header__bg').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });
  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {
  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;
});

$(function() {

  var playedOnce = true;

  if($(window).width() > 768) {
    moveBackground();
  }
    // Buttons
    $('.header__menu-btn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.main-nav, .b-main-nav-bg').fadeToggle();
        $('.main-nav').toggleClass('opened');
        $('.header *[data-js="blur"]').toggleClass('blur');
        if($(this).hasClass('active')) {
          $('.header').css('min-height', $('.main-nav').height()+150);
        } else {
          $('.header').removeAttr('style');
        }
    });

    $('.bottom-btn').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $("main.content").offset().top
      }, 2000);
    });

    $('.btn-up').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 2000);
    });

    $(window).on('scroll', function() {
      if($('body').find('.video').length > 0) {
        var videoObj = document.getElementById('video');
        var offsetTop = $('.video').offset().top - $('.video').height() / 2;
        if($(this).scrollTop() >= offsetTop && playedOnce) {
          videoObj.play();
          playedOnce = false;
        }
      }
    });

    // Sliders
    $('.slider .carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      dots: false,
      prevArrow: '<a href="#" class="arrow arrow--prev"><span></span><span></span></a>',
      nextArrow: '<a href="#" class="arrow arrow--next"><span></span><span></span></a>'
    });

    $('select').niceSelect();
});