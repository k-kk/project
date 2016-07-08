var webApi = (function(window, undefined) {

  "use strict";

  /**
   * [loadImages 图片预加载]
   * @param  {[type]}   sources  [图片数组]
   * @param  {Function} callback [成功后回调函数]
   */
  function loadImages(sources, callback) {
    var count = 0,
      images = {},
      imgNum = 0;
    for (var i in sources) {
      images[i] = new Image();
      imgNum++;
    }
    for (var src in sources) {
      images[src].onload = function() {
        if (++count >= imgNum) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  /**
   * [bind description]
   * @param  {[type]}   obj      [对象]
   * @param  {[type]}   event    [绑定事件类型]
   * @param  {Function} callback [回调函数]
   */
  function bind(obj, event, callback) {
    obj.addEventListener(event, callback, false);
  }

  /**
   * [translateStr CSS效果]
   * @param  {[type]} obj [对象]
   * @param  {[type]} str [字符串]
   */
  function transformStr(obj, str) {
    obj.style.WebkitTransform = str;
    obj.style.transform = str;
  }

  /**
   * [transformStr CSS过度时间]
   * @param  {[type]} obj [对象]
   * @param  {[type]} str [字符串]
   */
  function transitionStr(obj, str) {
    obj.style.WebkitTransition = str;
    obj.style.transition = str;
  }

  /**
   * [transitionStr CSS延迟]
   * @param  {[type]} obj [description]
   * @param  {[type]} str [description]
   */
  function transitionDelay(obj, str) {
    obj.style.WebkitTransitionDelay = str;
    obj.style.transitionDelay = str;
  }

  return {
    bind: bind,
    transformStr: transformStr,
    loadImages: loadImages,
    transitionStr: transitionStr,
    transitionDelay: transitionDelay
  };


})(window, undefined);
