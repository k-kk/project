var webApi = (function() {


	/**
	 * [postV1 description]
	 * @param  {[type]}   url      [请求的接口地址]
	 * @param  {[type]}   paramete [json参数]
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [回调，状态码，请求信息]
	 */
	function postV1(url, paramete, callback) {

		$.ajax({
			url: url,
			type: "POST",
			data: paramete,
			success: function(response, status, xhr) {
				callback(response, status, xhr);
			},
			error: function(response, status, xhr) {
				callback(response, status, xhr);
			}
		});
	}

	/**
	 * [getV1 description]
	 * @param  {[type]}   url      [请求的接口地址]
	 * @param  {[type]}   paramete [json参数]
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [回调，状态码，请求信息]
	 */
	function getV1(url, paramete, callback) {

		$.ajax({
			url: url,
			type: "GET",
			data: paramete,
			success: function(response, status, xhr) {
				callback(response, status, xhr);
			},
			error: function(response, status, xhr) {
				callback(response, status, xhr);
			}
		});

	}

	/**
	 * [postV2 description]
	 * @param  {[type]}   url      [请求的接口地址]
	 * @param  {[type]}   paramete [json参数]
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [回调，状态码，请求信息]
	 */
	function postV2(url, paramete, callback) {

		$.ajax({
			url: url,
			type: "POST",
			xhrFields: {
				withCrentials: true,
			},
			corssDomain: true,
			data: paramete,
			success: function(response, status, xhr) {
				callback(response, status, xhr);
			},
			error: function(response, status, xhr) {
				callback(response, status, xhr);
			}
		});
	}


	/**
	 * [setCookie description]
	 * @param {[type]} name  [名称]
	 * @param {[type]} value [内容]
	 * @param {[type]} time  [过期时间]
	 * @param {[type]} off   [是否是单值]
	 */
	function setCookie(name, value, time, off) {
		var strsec = getsec(time || 'h6');
		var exp = new Date();
		var cookieStr = '';
		exp.setTime(exp.getTime() + strsec * 1);

		if (off) {
			cookieStr = name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/;";
		} else {
			cookieStr = name + "=" + escape(JSON.stringify(value)) + ";expires=" + exp.toGMTString() + ";path=/;";
		}

		document.cookie = cookieStr;

		//这是有设定过期时间的使用示例：
		//s20是代表20秒
		//h是指小时，如12小时则是：h12
		//d是天数，30天则：d30
		function getsec(str) {
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == "s") {
				return str1 * 1000;
			} else if (str2 == "h") {
				return str1 * 60 * 60 * 1000;
			} else if (str2 == "d") {
				return str1 * 24 * 60 * 60 * 1000;
			}
		}

	}



	/**
	 * [getCookie description]
	 * @param {[type]} name   [要获取的key值]
	 */
	function getCookie(name) {

		var cookieArr = document.cookie.split('; ');
		var data = '';
		var i, index = -1;

		for (i = 0; i < cookieArr.length; i++) {

			if (cookieArr[i].indexOf(name) != -1) {
				index = i;
				break;
			}

		}

		if (index == -1) {
			return {};
		} else {
			data = cookieArr[index];
			data = data.substring(data.indexOf(name + '=') + (name.length + 1));

			if(unescape(data).indexOf('}') != -1 && unescape(data).indexOf('{') != -1){
				return JSON.parse(unescape(data));
			}else{
				return unescape(data);
			}

		}

	}

	/**
	 * [delCookie description]
	 * @param  {[type]} name [要删除的key值]
	 */
	function delCookie(name) {

		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null) {
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}

	}

	/**
	 * [getToken description]
	 * @param  {[type]}   url      [url地址-选填]
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [description]
	 */
	function getToken(vUrl, callback) {

		var url = vUrl || "/api/v2.1/getToken";
		var paramete = {
			"appType": "iPhone",
			"appId": "iPhoneCourse",
			"appKey": "8f81bf2e06c0f32df06ba7a04cf4bbb7"
		};

		getV1(url, paramete, function(response, status, xhr) {
			callback({
				state: response.state,
				status: status,
				msg: response.msg,
				token: response.data.token,
				original: response,
				xhr: xhr
			});
		});

	}

	return {
		postV1: postV1,
		getV1: getV1,
		postV2: postV2,
		setCookie: setCookie,
		getCookie: getCookie,
		delCookie: delCookie,
		getToken: getToken
	};
})();
