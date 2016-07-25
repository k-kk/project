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

  function init() {

    styleInit();
    pageInit();
    bindEvents();

  }

  function styleInit() {

    setTimeout(function() {
      load.classList.add('hide');
    });

    // 显示拨号功能
    doc.querySelector('#callPhone').classList.remove('hide');

  }

  function pageInit() {

  }

  function bindEvents() {


  }

  window.onload = init;

})();
