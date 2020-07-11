//管理进度条功能
(function ($, root) {
  var $scope = $(document.body);
  var startTime;
  var curDuration;
  var frameId;
  var lastPercent = 0;
  //转化时间
  function formatTime(time) {
    time = Math.round(time);
    var minute = Math.floor(time / 60);
    var second = time - minute * 60;
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }
  //渲染时间
  function render(duration) {
    lastPercent = 0;
    curDuration = duration;
    var allTime = formatTime(duration);
    $scope.find(".all-time").text(allTime);
  }
  //渲染滚动条
  function setProcess(percent) {
    var percent = (percent - 1) * 100 + '%';
    $scope.find('.pro-top').css({
      "transform": "translateX(" + percent + ")"
    })
  }
  //渲染数据
  function upData(percent) {
    var curTime = formatTime(percent * curDuration);
    $scope.find('.cur-time').text(curTime);
    setProcess(percent);
  }
  //渲染当前时间和进度条

  // 获取当前时间
  function start(percent) {
    if (percent === undefined) {
      lastPercent = lastPercent;
    } else {
      lastPercent = percent;
    }
    cancelAnimationFrame(frameId);
    startTime = new Date().getTime();

    function frame() {
      var curTime = new Date().getTime();
      var percent = lastPercent + (curTime - startTime) / (curDuration * 1000);
      if (percent < 1) {
        upData(percent)
        frameId = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(frameId);
      }
    }
    frame();
  }
  //结束动画
  function stop() {
    var curTime = new Date().getTime();
    lastPercent = lastPercent + (curTime - startTime) / (curDuration * 1000);
    cancelAnimationFrame(frameId);
  }
  root.process = {
    render: render,
    start: start,
    stop: stop,
    upData: upData
  }
}(window.Zepto, window.player || (window.player = {})))