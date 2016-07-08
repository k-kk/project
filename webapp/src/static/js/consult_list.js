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

    var showNextDetails = document.querySelectorAll('.show-next-details');
    var i, len;

    for (i = 0, len = showNextDetails.length; i < len; i++) {
      webApi.bind(showNextDetails[i], 'click', function() {

        var parentEle = this.parentNode;
        var content = parentEle.querySelectorAll('.content')[0];
        var oI = this.querySelectorAll('i')[0];
        if (oI.classList.contains('active')) {
          oI.classList.remove('active');
          content.classList.remove('consult-contnet-active');
        } else {
          oI.classList.add('active');
          content.classList.add('consult-contnet-active');
        }

      });
    }

  }

  window.onload = init;

})();
