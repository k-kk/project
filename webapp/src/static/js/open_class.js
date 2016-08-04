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

    pageInit();
    bindEvents();

  }

  function styleInit() {

    setTimeout(function() {
      load.classList.add('hide');
    }, 500);

  }

  function pageInit() {


    styleInit();

  }

  function bindEvents() {

    var seedingTime = document.querySelectorAll('.direct-seeding-time a');
    var list = document.querySelectorAll('#directSeedingDetails > .list');
    var oldIndex = 0;
    var i, len = 0;

    if (seedingTime.length == list.length) {
      for (i = 0, len = seedingTime.length; i < len; i++) {
        seedingTime[i].dataset.index = i;
        webApi.bind(seedingTime[i], 'touchend', function() {
          if (this.dataset.index != oldIndex) {
            seedingTime[this.dataset.index].classList.add('active');
            seedingTime[oldIndex].classList.remove('active');
            list[this.dataset.index].classList.add('active');
            list[oldIndex].classList.remove('active');
            oldIndex = this.dataset.index;
          }
        });
      }
    }

  }

  window.onload = init;

})();
