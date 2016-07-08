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

    // 显示拨号功能
    doc.querySelector('#callPhone').classList.remove('hide');

    setTimeout(function() {
      load.classList.add('hide');
    }, 500);
  }

  function bindEvents() {

    var guideOn = document.querySelector('#guideOn');
    var accaList = document.querySelector('#accaList');
    var fixedNav = document.querySelector('#fixedNav');

    // 考试指南关闭/打开
    webApi.bind(guideOn, 'click', function() {

      var parentEle = this.parentNode;
      var oContent = parentEle.querySelectorAll('.content')[0];
      var oI = parentEle.querySelectorAll('i')[0];
      if (oI.classList.contains('active')) {
        oI.classList.remove('active');
        oContent.classList.remove('acca-guide-active');
      } else {
        oI.classList.add('active');
        oContent.classList.add('acca-guide-active');
      }

    });

    // 浮窗导航
    webApi.bind(doc, 'scroll', function(ev) {

      var classNameStr = 'fixed-nav hide';

      oBody.scrollTop >= accaList.offsetTop ? classNameStr = 'fixed-nav' : classNameStr = 'fixed-nav hide';
      fixedNav.className = classNameStr;

    });

    console.log();


  }

  window.onload = init;

})();
