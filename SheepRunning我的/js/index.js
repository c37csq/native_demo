var obj = {
    speed: 7,
    frequency: 70,
    stage: document.getElementsByClassName('stage')[0],
    sheepWidth: 164,
    sheepHeight: 122,
    imgLeft: 0,
    imgTop: 0,
    timer: null
}
/**
 * 生产一只羊的构造函数
 */
function Sheep(data) {
    this.sheep = document.createElement('div')
    this.stage = data.stage;
    this.speed = data.speed;
    this.frequency = data.frequency;
    this.bottom = 0;
    this.right = -data.sheepWidth;
    this.imgLeft = data.imgLeft;
    this.imgTop = data.imgTop;
    this.sheepWidth = data.sheepWidth;
    this.sheepHeight = data.sheepHeight;
    this.timer = data.timer;
    this.sheep.className = 'sheep';
    this.sheep.style.right = -this.sheepWidth + 'px';
}
//添加run方法到原型
Sheep.prototype.run = function () {
    var that = this;
    that.timer = setInterval(function () {
        that.sheep.style.backgroundPosition = -that.sheepWidth * that.imgLeft + 'px ' + that.imgTop * that.sheepHeight + 'px'
        that.imgLeft += 1;
        if (that.imgLeft == 8) {
            that.imgLeft = 0
        }
        that.sheep.style.left = that.sheep.offsetLeft - that.speed + 'px';
        if (that.sheep.style.left.split('px')[0] < -that.sheepWidth) {
            that.stage.removeChild(that.sheep);
        }
    }, this.frequency)
}
//添加暂停方法
Sheep.prototype.stop = function () {
    clearInterval(this.timer);
    this.speed = 0;
    var that = this;
    that.timer = setInterval(function () {
        that.sheep.style.backgroundPosition = -that.sheepWidth * that.imgLeft + 'px ' + -that.sheepHeight + 'px';
        that.imgLeft += 1;
        if (that.imgLeft == 8) {
            that.imgLeft = 0;
        }

    }, this.frequency)
}
//绑定拖拽事件
Sheep.prototype.bindEvent = function () {
    var that = this;
    this.sheep.onmousedown = function (e) {
        that.stop();
        var x = e.pageX;
        var y = e.pageY;
        that.stage.onmousemove = function (e) {
            var disX = e.pageX - x;
            var disY = e.pageY - y;
            that.sheep.style.left = disX + that.sheep.offsetLeft + 'px';
            that.sheep.style.top = disY + that.sheep.offsetTop + 'px';
            x = e.pageX;
            y = e.pageY;
        }
        that.stage.onmouseup = function (e) {
            that.stage.onmousemove = null;
            clearInterval(that.timer);
            that.run();
            that.speed = obj.speed;
        }
    }
}
var timer1 = setInterval(function () {
    var sheepNum = document.querySelectorAll('.stage .sheep').length;
    if (sheepNum < 8) {
        var item = new Sheep(obj);
        item.frequency = getRandom(30, 100);
        obj.stage.appendChild(item.sheep);
        item.run();
        item.bindEvent();
    }
}, 1500)
/**
 * 传入一个最大值和一个最小值随机取，最大值取不到
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}