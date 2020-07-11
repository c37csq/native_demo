var obj = {
  length: document.getElementsByTagName("i").length,
  nowIndex: 0,
  list: document.getElementsByTagName("ul")[0],
  prev: document.getElementsByClassName("prev")[0],
  next: document.getElementsByClassName("next")[0],
  box: document.getElementsByClassName("box")[0],
  banner: document.getElementsByClassName("banner")[0],
  lock: true,
  timer: null,
  bindEvent: function () {
    var self = this;
    this.next.onclick = function () {
      if (self.lock) {
        self.move('left');
      }
    }
    this.prev.onclick = function () {
      if (self.lock) {
        self.move('right');
      }
    }
    this.banner.onmouseenter = function () {
      self.prev.style.display = "block";
      self.next.style.display = "block";
      clearInterval(self.timer);
    }
    this.banner.onmouseleave = function () {
      self.prev.style.display = "none";
      self.next.style.display = "none";
      self.sliderAuto();
    }
    for(let i = 0; i < this.box.children.length; i++) {
      var _this = this;
      if (_this.lock) {
        this.box.children[i].onclick = function () {
          _this.changeStyle(i);
          _this.move(i);
        }
      }
    }
  },
  move: function (dir) {
    if (this.lock) {
      this.lock = false;
      if (dir == 'left') {
        if (this.nowIndex == this.length - 1) {
          this.nowIndex = 0;
        } else {
          this.nowIndex++;
        }
      } else if (dir == 'right') {
        if (this.nowIndex == 0) {
          this.nowIndex = this.length - 1;
        } else {
          this.nowIndex --;
        }
      } else {
        this.nowIndex = dir;
      }
      this.list.style.left = - this.nowIndex * 700 + 'px';
      for(var i = 0; i < this.list.children.length; i++) {
        this.list.children[i].style.opacity = 0;
      }
      this.list.children[this.nowIndex].style.opacity = 1;
      this.changeStyle(this.nowIndex);
    }
    this.lock = true;
  },
  changeStyle: function (nowIndex) {
    for(var i = 0; i < this.box.children.length; i ++) {
      this.box.children[i].classList.remove("active");
      this.box.children[nowIndex].classList.add("active");
    }
  },
  sliderAuto: function () {
    var self = this;
    clearInterval(self.timer);
    self.timer = setInterval(() => {
      this.move('left');
    }, 2000)
  },
  init() {
    for(var i = 0; i < this.list.children.length; i++) {
      this.list.children[i].style.opacity = 0;
      this.list.children[0].style.opacity = 1;
    }
    this.bindEvent();
    this.sliderAuto();
  }
}
obj.init();