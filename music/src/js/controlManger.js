//管理index索引
(function ($, root) {
  function controlManger(length) {
    this.index = 0;
    this.length = length;
  }
  controlManger.prototype = {
    //下一首
    next: function () {
      return this.getIndex(1);
    },
    //上一首
    prev: function () {
      return this.getIndex(-1);
    },
    getIndex: function (val) {
      var index = this.index;
      var len = this.length;
      var curIndex = (index + val + len) % len; //处理边界值问题的算法
      this.index = curIndex;
      return curIndex;
    }



  }
  root.controlManger = controlManger;
}(window.Zepto, window.player || (window.player = {})))