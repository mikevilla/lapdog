$(document).ready(function() {

  var win = $(window);

  $(window).load(function() {
    $(".preloader").delay(1000).fadeOut("slow");
    $('body').css('overflow', 'auto');
  });


  /* ================================================
     NAVIGATION
  ================================================ */
  /* -----------------------------
     Show/Hide Nav on scroll
  ----------------------------- */
  // set defaults
  var nav = $('#main-nav'),
      navHeight = nav.outerHeight(),

      lastScrollTop = 0;

  // hide menu on load
  nav.css('top', navHeight * -1);

  // get new height value when resizing for smaller screens
  win.resize(function(){
    if (matchMedia('(max-width: 992px)').matches) {
      navHeight = nav.outerHeight();
    }
  });

  // event
  win.scroll(function(){
    // do not scroll mobile menu up when opened 
    if ( ! ( $('.navbar-collapse').hasClass('in') ) ) {
      // if mobile menu not opened and not on small screens
      var currentScollTop = $(this).scrollTop();
      if (currentScollTop > lastScrollTop || win.scrollTop() < 800) {
        // downscroll code
        nav.css('top', navHeight * -1);
      } else {
        // upscroll code
        nav.css('top', 0);
      }
      lastScrollTop = currentScollTop;
    }
  });


  
  $('#main-nav-ul a').click(function(){
    if (matchMedia('(max-width: 768px)').matches) {
      $('.navbar-toggle').click();
    }
  });

  


  /* ================================================
     PLUGINS
  ================================================ */
  /* -----------------------------
     ScrollTo & LocalScroll
  ----------------------------- */
  // container as selector
  $('body').localScroll({
     target:'body',
     duration: 750
  });


  /* -----------------------------
     ScrollTo & LocalScroll
  ----------------------------- */
  $('#main-nav-ul').onePageNav({
      currentClass: 'current',
      changeHash: false,
      scrollSpeed: 750,
      scrollThreshold: 0.5,
  });

  /* -----------------------------
     Owl Carousel
  ----------------------------- */
  $('.companies-logo-slider').owlCarousel({
    autoplay: true,
    slideBy: 'page',

    responsive: {
      0: { items: 2 },
      768: { items: 4 }
    }
  });


  $('.testimonials-slider').owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    dotsSpeed: 1000,

    responsive: {
      0: { items: 1 }
    }
  });

  $('.screens-gallery-slider').owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    slideBy: 'page',
    margin: 20,

    responsive: {
      0: { items: 2 },
      768: { items: 4 },
    }
  });



  /* -----------------------------
     Magnific Popup Lightbox
  ----------------------------- */
  $('.intro-product-media, .screens-gallery-slider, .feature-media.image').magnificPopup({
    delegate: 'a',
    type: 'image'
  });

  
  $('.feature-media.video a, .watch-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  /* -----------------------------
     Stellar Parallax
  ----------------------------- */
  win.stellar({
    horizontalScrolling: false,
    verticalOffset: 0
  });
  // fix for resizing bg pos issues
  win.resize(function() {
      $(this).stellar('refresh');
  });
  // fix random pos bug
  setTimeout(function(){
    win.stellar('refresh');
  }, 2000);


  /* -----------------------------
     Backstretch BG Image Slider
  ----------------------------- */
  // $('.intro, .download-product').backstretch([
  //     'images/bg-01.jpg', // file path
  //     'images/bg-02.jpg'
  //   ],
  //   {
  //     fade: 1000,
  //     duration: 4000
  // });

  /* -----------------------------
     Background Video
  ----------------------------- */
  // var videobackground = new $.backgroundVideo($('body'), {
  //   "align": "centerXY",
  //   "width": 1280,
  //   "height": 720,
  //   "path": "videos/",
  //   "filename": "video",
  //   "types": ["mp4","ogg","webm"]
  // });


  /* -----------------------------
     FitVids
  ----------------------------- */
  $('.video').fitVids();

});