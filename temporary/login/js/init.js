;
(function() {

  var HREF = window.location.href;
  var sourceAddress = document.referrer;
  var allIdData = querySettings.allCommodityId;
  var keyWordStr = querySettings.keyWord;
  var requestUrl = {
    tokenPast: querySettings.tokenPastUrl,
    getMemberGroups: querySettings.getMemberGroups
  };
  var hrefVal;
  var isGoods;

  var $alertMask = $('#alertMask');
  var $query = $('#query');
  var $errorAlert = $('#errorAlert');
  var $countdownNum = $('#countdownNum');
  var $loginPage = $('#loginPage');
  var $clickReg = $('#clickReg');
  var $regPage = $('#regPage');
  var $forgetPwd = $('#forgetPwd');
  var $resetPwd = $('#resetPwd');
  var $alertTipText = $('#alertTipText');
  var $alertTargetUrl = $('#alertTargetUrl');
  var $allTime = $('#allTime');
  var $body = $('body');
  var $targetLogin = $('#targetLogin');
  var nowTime = new Date();
  var day = nowTime.getDate();
  var fullYear = nowTime.getFullYear();
  var month = nowTime.getMonth();

  function init() {

    // 清除商品包
    deleteMc();

    if (fullYear != 2016 || month != 5 || day > 18) {
      alert('活动已经过期,请继续关注我们哦~');
      window.location.href = 'http://www.caicui.com';
      return;
    }

    // 非贴吧用户
    if (sourceAddress.indexOf('tieba.baidu.com') == -1) {
      idError();
      return;
    }

    // 判断pid是否符合条件,不符合执行idError，否则idCorrect
    !isId() ? idError() : idCorrect();

    bindEvents();

  }

  function idCorrect() {

    var paramete;

    // 检查登录信息
    if (Object.prototype.toString.apply($.cookie('token')) == '[object Undefined]' && !webApi.getCookie("User").avatar) {
      openLogin();
      webApi.delCookie('User');
      webApi.delCookie('token');
    } else {

      paramete = {
        token: $.cookie('token')
      };

      webApi.getV1(requestUrl.tokenPast, paramete, requestSuccess);
    }


    function requestSuccess(response) {

      if (response.state != 'success') {
        openLogin();
        webApi.delCookie('User');
        webApi.delCookie('token');
        return;
      }

      // 检验是否购买过此类商品
      webApi.getV1(requestUrl.getMemberGroups, paramete, queryGoods);

    }

    function queryGoods(response) {

      if (response.state != 'success') {
        alert('请求失败，请手动刷新页面后重试！');
        return;
      }

      // 查询到有没这个商品包
      $.each(response.data, function(i, data) {

        $.each(querySettings.allCommodityId, function(i2, data2) {
          if (data2[0] == data.id) {
            $alertMask.removeClass('hide').addClass('show');
            $query.removeClass('show').addClass('hide');
            countDown(querySettings.buyUrl, querySettings.buyTipText, false);
            isGoods = true;
          }
        });

      });

      // 如果没购买过此商品包则跳转到订单
      if (!isGoods) {
        window.location.href = querySettings.loginSuccessTragetUrl + querySettings.commodityId;
      }

    }

  }

  function bindEvents() {

    $clickReg.on('click', function() {
      $loginPage.addClass('hide');
      $regPage.removeClass('hide');
      reg.init();
    });

    $targetLogin.on('click', function() {
      $regPage.addClass('hide');
      $loginPage.removeClass('hide');
    });

    $forgetPwd.on('click', function() {
      // console.log(querySettings.commodityId);
      window.open(querySettings.resetPwd, '_blank');
    });

  }

  function openLogin() {
    $body.removeClass('load-back');
    $alertMask.removeClass('show').addClass('hide');
    $loginPage.removeClass('hide');
    login.init();
  }

  function idError() {
    $query.addClass('hide');
    countDown(querySettings.error618Url, querySettings.error618Text, true); // 失败以后跳转的618地址
  }


  function isId() {

    if (HREF.indexOf(keyWordStr) != -1) {

      var off = false;
      querySettings.commodityId = hrefVal = HREF.substring(HREF.indexOf(keyWordStr) + keyWordStr.length);

      $.each(allIdData, function(i, data) {
        if (hrefVal == data[0]) off = true;
      });

      return off;
    }

    return false;

  }

  window.onload = init();

})();
