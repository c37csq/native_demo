var banner = {
  prev: document.querySelector(".prev"),
  next: document.querySelector(".next"),
  li: document.querySelectorAll(".list li"),
  lock: true,
  nowIndex: 0,
  timer: null,
  bindEvent: function () {
    var _this = this;
      //下一张
      this.next.onclick = function () {
       if (_this.lock) {
         _this.lock = false;
         _this.nowIndex --;
         for(let i = 0; i < _this.li.length; i ++) {
           _this.li[i].style.transform = 'rotate3d(1, 0, 0, ' + (90 * _this.nowIndex) + 'deg)';
           _this.li[i].style.transitionDelay = (i * 0.2) + 's';
        }
        setTimeout(() => _this.lock = true, 1300);
      }
    }
    //上一张
    this.prev.onclick = function () {
      if (_this.lock) {
        _this.lock = false;
        _this.nowIndex ++;
        for(let i = 0; i < _this.li.length; i ++) {
          _this.li[i].style.transform = 'rotate3d(1, 0, 0, ' + (90 * _this.nowIndex) + 'deg)';
          _this.li[i].style.transitionDelay = (i * 0.2) + 's';
       }
       setTimeout(() => _this.lock = true, 1300);
     }
   }
 },
 sliderAuto: function () {
   clearInterval(this.timer);
   this.timer = setInterval(() => {
    if (this.lock) {
      this.lock = false;
      this.nowIndex --;
      for(let i = 0; i < this.li.length; i ++) {
        this.li[i].style.transform = 'rotate3d(1, 0, 0, ' + (90 * this.nowIndex) + 'deg)';
        this.li[i].style.transitionDelay = (i * 0.2) + 's';
     }
     setTimeout(() => this.lock = true, 1300);
    }
   }, 1800);
 },
 init: function () {
   this.bindEvent();
   this.sliderAuto();
 }
}
banner.init();
