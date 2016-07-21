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

    var titleFixed = document.querySelector('#titleFixed');
    var header = document.querySelector('#header');

    webApi.bind(doc, 'scroll', function(ev) {

      var classNameStr;

      oBody.scrollTop >= (header.offsetHeight + titleFixed.offsetHeight) ? classNameStr = 'fixed' : classNameStr = '';
      titleFixed.className = classNameStr;

    });

  }

  window.onload = init;

})();
