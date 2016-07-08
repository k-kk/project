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
    '../../static/img/phone-icon.png'
  ];


  function init() {

    styleInit();
    bindEvents();

  }

  function styleInit() {



    webApi.loadImages(imagesArr, function() {
      setTimeout(function() {
        load.classList.add('hide');
      }, 300);
    });
  }

  function bindEvents() {


  }

  window.onload = init;

})();
