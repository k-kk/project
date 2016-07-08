;
(function() {

  'use strict';

  var location = window.location;
  var doc = window.document;
  var oHtml = document.documentElement;
  var screenWidth = oHtml.clientWidth;
  var screenHeight = oHtml.clientHeight;
  var oBody = doc.querySelectorAll('body')[0];
  var load = document.querySelector('#load');
  var imagesArr = [
    'static/img/index_acca.jpg',
    'static/img/index_cfa.jpg',
    'static/img/index_cima.jpg',
    'static/img/index_cma.jpg'
  ];

  var allNav;

  function init() {

    var a1 = new Slide;

    a1.init({
      autoPlay: true,
      playTime: 5000,
      obj: '#slideBanner'
    });


    styleInit();
    bindEvents();

  }

  function styleInit() {

    allNav = document.querySelector('#allNav');

    webApi.transformStr(allNav, 'translate3d(4.1rem,0,0)');

    webApi.loadImages(imagesArr, function() {
      setTimeout(function() {
        load.classList.add('hide');
      }, 300);
    });
  }

  function bindEvents() {

    var openMoreLinks = document.querySelectorAll('#openDetails div');

    // 底部更多显示点击
    for (var i = 0; i < openMoreLinks.length; i++) {
      webApi.bind(openMoreLinks[i], 'click', function(e) {
        this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active');
      });
    }

  }

  window.onload = init;

})();
