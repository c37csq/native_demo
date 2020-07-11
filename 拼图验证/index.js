var doms = {
    bar: document.querySelector(".slider .bar"),
    cvsHole: document.getElementById("cvsHole"),
    cvsCover: document.getElementById("cvsCover"),
    cvsShadow: document.getElementById("cvsShadow"),
    cvsContainer: document.querySelector("div.cvs"),
    img: document.querySelector(".sn-img img"),
    reload: document.querySelector(".reload")
}

var config = {
    errorRange: 5, //误差范围
    imgSize: {
        width: 200,
        height: 100
    },
    fragSize: {
        size: 35,
        circleRadius: 6
    },
    ctxHole: doms.cvsHole.getContext("2d"),
    ctxCover: doms.cvsCover.getContext("2d"),
    ctxShadow: doms.cvsShadow.getContext("2d")
}

config.totalDis = config.imgSize.width - config.fragSize.size;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawFragment(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    var nextX = x + (config.fragSize.size / 2 - config.fragSize.circleRadius);
    ctx.lineTo(nextX, y);
    nextX = nextX + config.fragSize.circleRadius;
    ctx.arc(nextX, y, config.fragSize.circleRadius, getRadian(180), 0);
    nextX = x + config.fragSize.size;
    ctx.lineTo(nextX, y);
    var nextY = y + (config.fragSize.size / 2 - config.fragSize.circleRadius);
    ctx.lineTo(nextX, nextY);
    nextY = nextY + config.fragSize.circleRadius;
    ctx.arc(nextX, nextY, config.fragSize.circleRadius, getRadian(-90), getRadian(90), true);
    nextY = y + config.fragSize.size;
    ctx.lineTo(nextX, nextY);
    ctx.lineTo(x, nextY);
    ctx.lineTo(x, y);
}

function clearContext(ctx) {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.width = ctx.canvas.width;
}

function getRadian(degree) {
    return degree * Math.PI / 180
}
// 图片预加载的兼容处理
function imgLoaded(callback) {
    if (doms.img.complete) {
        callback();
    } else {
        doms.img.onload = callback;
    }
}
var containerLeft;

function draw() {
    //图片随机
    var index = getRandom(1, 4);
    doms.img.src = `images/t${index}.png`;
    clearContext(config.ctxHole);
    var x = getRandom(config.fragSize.size + config.fragSize.size - config.fragSize.circleRadius, config.imgSize.width - config.fragSize.size - config.fragSize.circleRadius);
    var y = getRandom(config.fragSize.circleRadius, config.imgSize.height - config.fragSize.size);
    drawFragment(config.ctxHole, x, y);
    config.ctxHole.fillStyle = "#333";
    config.ctxHole.fill();

    clearContext(config.ctxCover);
    drawFragment(config.ctxCover, x, y);
    config.ctxCover.strokeStyle = "transparent";
    config.ctxCover.lineWidth = 0;
    config.ctxCover.stroke();
    config.ctxCover.clip();
    imgLoaded(function () {
        config.ctxCover.drawImage(doms.img, 0, 0, config.imgSize.width, config.imgSize.height);
    })

    clearContext(config.ctxShadow);
    drawFragment(config.ctxShadow, x, y);
    config.ctxShadow.shadowBlur = 10;
    config.ctxShadow.shadowColor = "#000";
    config.ctxShadow.fillStyle = "#000";
    config.ctxShadow.fill();

    //设置坐标
    doms.cvsContainer.style.left = -x + "px";

    containerLeft = -x;
}
draw();

doms.reload.onclick = draw;

doms.bar.onmousedown = function (e) {
    var x = e.pageX,
        left = 0;
    var width = this.parentElement.clientWidth;
    window.onmousemove = function (e) {
        var xDis = e.pageX - x,
            newLeft = left + xDis;
        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > width) {
            newLeft = width;
        }
        doms.bar.style.left = newLeft + "px";
        var containerNewLeft = newLeft / width * config.totalDis + containerLeft;

        doms.cvsContainer.style.left = containerNewLeft + "px";
    }

    window.onmouseup = function () {
        window.onmousemove = null;
        window.onmouseup = null;
        var left = parseFloat(doms.cvsContainer.style.left);
        left = Math.abs(left);
        if (left <= config.errorRange) {
            alert("验证通过");
            doms.bar.onmousedown = null;
            doms.reload.onclick = null;
        } else {
            alert("验证失败")
            doms.bar.style.left = 0;
            doms.cvsContainer.style.left = containerLeft + "px";
        }
    }
}