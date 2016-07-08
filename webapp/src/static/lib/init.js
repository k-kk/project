;
(function(window, undefined) {

  "use strict";

  var supportsOrientationChange = "onorientationchange" in window;
  var orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
  var browerType = navigator.userAgent.toLowerCase();
  var isWeixin = true;
  var allNav = document.querySelector('#allNav');
  var oBody = document.querySelectorAll('body')[0];
  var dotHtml = document.documentElement;

  var settins = {
    across: function() { // 横屏提示样式
      oBody.innerHTML = '<div class="is-across" id="isAcross">横屏内容太少啦，请使用竖屏观看！</div>';
      console.info('TIP：横屏下报出的异常请忽略');
    },
    callPhone: function() { // 底部通用电话
      var html = '<div class="fl">4006-026-018</div><a href="tel:4006-026-018">咨询</a>';
      var oDiv = document.createElement('div');
      oDiv.setAttribute('id', 'callPhone');
      oDiv.className = 'on-call hide';
      oDiv.innerHTML = html;
      oBody.appendChild(oDiv);
    },
    headerPhone: function() { // 头部手机下载链接
      return {
        url: 'javascript:;',
        title: '手机下载'
      };
    }

  };

  if (browerType.match(/MicroMessenger/i) == "micromessenger") isWeixin = false;

  // 计算rem
  function redraw() {

    var initialRem = 640 / 100;
    var deviceWidth = dotHtml.getBoundingClientRect().width;

    dotHtml.dataset.dpr = window.devicePixelRatio;
    dotHtml.style.fontSize = deviceWidth / initialRem + 'px';

  }


  function pageInit() {
    var phoneDown = document.querySelector('#phoneDown');
    phoneDown.setAttribute('href', settins.headerPhone().url);
    settins.callPhone();
  }

  // 通用样式初始
  function styleInit() {
    webApi.transformStr(allNav, 'translate3d(4.1rem,0,0)');
  }

  // 通用事件
  function bindEvent() {

    var openNav = document.querySelector('#openNav');
    var pageWrap = document.querySelector('#pageWrap');
    var forbidOn = document.querySelector('#forbidOn');
    var rightNavOff = false;

    // 导航
    webApi.bind(openNav, 'click', function(e) {

      if (!rightNavOff) {
        openNavFn();
      } else {
        closeNav();
      }
      rightNavOff = !rightNavOff;

    });

    webApi.bind(forbidOn, 'click', function() {
      closeNavFn();
      rightNavOff = !rightNavOff;
    });


    function openNavFn() {
      oBody.style.position = 'fixed';
      webApi.transitionDelay(allNav, '0s');
      webApi.transformStr(allNav, 'translate3d(0,0,0)');
      webApi.transitionStr(pageWrap, '.3s');
      webApi.transitionDelay(pageWrap, '200ms');
      webApi.transformStr(pageWrap, 'translate3d(' + -4.1 + 'rem,0,0)');
      forbidOn.classList.add('show');
    }

    function closeNavFn() {
      oBody.style.position = 'static';
      webApi.transitionDelay(pageWrap, '0s');
      webApi.transitionDelay(allNav, '200ms');
      webApi.transformStr(pageWrap, 'translate3d(0,0,0)');
      webApi.transformStr(allNav, 'translate3d(4.1rem,0,0)');
      forbidOn.classList.remove('show');
    }

    // var pageWrap = document.querySelector('#pageWrap');
    // var screenHeight = dotHtml.getBoundingClientRect().height;
    // var pageWrapHeight = pageWrap.offsetHeight;
    // var startY = 0;
    // var downOff = false;
    // var startTime = 0;
    // var endTime = 0;
    // var endNum = 0;
    // var isMoveOff = false;

    // webApi.bind(pageWrap, 'touchstart', function(ev) {

    //   var touch = ev.changedTouches[0];

    //   startY = touch.pageY;
    //   startTime = new Date().getTime();
    //   webApi.transitionStr(pageWrap, '0ms');

    // ev.stopPropagation();
    // ev.preventDefault();
    // var nodeName = ev.target;
    // if (!nodeName.getAttribute('id')) {
    //   webApi.transitionStr(pageWrap, '0ms');
    //   webApi.transformStr(pageWrap, 'translate3d(0,0,0)');
    //   downOff = true;
    // }

    // });

    // webApi.bind(pageWrap, 'touchmove', function(ev) {

    //   var touch = ev.changedTouches[0];
    //   var oldNum = Number(pageWrap.dataset.num || 0);
    //   var iTop = pageWrap.getBoundingClientRect().top;
    //   var moveNum = 0;



    // 上
    // if (iTop > 0) {
    //   if (downOff) {
    //     downOff = false;
    //     startY = touch.pageY;
    //   }
    //   moveNum = (touch.pageY - startY) / 3;
    // } else {
    //   moveNum = touch.pageY - startY + oldNum;
    // }

    // webApi.transformStr(pageWrap, 'translate3d(0,' + moveNum + 'px,0)');


    // ev.stopPropagation();
    // ev.preventDefault();

    // var nodeName = ev.target;
    // startTime = new Date().getTime();
    // if (!nodeName.getAttribute('id')) {
    //   var touch = ev.changedTouches[0];
    //   if (downOff) {
    //     downOff = false;
    //     startY = touch.pageY;
    //   }

    //   if (oBody.scrollTop <= 50 || oBody.scrollTop >= (pageWrapHeight - screenHeight) - 50) {
    //     webApi.transformStr(pageWrap, 'translate3d(0,' + (touch.pageY - startY) / 3 + 'px,0)');
    //   }
    // }

    // });

    // webApi.bind(pageWrap, 'touchend', function(ev) {

    //   var iTop = pageWrap.getBoundingClientRect().top;
    //   var touch = ev.changedTouches[0];
    //   var num = Number(pageWrap.dataset.num || 0);

    //   if (iTop > 0) {
    //     endNum = pageWrap.dataset.num = 0;
    //   } else {

    //     if (Math.abs(iTop) - screenHeight >= 0) {
    //       // endNum = Number(pageWrap.dataset.num);
    //       // console.log(pageWrapHeight - screenHeight)
    //     } else {
    //       endNum = pageWrap.dataset.num = touch.pageY - startY + num;

    //     }

    //   }

    //   webApi.transitionStr(pageWrap, '300ms');
    //   webApi.transformStr(pageWrap, 'translate3d(0,' + endNum + 'px,0)');

    // ev.stopPropagation();
    // ev.preventDefault();

    // var nodeName = ev.target;

    // endTime = new Date().getTime();
    // endTime - startTime > 500 ? isMoveOff = false : isMoveOff = true;

    // if (!nodeName.getAttribute('id') && isMoveOff) {
    //   webApi.transitionStr(pageWrap, '300ms');
    //   webApi.transformStr(pageWrap, 'translate3d(0,0,0)');
    // }

    // });

  }


  webApi.bind(window, orientationEvent, function(ev) {
    window.orientation == 0 ? location.reload() : settins.across();
  });

  if (browerType.match(/mobile/i) != 'mobile') window.location.href = 'http://www.caicui.com';

  if (window.orientation == 0) {
    redraw();
    pageInit();
    styleInit();
    bindEvent();
  } else {
    settins.across();
  }


})(window, undefined);
