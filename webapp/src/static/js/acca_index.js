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
    '../../static/img/phone-icon.png',
    '../../static/img/acca_index_icon11.png',
    '../../static/img/acca_index_icon12.png',
    '../../static/img/acca_index_icon13.png',
    '../../static/img/acca_index_icon14.png'
  ];


  function init() {

    pageInit();
    styleInit();
    bindEvents();


  }

  function pageInit() {

    var a1 = new Slide;

    // 轮播图
    a1.init({
      autoPlay: true,
      playTime: 5000,
      obj: '#slideBanner'
    });

  }

  function styleInit() {

    webApi.loadImages(imagesArr, function() {
      setTimeout(function() {
        load.classList.add('hide');
      }, 300);
    });
  }

  function bindEvents() {

    var showNextDetails = doc.querySelectorAll('.show-next-details');
    var i, len;

    // 最新动态
    webApi.bind(showNextDetails[0], 'click', function() {
      var ul = this.parentNode.querySelectorAll('ul')[0];
      var oI = ul.parentNode.querySelectorAll('i')[0];
      if (ul.classList.contains('active')) {
        ul.classList.remove('active');
        oI.classList.add('active');
      } else {
        ul.classList.add('active');
        oI.classList.remove('active');
      }
    });

    // acca课程
    webApi.bind(showNextDetails[1], 'click', function() {

      var parentEle = this.parentNode;
      var oI = parentEle.querySelectorAll(' a > i')[0];
      if (oI.classList.contains('active')) {
        oI.classList.remove('active');
        parentEle.classList.remove('acca-policy-active');
      } else {
        oI.classList.add('active');
        parentEle.classList.add('acca-policy-active');
      }

    });


  }

  window.onload = init;

})();
