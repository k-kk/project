var caicui = {
  url: "http://apitest.caicui.com",
  userLoginUrl: '', // 登陆相关
  token: ""
};


// 中间页配置信息
var querySettings = {
  keyWord: '?pid=', // pid 为关键词 可替换 例如：aaa，? 和 = 需要提交
  loginSuccessTragetUrl: 'http://www.caicui.com/mc/cartItem/addU/', // 选课单
  commodityId: '', // js赋值，不需要手工填写（禁止修改）
  targetTime: 5, // 弹窗提示等待的倒数时间,
  registerTip: '你的操作已成功！',
  resetPwd: 'http://www.caicui.com/pwd/', // 修改密码页面
  error618Url: 'http://www.caicui.com/static/Special/20160618/', // 非贴吧用户或者或者url参数错误跳转的地址
  error618Text: '贴吧专享优惠对象只能是贴吧用户', // 非贴吧用户或者或者url参数错误提示文字
  buyUrl: 'http://www.caicui.com/static/Special/20160618/', // 用户购买过商品包跳转的url
  buyTipText: '您好，618嗨课节贴吧特惠活动进行中（618元/科），每个用户限购1科，如您科目选择有误，请在财萃网的户中心<a target="_blank" href="http://www.caicui.com/mc/order/list" style="color:#f00;">取消订单</a>，并在财萃网导航中找到<a target="_blank" href="http://www.caicui.com/mc/cartItem/list" style="color:#f00;">选课单</a>，清除选课单内容，再次进入贴吧点击正确科目的贴吧购课链接。', // 用户购买过商品包弹框提示文字
  tokenPastUrl: caicui.userLoginUrl + '/api/v2/member/get', // 查询token是否过期接口（禁止修改）
  getMemberGroups: caicui.url + '/api/v2.1/courseGroup/getMemberGroups', // 获取商品包列表接口（禁止修改）
  userLoginUrl: caicui.userLoginUrl + '/api/v2.1/login', // 用户登陆（禁止修改）
  allCommodityId: [ // 所有的商品包Id
    ['8a22ecb5554cfedf01554e625a50000c', 'F1', '嗨课包'],
    ['8a22ecb5554cfedf015551d045d20039', 'F2', '嗨课包'],
    ['8a22ecb5554cfedf015551d6805e003c', 'F3', '嗨课包'],
    ['8a22ecb5554cfedf015551d838e4003d', 'F4', '嗨课包'],
    ['8a22ecb5554cfedf015551dabd370041', 'F5', '嗨课包'],
    ['8a22ecb5554cfedf015551dd95980042', 'F6', '嗨课包'],
    ['8a22ecb5554cfedf015551e258530043', 'F7', '嗨课包'],
    ['8a22ecb5554cfedf015551e4a5e90044', 'F8', '嗨课包'],
    ['8a22ecb5554cfedf015551eddcdf0045', 'F9', '嗨课包'],
    ['8a22ecb5554cfedf015551f226d60046', 'P1', '嗨课包'],
    ['8a22ecb5554cfedf015551f35b360048', 'P2', '嗨课包'],
    ['8a22ecb5554cfedf015551f4321f0049', 'P3', '嗨课包'],
    ['8a22ecb5554cfedf015551f5f8c8004a', 'P4', '嗨课包'],
    ['8a22ecb5554cfedf015551f6c9c2004b', 'P5', '嗨课包'],
    ['8a22ecb5554cfedf015551f7ba79004c', 'P7', '嗨课包']
  ]
};

function countDown(targetUrl, tipText, isOff) {

  var countNum = querySettings.targetTime;
  var maxNax = querySettings.targetTime;
  var timer = null;

  $('#query').addClass('hide');
  $('#allTime').html(querySettings.targetTime);
  $('#errorAlert').removeClass('hide');
  $('#alertTipText').html(tipText);
  $('#alertTargetUrl').attr('href', targetUrl);

  if (!isOff) {
    $('#allTime').parent().addClass('hide');
    $('#alertTargetUrl').html('确认');
  }

  if (isOff) {
    timer = setInterval(function() {
      countNum--;
      $('#countdownNum').html(countNum);
      if (countNum <= 0) {
        clearInterval(timer);
        $('#errorAlert').addClass('hide');
        $('#countdownNum').html(maxNax);
        $('#alertMask').addClass('hide');
        window.location.href = targetUrl;
      }
    }, 1000);
  }

}

function deleteMc() {
  try {
    var url = caicui.userLoginUrl + "/mc/cartItem/deleteAll";

    $.getJSON(url, function() {
      // window.location.reload();
      console.log('delete');
    });
  } catch (e) {
    console.log(e);
  }
}

function getToken(callback, url) {

  var tokenUrl = caicui.url + "/api/v2.1/getToken";

  if (url) {
    tokenUrl = caicui.userLoginUrl + url;
  }

  $.ajax({
    url: tokenUrl,
    data: {
      "appType": "iPhone",
      "appId": "iPhoneCourse",
      "appKey": "8f81bf2e06c0f32df06ba7a04cf4bbb7"
    },
    async: false,
    error: function(data) {

      // 第一个参数函数时，增加回调
      if (Object.prototype.toString.apply(callback) === '[object Function]') {
        callback(data);
      }

    },
    success: function(data) {

      // 同上
      if (Object.prototype.toString.apply(callback) === '[object Function]') {
        callback(data);
      }

      caicui.token = data.data.token;
    }
  });
  return caicui.token;
}
