var obj = {
    // 初始化入口函数
    init: function () {
        this.nowIndex = 0;
        this.len = document.getElementsByTagName('img').length;
        this.timer = null;
        // 绑定事件
        this.bindEvent();
        // 自动轮播
        this.sliderAuto();
    },
    bindEvent: function () {
        // 按钮绑定事件
        var left = document.getElementsByClassName('left')[0];
        var right = document.getElementsByClassName('right')[0];
        var wrapper = document.getElementsByClassName('wrapper')[0];
        var self = this;
        left.onclick = function () {
            self.move('left');
        };
        right.onclick = function () {
            self.move('right');
        };
        // 点击小圆点
        var circle = document.getElementsByClassName('circle');
        var len = circle.length;
        for (var i = 0; i < len; i++) {
            circle[i].setAttribute('data-index', i);
            circle[i].onclick = function () {
                var index = this.getAttribute('data-index');
                self.move(index);
            }
        }
        wrapper.onmouseenter = function () {
            clearTimeout(self.timer);
        };
        wrapper.onmouseleave = function () {
            self.sliderAuto();
        }
    },
    sliderAuto: function () {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self.move('right');
        }, 2000);
    },
    // 移动函数
    move: function (dir) {
        // 判断左右按钮
        if (dir == 'right' || dir == 'left') {
            // 方向是右  
            if (dir == 'right') {
                // 索引++  向后轮播
                this.nowIndex++;
                // 判断当前索引值   超出边界为0
                this.nowIndex = this.nowIndex > this.len - 1 ? 0 : this.nowIndex;
                // 向右切换一张  再次触发延迟向右展示下一张
                this.sliderAuto();
            } else {
                // 向前轮播
                this.nowIndex--;
                // 判断索引边界
                this.nowIndex = this.nowIndex < 0 ? this.len - 1 : this.nowIndex;
            }
        } else {
            // 如果是点击li小圆点  直接切换当前选中索引
            this.nowIndex = dir;
        }
        // 改变完索引后 移动ul
        var ulBox = document.getElementsByClassName('picBox')[0];
        ulBox.style.left = -this.nowIndex * 700 + 'px';
        // 每一张图片淡入淡出效果改变opacity
        var box = document.getElementsByClassName('box');
        box[this.nowIndex].style.opacity = 1;
        for (var i = 0; i < box.length; i++) {
            if (i != this.nowIndex) {
                box[i].style.opacity = 0;
            }
        }
        this.changeStyle();
    },
    changeStyle: function () {
        var active = document.getElementsByClassName('active')[0];
        var circle = document.getElementsByClassName('circle');
        active.classList.remove('active');
        circle[this.nowIndex].classList.add('active');
    }
};
obj.init();