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
    bindEvents();

  }

  function styleInit() {

    setTimeout(function() {
      load.classList.add('hide');
    }, 500);
  }

  function bindEvents() {


  }

  window.onload = init;

})();
