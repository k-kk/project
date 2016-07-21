var login = (function() {


  function init() {

    var HREF = window.location.href;
    var $alertMask = $('#alertMask');
    var $query = $('#query');
    var $userName = $('#userName');
    var $passWord = $('#passWord');
    var $past = $('#past');
    var $loginText = $('#loginText');
    var loginPort = {
      login: caicui.userLoginUrl + '/api/v2.1/login',
      token: caicui.userLoginUrl + '/api/v2.1/getToken'

    };
    var loadSettings = {
      ajaxLoad: '登录中',
      login: '登陆'
    };

    var requestUrl = {
      tokenPast: querySettings.tokenPastUrl,
      getMemberGroups: querySettings.getMemberGroups
    };

    var isGoods;

    if (HREF.indexOf('loginRedirectUrl') != -1 && HREF.indexOf('#hide') == -1) {
      $past.show();
    }

    //输入用户名自动填写密码
    var userAuto = webApi.getCookie("rememberLoginInfo");
    if (userAuto.user) {

      $userName.val(userAuto.user);
      $passWord.val(userAuto.nickword);

      $userName.blur(function() {
        if ($(this).val() == userAuto.user || $(this).val() == userAuto.nickname) {
          $passWord.val(userAuto.nickword);
        }
      });

    }

    //输入用户名自动填写密码end
    //获取用户名

    var user = $(".login-ipt .username");
    //获取密码
    var pwd = $(".login-ipt .password");

    //input获得焦点
    $(".login-ipt input").focus(function() {
      $(".error-prom").hide();
      $(this).next().children().eq(0).hide();
    });

    $(".login-ipt input").blur(function() {
      if (!$(this).val()) {
        $(this).next().children().eq(0).show();
      } else {
        $(this).next().children().eq(0).hide();
      }
    });

    //点击登录
    $(".login-btn a").on("click", function() {
      if (!user.val() || !pwd.val()) {
        //用户名为空时报错
        if (!user.val()) {
          $(".prom-usr").children().eq(0).show();
        }
        //密码为空时报错
        if (!pwd.val()) {
          $(".prom-pwd").children().eq(0).show();
        }

      } else {

        // 用户名密码正确时调用接口登录
        userLogin({
          account: user.val(),
          password: pwd.val(),
          token: getToken('', loginPort.token)
        });

        $loginText.addClass('gray').html(loadSettings.ajaxLoad);
      }
    });


    // 用户登录
    function userLogin(paramete) {


      webApi.postV1(loginPort.login, paramete, function(response) {

        if (response.state == 'error') {
          error(response);
          return;
        }

        success(response);

      });

      function success(response) {

        var temporaryStr = {};

        for (var attr in response.data) {
          temporaryStr[attr] = response.data[attr];
        }


        webApi.setCookie('token', response.data.token, 'h12', true);
        webApi.setCookie('User', temporaryStr, 'h12', false);


        if ($("input[type='checkbox']").is(":checked")) { // 记住密码

          var user = {
            nickname: response.data.nickName,
            user: $userName.val(),
            nickword: $passWord.val()
          };

          webApi.setCookie('rememberLoginInfo', user, 'h6', false);

        }

        // 清除商品包
        deleteMc();

        // 检验是否购买过此类商品
        var loginParamete = {
          token: $.cookie('token')
        };

        webApi.getV1(requestUrl.getMemberGroups, loginParamete, queryGoods);

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

        // window.location.href = querySettings.loginSuccessTragetUrl + querySettings.commodityId;

      }

      function error(response) {
        $(".prom-pwd").children().eq(1).show();
        $loginText.removeClass('gray').html(loadSettings.login);
      }

    }

  }



  return {
    init: init
  };

})();
