//= vendors/jquery-3.1.1.min.js
//= vendors/slick.js
//= vendors/jquery.nice-select.js
//= vendors/jquery.datetimepicker.min.js
//= vendors/parallax.min.js

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

// Customize calendar
$.fn.datetimepicker.CONSTS = {
  I18N: {
      zh: {
          SDN: ["日", "一", "二", "三", "四", "五", "六"],
          MN: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
          DN: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
          CALENDAR: "日历",
          CLEAR: "清空",
          TODAY: "今天",
          OK: "确定",
          CURRENT: "当前",
          TIME: "时间"
      },
      en: {
          SDN: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          MN: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          DN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          CALENDAR: "Calendar",
          CLEAR: "Clear",
          TODAY: "Today",
          OK: "OK",
          CURRENT: "Now",
          TIME: "Time"
      },
      de: {
          SDN: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
          MN: ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
          DN: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
          CALENDAR: "Kalender",
          CLEAR: "Löschen",
          TODAY: "Heute",
          OK: "OK",
          CURRENT: "Jetzt",
          TIME: "Zeit"
      },
      ua: {
        SDN: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        MN: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
        DN: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четверг", "П'ятниця", "Субота"],
        CALENDAR: "Календар",
        CLEAR: "Очистити",
        TODAY: "Сьогодні",
        OK: "OK",
        CURRENT: "Зараз",
        TIME: "Час"
      }
  },

  VIEWMODE: {
      YM: 'YM',  // yyyyMM
      YMD: 'YMD', // yyyyMMdd
      HMS: 'HMS', // HHmmss
      HM: 'HM', // HHmm
      YMDHMS: 'YMDHMS', // yyyyMMddHHmmss
      YMDHM: 'YMDHM' // yyyyMMddHHmm
  },

  MINYEAR: 1900,
  MAXYEAR: 2999,

  NAV: {
      'prevm': 2, //previous month
      'nextm': 3, //next month
      'title': 4, //title
      'clear': 5, //clear
      'today': 6, //today
      'dok': 7,   //ok in day pane
      'prevy': 8, //previous ten years
      'nexty': 9, //next ten years
      'cancel': 10, //cancel
      'mok': 11,   //ok in month pane
      'plus': 12, //plus
      'minus': 13, //minus
      'current': 15, //current
      'day': 100, //day
      'month': 200, //month
      'year': 300 //year
  }
};

$(function() {

  var dateSelected;

  if($('#parallax-scene').length > 0) {
    var scene = $('#parallax-scene').get(0);
    var parallaxInstance = new Parallax(scene);
  }

  if($('#calendar').length > 0) {
    $('#calendar').datetimepicker({
      baseCls: "perfect-datetimepicker", 
      viewMode: 'YMD',
      firstDayOfWeek: 1,
      date: new Date(), //initial date
      endDate: null, //end date
      startDate: null, //start date
      language: 'ua', //I18N
      //date update event
      onDateUpdate: null,
      //clear button click event
      onClear: null,
      //ok button click event
      onOk: function() {
        dateSelected = this.getText().replace(/[0-9][0-9]\:[0-9][0-9]\:[0-9][0-9]/g, '');
        $("#dateValue").val(dateSelected);
      },
      //close button click event
      onClose: null,
      //today button click event
      onToday: null
    });
  }

  $('.preloader').delay(2100).fadeOut(300);
  setTimeout(function() {
    $('body').removeAttr('style');
  }, 5500);

  setTimeout(function() {
    var videoHeader = document.getElementById('video_header');
    videoHeader.play();
  }, 2100);

  $('*[data-js="while-video-play"]').delay(5500).fadeIn(300);

  var playedOnce = true;

  if($(window).width() > 768) {
    moveBackground();
  }

  $('.bottom-btn-area').on('mouseover', function() {
    $(this).addClass('mouseover');
  });
  $('.bottom-btn-area').on('mouseleave', function() {
    setTimeout(function() {
      $('.bottom-btn-area').removeClass('mouseover');
    }, 1200);
  });
    // Buttons
    $('.header__menu-btn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.main-nav, .b-main-nav-bg').fadeToggle();
        $('.main-nav').toggleClass('opened');
        $('.header *[data-js="blur"]').toggleClass('blur');
        if($(this).hasClass('active')) {
          $('.header').css('min-height', '100vh');
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