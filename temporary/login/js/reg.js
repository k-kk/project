var reg = (function() {

  function init() {

    var $registerBtn = $('#registerBtn');
    var $phoneReg = $('#phoneReg');
    var $gainCode = $('#gainCode');
    var $phoneCode = $('#phoneCode');
    var $pwdSend = $('#pwdSend');
    var $gainEmail = $('#gainEmail');
    var $emailReg = $('#emailReg');
    var $phoneCheck = $('#phoneCheck');
    var $emailCheck = $('#emailCheck');
    var $emailRegTrue = $('#emailRegTrue');
    var $countdownNum = $('#countdownNum');
    var $checkInput = $('.register-agree').find('input');
    var $alertMask = $('#alertMask');
    var $query = $('#query');
    var isPicStrVerify = true;
    var isSend = false;
    var emailCountTime = 0;
    var phoneCountTime = 0;
    var emailTime = null;
    var phoneTime = null;
    var emailPortUrl = {
      query: caicui.userLoginUrl + '/api/wd/v3/member/checkexist',
      send: caicui.userLoginUrl + '/api/v3/member/getCodeByEmail',
      reg: caicui.userLoginUrl + '/api/v3/member/regByEmail',
      token: caicui.userLoginUrl + '/api/v2.1/getToken'
    };
    var sendPhoneMeg = {
      sending: '正在发送验证码...'
    };

    var loginMsg = {
      account: '',
      password: '',
      token: ''
    };

    var requestUrl = {
      tokenPast: querySettings.tokenPastUrl,
      getMemberGroups: querySettings.getMemberGroups
    };

    var isGoods;

    // 手机号码注册定义
    var oBox = $(".register-phone"),
      phone = oBox.children("input").eq(0),
      validate = oBox.children("input").eq(1),
      img = $(".pwd-img input"),
      user = oBox.children("input").eq(2),
      pwd = oBox.children("input").eq(3),
      pwdCon = oBox.children("input").eq(4),
      sendTime = null,
      flag = 0,
      flagP = false;
    // 邮箱注册定义
    var oEmail = $(".register-email"),
      email = oEmail.children("input").eq(0),
      valE = oEmail.children("input").eq(1),
      userE = oEmail.children("input").eq(2),
      pwdE = oEmail.children("input").eq(3),
      pwdEcon = oEmail.children("input").eq(4);

    //切换手机和邮箱（修改 ）
    var $regSelect = $('#regSelect');

    $regSelect.find('a').on("click", function() {
      var oIndex = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(".register-div").removeClass("active").eq(oIndex).addClass("active");
      $(".error-prom").hide();
      $(".pwd-img").hide();
    });

    //input 获得失去焦点是否为空验证
    $("input").focus(function() {
      $(this).next().find(".error-prom").hide();
    });
    $("input").blur(function() {
      if (!$(this).val()) {
        $(this).next().find(".error-prom").eq(0).show();
      } else {
        $(this).next().find(".error-prom").eq(0).hide();
      }
    });
    // 手机号和邮箱验证
    function phoneVal(phone) {

      var phoneNum = $.trim(phone.val());
      if (!phoneNum) {
        phone.next().children().eq(0).show();
      } else {
        phone.next().children().eq(0).hide();
        var regp = /^1[0-9]{10}$/,
          rege = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if ($(".register-div").eq(0).hasClass("active")) {
          if (!regp.test(phoneNum)) {
            phone.next().children().eq(1).show();
          } else {
            phone.next().children().eq(1).hide();
            return true;
          }
        } else {
          if (!rege.test(phoneNum)) {
            phone.next().children().eq(1).show();
          } else {
            phone.next().children().eq(1).hide();
            return true;
          }
        }
      }
    }

    //图片验证码
    function imgVal(img) {
      if (!img.val()) {
        $(".imgval").show();
      } else {
        $(".imgval").hide();
        return true;
      };
    }
    //验证码
    function valVal(validate) {
      if (!validate.val()) {
        validate.next().children().eq(0).show();
      } else {
        validate.next().children().eq(0).hide();
        return true;
      }
    }
    //用户名
    function userVal(user) {
      var userT = false;
      var reg = /^[\w+]{2,16}$/;
      if (!user.val()) {
        user.next().children().eq(0).show();
      } else {
        user.next().children().eq(0).hide();
        if (!reg.test(user.val())) {
          user.next().children().eq(1).show();
        } else {
          user.next().children().eq(1).hide();
          console.log("m");
          console.log(user.val());
          $.ajax({
            url: emailPortUrl.query,
            type: "GET",
            async: false,
            data: {
              "checkname": user.val(),
              "checktype": "3"
            },
            success: function(data) {

              console.log(data);
              if (data.data == "true") {
                user.next().children().eq(2).show();

              } else if (data.data == "false") {
                user.next().children().eq(2).hide();
                userT = true;
              };
            },
            error: function(data) {
              console.log(data);
            }
          })
          return userT;
        }
      }
    }
    //密码
    function pwdVal(pwd) {
      var reg = /^\d{9,16}$|^(?!\d+$)[\w.]{8,16}$/;
      if (!pwd.val()) {
        pwd.next().children().eq(0).show();
      } else {
        pwd.next().children().eq(0).hide();
        if (!(reg.test(pwd.val()))) {
          pwd.next().children().eq(1).show();
        } else {
          pwd.next().children().eq(1).hide();
          return true;
        }
      }
    }
    //确认密码
    function pwdConVal(pwd, pwdCon) {
      if (!pwdCon.val()) {
        pwdCon.next().children().eq(0).show();
      } else {
        pwdCon.next().children().eq(0).hide();
        if (pwd.val() !== pwdCon.val()) {
          pwdCon.next().children().eq(1).show();
        } else {
          pwdCon.next().children().eq(1).hide();
          return true;
        }
      }
    }
    //是否同意服务
    function servVal() {
      if (!$("input[type='checkbox']").is(":checked")) {
        $(".error-caicui .error-prom").show();
        flag = 0;
        return false;
      } else {
        $(".error-caicui .error-prom").hide();
        flag = 1;
        return true;
      }
    }
    //改变图片
    $(".phone-img a,.phone-img img").on("click", function() {
      $(".phone-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
    });

    $(".reg-img img,.reg-img a").on("click", function() {
      $(".reg-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
    });


    // 手机注册
    $registerBtn.on("click", function() {

      if ($registerBtn.html() == '注册中') {
        return;
      }

      $phoneCheck.one('change', function() {
        servVal();
      });

      phoneRegSubmit();
    });

    // 邮箱注册
    $emailReg.on('click', function() {

      if ($emailReg.html() == '注册中') {
        return;
      }

      $emailCheck.one('change', function() {
        servVal();
      });

      mailRegSubmit();
    });

    // 验证用户名是否存在
    // userE.on('keyup',function(){
    //   userVal($(this));
    // });

    // 邮箱注册
    function mailRegSubmit() {

      phoneEm = phoneVal(email);
      userEm = userVal(userE);
      pwdEm = pwdVal(pwdE);
      pwdEcm = pwdConVal(pwdE, pwdEcon);
      valEm = valVal(valE);
      sevEm = servVal();

      if (!phoneEm || !userEm || !pwdEm || !pwdEcm || !valEm || !sevEm || !flagP) {
        return;
      }

      if ($gainEmail.attr('data-send') != 'true') {
        alert('请先发送验证码');
      }

      var queryParameter = {
        "checkname": userE.val(),
        "checktype": "3"
      };

      webApi.getV1(emailPortUrl.query, queryParameter, queryUser);

      function queryUser(response) {

        if (response.state == 'error') {
          console.log(response.msg);
          return;
        }

        if (response.data == 'true') {
          userE.next().children().eq(2).show();
          return;
        }

        verifyEmailCode();

      }

      function verifyEmailCode() {

        var parameter = {
          "type": "validate",
          "email": email.val(),
          "code": valE.val()
        };

        webApi.getV1(emailPortUrl.send, parameter, function(response) {

          if (response.state == 'error') {
            valE.next().children().eq(1).show();
            return;
          }

          if (response.data == 'false') {

            valE.next().children().eq(1).show();
          }

          if ($emailReg.html() == '注册') {
            emailTime = setInterval(function() {
              emailCountTime++;
              if (emailCountTime == 30) {
                emailCountTime = 0;
                clearInterval(emailTime);
                $emailReg.html('注册').attr('style', ' ');
              }
            }, 1000);
          }


          $emailReg.html('注册中').css('background-color', '#999');
          regEmail();

        });

      }


      function regEmail() {

        var parameter = {
          "email": email.val(),
          "password": pwdE.val(),
          "username": userE.val(),
          "agreement": Number(flagP),
          "code": valE.val()
        };

        webApi.postV1(emailPortUrl.reg, parameter, function(response) {

          valE.next().children().eq(1).hide();

          if (response.state == 'success') {

            webApi.setCookie('regInfo', response.data);

            // 存用户登陆信息
            loginMsg.account = parameter.email;
            loginMsg.password = parameter.password;
            loginMsg.token = getToken('', emailPortUrl.token);

            regSuccess();

          }

          if (response.state == 'error') {
            $emailReg.html('注册').attr('style', '');
            console.log(response.msg);
          }

        });

      }


    }

    // 手机注册提交
    function phoneRegSubmit() {

      phoneV = phoneVal(phone);
      validatV = valVal(validate);
      pwdV = pwdVal(pwd);
      pwdVc = pwdConVal(pwd, pwdCon);
      sevV = servVal();

      // userV = userVal(user);
      if (!phoneV || !validatV || !pwdV || !pwdVc || !sevV || !flagP) {
        return;
      }

      if ($gainCode.attr('data-send') != 'true') {
        alert('请先发送验证码');
      }

      var submitUrl = caicui.userLoginUrl + "/api/v2.1/msg/code";
      var verifyPhoneCodeparameter = {
        type: "validate",
        phone: phone.val(),
        code: validate.val(),
        token: getToken('', '/api/v2.1/getToken')
      };

      webApi.postV2(submitUrl, verifyPhoneCodeparameter, function(response) {

        if (response.state == "success") {

          if ($registerBtn.html() == '注册') {
            phoneTime = setInterval(function() {
              phoneCountTime++;
              if (phoneCountTime == 30) {
                phoneCountTime = 0;
                clearInterval(phoneTime);
                $registerBtn.html('注册').attr('style', ' ');
              }
            }, 1000);
          }

          $registerBtn.html('注册中').css('background-color', '#999');

          validate.next().children().eq(1).hide();
          var url = caicui.userLoginUrl + "/api/v2.1/memberReg";
          var parameter = {
            password: pwd.val(),
            phone: phone.val(),
            code: validate.val(),
            agreement: flag,
            token: getToken('', '/api/v2.1/getToken')
          };


          webApi.postV2(url, parameter, function(response) {

            try {
              if (Object.prototype.toString.apply(response) == '[object String]') {
                response = JSON.parse(response);
              }
            } catch (e) {
              console.log(e + '441');
            }

            if (response.state == 'success') {

              webApi.setCookie('regInfo', response.data);

              //　存用户登陆信息
              loginMsg.account = parameter.phone;
              loginMsg.password = parameter.password;
              loginMsg.token = getToken('', '/api/v2.1/getToken');

              regSuccess();

            } else {
              $registerBtn.html('注册').attr('style', '');
            }

          });

        } else if (response.msg == "false") {
          validate.next().children().eq(1).show();
        }
      });

    }

    function regSuccess() {

      webApi.postV1(querySettings.userLoginUrl, loginMsg, function(response) {

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
        alert('自动登陆失败，请刷新页面后手动登陆！');
      }



      // var timer = null;
      // var num = 5;

      // $alertMask.show();
      // timer = setInterval(function() {
      //   num--;
      //   $countdownNum.html(num);
      //   if (num === 0) {
      //     clearInterval(timer);
      //     window.location.href = '/page/login.jsp';
      //   }
      // }, 1000);

    }

    // 点击发送手机验证码
    $gainCode.on('click', function() {
      phoneCodeLogic();
    });

    function phoneCodeLogic() {

      if (!phoneVal(phone)) {
        return;
      }

      var url = caicui.userLoginUrl + '/api/wd/v3/member/checkexist';
      var paramete = {
        checkname: $phoneCode.val(),
        checktype: '1'
      };

      $gainCode.attr('data-send', 'true');


      // 是否存在图形验证码
      if (isPicStrVerify) {

        webApi.getV1(url, paramete, function(response) {

          if (response.data == 'true') { // 手机存在
            $phoneCode.next().find('span').eq(2).show();
            return;
          }

          phoneCodeVerify();

        });
      } else {
        phoneCodeVerify();
      }


      function phoneCodeVerify() {

        $pwdSend.html(sendPhoneMeg.sending);

        getToken(function(response) { // 有返回时候执行

          var gainCodeUrl = caicui.userLoginUrl + '/api/v2.1/msg/code';
          var gainCodeParamete = {
            type: "send",
            phone: $phoneCode.val(),
            j_captcha: $(".pwd-img input").val(),
            token: response.data.token
          };

          webApi.postV1(gainCodeUrl, gainCodeParamete, function(response, status, xhr) {

            if (response.state == "success") {

              $(".pwd-send").html("发送成功！");
              flagP = true;
              sendAgain();
              isPicStrVerify = true;

            } else if (response.msg == "3") { //调用发送验证码接口超过三次，需要发送图片验证码

              $(".phone-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
              $(".pwd-img").show();
              $(".pwd-send").hide();
              isPicStrVerify = false;

            } else if (response.msg == "false") {

              $(".pwd-img").hide();
              isPicStrVerify = true;
              $phoneCode.next().children().eq(3).show();

            }

          });

        }, '/api/v2.1/getToken');

      }

    }



    // 点击发送邮箱验证码
    $gainEmail.on("click", function() {

      if (!phoneVal(email)) {
        return;
      }

      $gainEmail.attr('data-send', 'true');

      var queryParameter = {
        checkname: email.val(),
        checktype: "2"
      };

      webApi.getV1(emailPortUrl.query, queryParameter, sendEmail);

      function sendEmail(response) {
        console.log(response);
        if (response.state == 'error') {
          console.log('请求失败' + response);
          return;
        }

        if (response.data != 'true') {
          $emailRegTrue.hide();
        } else {
          $emailRegTrue.show();
          return;
        }

        if (response.state == 'success') {

          $(".pwd-send").html("正在发送验证码...");
          $(".email-reg").hide();
          sendAgain();

          var sendParameter = {
            type: "send-reg",
            email: email.val()
          };

          webApi.getV1(emailPortUrl.send, sendParameter, function(response) {

            if (response.state == 'error') {
              console.log('邮箱不正确：' + response);
              return;
            }

            if (response.data == 'false') {
              console.log('失败');
            } else if (response.data == 'true') {
              flagP = true;
            }


          });

        } else if (response.data == "false") {
          email.next().children().eq(2).show();
        }

      }

    });

    //发送验证码成功，60s后重新发送
    function sendAgain() {
      var i = 60;
      $(".mobile-reg").hide();
      $(".pwd-send").html("发送成功！");
      sendTime = setInterval(function() {
        i--;
        $(".pwd-send").html(i + "秒后再次发送");
        if (i < 0) {
          clearInterval(sendTime);
          $gainCode.show();
          $gainEmail.show();
          i = 60;
          $(".pwd-send").html('');
          $('#emailRegTrue').html('');
        }
      }, 1000);
    }

  }

  return {
    init: init
  };
})();
