(function ($, root) {
  var listDom = document.querySelector(' .list-wrapper .list-content');
  var barDom = document.querySelector('.list-wrapper .scroll-bar');
  var listClientHeight = listDom.clientHeight;

  function setBarHeight() {
    // console.log(listDom);
    var scrollHeight = listDom.scrollHeight;
    // console.log(barDom);
    var h = listClientHeight / scrollHeight * listClientHeight;
    // console.log(h); //120
    // console.log(listClientHeight)
    if (h >= listClientHeight) {
      h = 0;
    }
    barDom.style.height = h + 'px';
  }

  function setBarTop() {
    var top = listDom.scrollTop / listDom.scrollHeight * listClientHeight;
    // console.log(listDom.scrollHeight); //195
    barDom.style.top = top + 'px';
  }


  var timer = null;

  function setListScrollTop(newScrollTop) {
    clearInterval(timer);
    var spd = 0.8;
    var dis = newScrollTop - listDom.scrollTop;
    var tick = 10;
    var duration = Math.abs(dis / spd);
    var times = Math.ceil(duration / tick);
    var curTimes = 0;
    var everyDis = dis / times;
    timer = setInterval(function () {
      curTimes++;
      listDom.scrollTop += everyDis;
      setBarTop();
      if (curTimes === times) {
        clearInterval(timer);
      }
    }, tick)
  }


  function setListScrollTopFromBarTop(top) {
    var sh = top / listClientHeight * listDom.scrollHeight;
    listDom.scrollTop = sh;
  }


  listDom.onmousewheel = function (e) {
    setListScrollTop(listDom.scrollTop + e.deltaY);
  }

  barDom.onmousedown = function (e) {
    var y = e.pageY;
    var top = parseFloat(getComputedStyle(this).top);
    var h = barDom.clientHeight;
    window.onmousemove = function (e) {
      var newY = e.pageY;
      var newTop = top + (newY - y);
      if (newTop < 0) {
        newTop = 0;
      } else if (newTop > listClientHeight - h) {
        newTop = listClientHeight - h;
      }
      barDom.style.top = newTop + 'px';
      setListScrollTopFromBarTop(newTop);

    }
    window.onmouseup = function () {
      window.onmousemove = null;
    }
  }
  root.setBar = function () {
    setBarHeight();
    setBarTop();
    // bindEvent();
  }
}(window.Zepto, window.player || (window.player = {})))