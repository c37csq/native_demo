var banner = document.querySelector(".banner");
var sliderList = document.querySelector(".banner ul");
var sliderPage = document.querySelectorAll(".banner ul li");
var sliderBox = document.querySelector(".banner .box");
var iBtns = document.querySelectorAll(".banner .box i");
var prevBtn = document.querySelector(".banner .prev");
var nextBtn = document.querySelector(".banner .next");
var currentIndex = 0;
var sliderTimer = null;
var lock = true;
const SLIDER_WIDTH = sliderPage[0].offsetWidth;
const LENGTH = sliderBox.children.length;

//获取元素属性函数封装
function getStyle (obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];   //IE
  } else {
    return window.getComputedStyle(obj, false)[attr];  //firefox google opera safari
  }
}

//封装移动函数
function startMove (obj, data, callback) {
  clearInterval(obj.timer);
  var styleName;
  var curNum;
  var iSpeed;
  startTimer = obj.timer = setInterval(() => {
    var bStop = true;
    for (var attr in data) {
      if (attr === 'opacity') {
        styleName = attr;
        curNum = parseFloat(getStyle(obj, attr)) * 100;
      } else {
        curNum = parseInt(getStyle(obj, attr));
      }
      iSpeed = (data[attr] - curNum) / 8;
      if (iSpeed > 0) {
        iSpeed = Math.ceil(iSpeed);
      } else {
        iSpeed = Math.floor(iSpeed);
      }
      if (attr === 'opacity') {
        obj.style.opacity = (curNum + iSpeed) / 100;
      } else {
        obj.style[attr] = curNum + iSpeed + 'px';
      }
      if (Math.floor(Math.abs(data[attr] - curNum)) != 0) {
        bStop = false;
      }
    }
    if (bStop) {
      clearInterval(obj.timer);
      if (styleName === 'opacity') {
        obj.style.opacity = data[name] / 100;
      }
      callback();
    }
  }, 30);
}

//自动移动
function autoMove(direction) {
  if (lock) {
    lock = false;
    clearInterval(sliderTimer);
    if (direction === 'next' || !direction) {
      currentIndex ++;
      if (currentIndex === 5) {
        sliderList.style.left = '0px';
        currentIndex = 0;
      }
      changeStyle(currentIndex);
      startMove(sliderList, { left: sliderList.offsetLeft - SLIDER_WIDTH }, function () {
        sliderTimer = window.setInterval(autoMove, 1800);
        lock = true;
      });
    } else if (direction === 'prev') {
      if (sliderList.offsetLeft <= 0) {
        sliderList.style.left = - SLIDER_WIDTH * LENGTH + 'px';
        currentIndex = LENGTH;
      }
      currentIndex --;
      changeStyle(currentIndex);
      startMove(sliderList, { left: sliderList.offsetLeft + SLIDER_WIDTH }, function () {
        sliderTimer = window.setInterval(autoMove, 1800);
        lock = true;
      })
    }
  }
}
prevBtn.onclick = function () {
  autoMove("prev");
}
prevBtn.onselectstart = function() {
  return false;
}
nextBtn.onselectstart = function() {
  return false;
}
nextBtn.onclick = function () {
  autoMove("next");
}
function changeStyle (index) {
  for (var i = 0; i < iBtns.length; i ++) {
    iBtns[i].className = '';
  }
    if (iBtns[index]) {
      iBtns[index].className = 'active';
    }
}
for (var i = 0; i < iBtns.length; i ++) {
    iBtns[i].onclick = (function (sliderIndex) {
      return function () {
        clearInterval(sliderTimer);
        currentIndex = sliderIndex;
        changeStyle(currentIndex);
        startMove(sliderList, { left: - SLIDER_WIDTH * sliderIndex}, function () {
          sliderTimer = window.setInterval(autoMove, 1800);
          lock = true;
        });
      }
    })(i)
  }
sliderTimer = window.setInterval(autoMove, 1800);
