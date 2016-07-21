var pwd = (function() {

  function init() {
    var $gainPhoneCode = $('#gainPhoneCode');
    var $phoneNext = $('#phoneNext');
    var $newPassWord = $('#newPassWord');
    var $caicui = $('#caicui');
    var portRequestUrl = {
      verifyExist: caicui.userLoginUrl + '/api/wd/v3/member/checkexist',
      gainPhoneCode: caicui.userLoginUrl + '/api/v2.1/msg/code',
      tokenUrl: caicui.userLoginUrl + '/api/v2.1/getToken',
      getCodeEmail: caicui.userLoginUrl + '/api/v3/member/getCodeByEmail'
    };
    var sendToken;

    var sendTime = 0,
      i = 60,
      img = $(".phone-img img"),
      token = getToken(' ', portRequestUrl.tokenUrl);
    //input变量定义
    var phone = $gainPhoneCode.next();
    oImg = $(".pwd-img input");
    var validate = "";
    //切换手机或邮箱方式找回密码
    $(".pwd-nav a").on("click", function() {
      var oIndex = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(".pwd-div").removeClass("active").eq(oIndex).addClass("active");
      $(".error-prom").hide();
      $("input").val("");
    });

    //input获得焦点和失去焦点时是否为空验证
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
    //手机号和邮箱验证
    function checkMobile(phone) {
      var phoneNum = $.trim(phone.val());
      if (!phoneNum) {
        phone.next().children().eq(0).show();
      } else {
        phone.next().children().eq(0).hide();
        var regp = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/,
          rege = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if ($(".pwd-div").eq(0).hasClass("active")) {
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
    //验证码验证
    function checkVal(validate) {
      if (!validate.val()) {
        validate.next().children().eq(0).show();
      } else {
        validate.next().children().eq(0).hide();
        return true;
      }
    }
    //改变图片
    $(".phone-img a,.phone-img img").on("click", function() {
      $(".phone-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
    });

    $(".email-img a,.email-img img").on("click", function() {
      $(".email-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
    });

    // 点击发送手机验证码
    $gainPhoneCode.on('click', function() {

      phone = $gainPhoneCode.next();

      var verifyParameter = {
        "checkname": $.trim(phone.val()),
        "checktype": "1"
      };
      var sendCodeParameter;

      if (checkMobile(phone)) { // 为真调用
        webApi.getV1(portRequestUrl.verifyExist, verifyParameter, verifyPhone);
      }

      // 检验手机号是否已注册本网站
      function verifyPhone(response) {

        if (response.data == 'true') {
          sendPhoneCode();

        } else {
          console.log(response.msg);
          phone.next().children().eq(2).show();
        }

      }

      // 发送验证码
      function sendPhoneCode() {

        sendCodeParameter = {
          type: "send",
          phone: $.trim(phone.val()),
          j_captcha: $.trim($(".pwd-img input").val()),
          token: $.trim(getToken('', portRequestUrl.tokenUrl))
        };

        $(".phone-reg").hide();
        $(".pwd-send").html("正在发送验证码...");
        phone.next().children().eq(2).hide();

        webApi.postV1(portRequestUrl.gainPhoneCode, sendCodeParameter, function(response) {

          if (response.msg == '3') {
            $(".phone-reg").show();
            $(".pwd-send").hide();
            $(".pwd-img").show();
            $(".phone-img img").attr("src", caicui.userLoginUrl + "/api/v2.1/captcha?timestamp=" + new Date().getTime());
          } else if (response.state == 'success') {
            sendAgain();
          } else {
            console.log(response.msg);
          }

        });
      }


    });


    // 点击手机下一步验证
    $phoneNext.on("click", function() {


      validate = $(this).parent().find(".val-emp");

      // 手机号和验证码正确后调用验证码验证接口
      if (checkMobile(phone) && checkVal(validate)) {
        $.ajax({
          url: portRequestUrl.gainPhoneCode,
          type: "POST",
          data: {
            type: "validate",
            phone: $.trim(phone.val()),
            code: $.trim(validate.val()),
            token: $.trim(getToken('', portRequestUrl.tokenUrl))
          },
          success: function(response) {

            // 验证码验证成功和失败
            if (response.msg == "false") {
              validate.next().children().eq(1).show();
            } else if (response.state == 'success') {

              validate.next().children().eq(1).hide();


              var saveData = {
                phonenumber: phone.val(),
                phoneVal: validate.val()
              };

              $caicui.hide();
              $newPassWord.show();
              webApi.setCookie('pwdVal', saveData, 'h6');
              resetPassword();

              //找回密码页面验证码验证成功，跳转到修改密码页面
              //window.location.href = '/page/password.jsp';
            }
          },
          error: function(data) {
            // console.log(data);
          }
        });
      }
    });

    //点击获取验证码获取邮箱验证码
    $(".email-reg").on("click", function() {

      phone = $(this).next();
      validate = $(this).parent().find(".val-email");

      if (checkMobile(phone)) {
        //邮箱格式正确，获取验证码
        $.ajax({
          url: portRequestUrl.verifyExist,
          type: "GET",
          contentType: "application/x-www-form-urlencoded; charset=utf-8",
          data: {
            "checkname": $.trim(phone.val()),
            "checktype": "2"
          },
          success: function(data) {

            if (data.data == "true") {
              $(".pwd-send").html("正在发送验证码...");
              $(".email-reg").hide();
              $.ajax({
                url: portRequestUrl.getCodeEmail,
                type: "GET",
                data: {
                  "type": "send-pwd",
                  "email": $.trim($(".emailnum").val())
                },
                success: function(data) {

                  if (data.state == "success") {
                    $(".pwd-send").html("发送成功！");
                    sendAgain();
                  } else if (data.state == "error") {
                    $(".email-reg").show();
                    $(".pwd-send").hide();
                  }
                  console.log(data);
                },
                error: function(data) {
                  // console.log(data);
                }
              });
            } else if (data.data == "false") {
              phone.next().children().eq(2).show();
            }
          },
          error: 　 function(data) {
            // console.log(data);
          }
        });

      }
    });

    //点击下一步验证邮箱和验证码
    $(".email-next").on("click", function() {
      if (checkMobile($(".emailnum")) && checkVal($(".val-email"))) {
        $.ajax({
          url: portRequestUrl.getCodeEmail,
          type: "GET",
          data: {
            "type": "validate",
            "email": $.trim($(".emailnum").val()),
            "code": $.trim($(".val-email").val())
          },
          success: function(data) {
            if (data.state == "success") {

              $(".val-email").next().children().eq(1).hide();

              var saveData = {
                phonenumber: phone.val(),
                phoneVal: validate.val()
              };

              $caicui.hide();
              $newPassWord.show();
              webApi.setCookie('pwdVal', saveData, 'h6');
              resetPassword();

              // 找回密码页面验证码验证成功，跳转到修改密码页面
              // window.location.href = "/page/password.jsp";

            } else if (data.state == "error") {
              $(".val-email").next().children().eq(1).show();
            }
            console.log(data);
          },
          error: function(data) {
            // console.log(data);
          }
        });
      }
    });


    //60s后再次发送
    function sendAgain() {

      sendTime = setInterval(function() {
        $(".email-reg").hide();
        $(".pwd-send").html(i + "s后再次发送");
        i--;
        if (i < 0) {
          clearInterval(sendTime);
          $(".email-reg").show();
          $('#gainPhoneCode').show();
          i = 60;
          $(".pwd-send").html('');
        }
      }, 1000);
    }

    // 重置密码
    function resetPassword() {

      var $resetPwdBtn = $('#resetPwdBtn');
      var seekPortUrl = {
        phone: caicui.userLoginUrl + '/api/v2.1/changePwdByPhone',
        email: caicui.userLoginUrl + '/api/v3/member/changePwdByEmail',
        tokenUrl: caicui.userLoginUrl + '/api/v2.1/getToken'
      };

      if (!webApi.getCookie('pwdVal')) {
        window.location.href = '/page/pwd.jsp';
        return;
      }

      //变量定义
      var phonePwd = $(".password-ipt input").eq(0);
      var phonePwd2 = $(".password-ipt input").eq(1);
      var reg = /^\d{9,16}$|^(?!\d+$)\w{8,16}$/;
      var pwdInfo = webApi.getCookie('pwdVal');
      var cookieKey = pwdInfo.phonenumber;
      var cookieVal = pwdInfo.phoneVal;

      //input获得或失去焦点时是否为空验证
      $("input").focus(function() {
        $(this).next().children().eq(0).hide();
      });
      $("input").blur(function() {
        if (!$(this).val()) {
          $(this).next().children().eq(0).show();
        } else {
          $(this).next().children().eq(0).hide();
        }
      });
      //点击确定时效果
      $(".password-btn a").on("click", function() {
        if (modifyPwd() && modifyPwd2()) {
          changePwdByPhone();
        }
      });
      //检验密码是否存在
      function modifyPwd() {
        if (!$.trim(phonePwd.val())) {
          $(".pwd-error .error-prom").eq(0).show();
        } else {
          $(".pwd-error .error-prom").eq(0).hide();
          if (reg.test(phonePwd.val())) {
            $(".pwd-error .error-prom").eq(1).hide();
            if (phonePwd2.val() && phonePwd.val() != phonePwd2.val()) {
              $(".pwd-conf-error .error-prom").eq(1).show();
            } else {
              $(".pwd-conf-error .error-prom").eq(1).hide();
              return true;
            }
          } else {
            $(".pwd-error .error-prom").eq(1).show();
          }
        }
      }
      //检验确认密码是否存在
      function modifyPwd2() {
        if (!$.trim(phonePwd2.val())) {
          $(".pwd-conf-error .error-prom").eq(0).show();
        } else {
          $(".pwd-conf-error .error-prom").eq(0).hide();
          return true;
        }
      }
      //调用手机号修改密码
      function changePwdByPhone() {

        var parameterPhone = {
          "token": getToken('', seekPortUrl.tokenUrl),
          "mobile": cookieKey,
          "code": cookieVal,
          "password": phonePwd.val()
        };

        var parameterEmail = {
          email: cookieKey,
          code: cookieVal,
          password: phonePwd.val()
        };


        if (cookieKey.indexOf('@') != -1) {
          emailReset(seekPortUrl.email, parameterEmail);
        } else {
          phoneReset(seekPortUrl.phone, parameterPhone);
        }

      }


      function phoneReset(url, parameter) {

        webApi.postV1(url, parameter, function(response) {
          callbackHandle(response);
        });

      }

      function emailReset(url, parameter) {

        webApi.postV1(url, parameter, function(response) {
          callbackHandle(response);
        });
      }

      function callbackHandle(response) {

        if (response.state == 'error') {
          resetError(response);
          return;
        }

        resetSuccess(response);

      }

      function resetError(response) {
        console.log(response.msg);
      }

      function resetSuccess(response) {

        var time = null;
        var i = 5;
        //成功后跳到登录页面
        if (response.state == "success") {
          $(".alert-mask").show();
          time = setInterval(function() {
            i--;
            if (i < 0) {
              clearInterval(time);
              $(".alert-mask").hide();
              i = 5;
              window.location.href = "/page/login.jsp";
            }
            $(".alert-return-min span").html(i);
          }, 1000);
          $(".alert-return a").on("click", function() {
            $(".alert-mask").hide();
            $(".alert-return-min span").html(5);
            clearInterval(time);
            window.location.href = "/page/login.jsp";
          });
        }

      }

    }

    seekPwd.init();
  }


  return {
    init: init
  };

})();


var seekPwd = (function() {


  function init() {
    var $resetPwdBtn = $('#resetPwdBtn');
    var seekPortUrl = {
      phone: caicui.userLoginUrl + '/api/v2.1/changePwdByPhone',
      email: caicui.userLoginUrl + '/api/v3/member/changePwdByEmail',
      tokenUrl: caicui.userLoginUrl + '/api/v2.1/getToken'
    };

    if (!webApi.getCookie('pwdVal')) {
      window.location.href = '/page/pwd.jsp';
      return;
    }

    //变量定义
    var phonePwd = $(".password-ipt input").eq(0);
    var phonePwd2 = $(".password-ipt input").eq(1);
    var reg = /^\d{9,16}$|^(?!\d+$)\w{8,16}$/;
    var pwdInfo = webApi.getCookie('pwdVal');
    var cookieKey = pwdInfo.phonenumber;
    var cookieVal = pwdInfo.phoneVal;

    //input获得或失去焦点时是否为空验证
    $("input").focus(function() {
      $(this).next().children().eq(0).hide();
    });
    $("input").blur(function() {
      if (!$(this).val()) {
        $(this).next().children().eq(0).show();
      } else {
        $(this).next().children().eq(0).hide();
      }
    });
    //点击确定时效果
    $(".password-btn a").on("click", function() {
      if (modifyPwd() && modifyPwd2()) {
        changePwdByPhone();
      }
    });
    //检验密码是否存在
    function modifyPwd() {
      if (!$.trim(phonePwd.val())) {
        $(".pwd-error .error-prom").eq(0).show();
      } else {
        $(".pwd-error .error-prom").eq(0).hide();
        if (reg.test(phonePwd.val())) {
          $(".pwd-error .error-prom").eq(1).hide();
          if (phonePwd2.val() && phonePwd.val() != phonePwd2.val()) {
            $(".pwd-conf-error .error-prom").eq(1).show();
          } else {
            $(".pwd-conf-error .error-prom").eq(1).hide();
            return true;
          }
        } else {
          $(".pwd-error .error-prom").eq(1).show();
        }
      }
    }
    //检验确认密码是否存在
    function modifyPwd2() {
      if (!$.trim(phonePwd2.val())) {
        $(".pwd-conf-error .error-prom").eq(0).show();
      } else {
        $(".pwd-conf-error .error-prom").eq(0).hide();
        return true;
      }
    }
    //调用手机号修改密码
    function changePwdByPhone() {

      var parameterPhone = {
        "token": getToken('', seekPortUrl.tokenUrl),
        "mobile": cookieKey,
        "code": cookieVal,
        "password": phonePwd.val()
      };

      var parameterEmail = {
        email: cookieKey,
        code: cookieVal,
        password: phonePwd.val()
      };


      if (cookieKey.indexOf('@') != -1) {
        emailReset(seekPortUrl.email, parameterEmail);
      } else {
        phoneReset(seekPortUrl.phone, parameterPhone);
      }

    }


    function phoneReset(url, parameter) {

      webApi.postV1(url, parameter, function(response) {
        callbackHandle(response);
      });

    }

    function emailReset(url, parameter) {

      webApi.postV1(url, parameter, function(response) {
        callbackHandle(response);
      });
    }

    function callbackHandle(response) {

      if (response.state == 'error') {
        resetError(response);
        return;
      }

      resetSuccess(response);

    }

    function resetError(response) {
      console.log(response.msg);
    }

    function resetSuccess(response) {

      var time = null;
      var i = 5;
      //成功后跳到登录页面
      if (response.state == "success") {
        $(".alert-mask").show();
        time = setInterval(function() {
          i--;
          if (i < 0) {
            clearInterval(time);
            $(".alert-mask").hide();
            i = 5;
            window.location.href = "/page/login.jsp";
          }
          $(".alert-return-min span").html(i);
        }, 1000);
        $(".alert-return a").on("click", function() {
          $(".alert-mask").hide();
          $(".alert-return-min span").html(5);
          clearInterval(time);
          window.location.href = "/page/login.jsp";
        });
      }

    }

  }


  return {
    init: init
  };

})();
