//canvas的dom对象
var canvasDom = document.getElementById("cvs");
var ctx = canvasDom.getContext("2d"); //获取上下文
var width = canvasDom.width;
var height = canvasDom.height;
var radius = 150; //表盘半径

//为了方便作画，需要平移坐标系
ctx.translate(width / 2, height / 2);

/**
 * 根据角度计算弧度
 * @param {*} angle 
 */
function getRadian(angle) {
    return angle * Math.PI / 180;
}

/**
 * 画外层表盘
 */
function drawCircle() {
    ctx.save();//保存现场
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, getRadian(360));
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 5;
    ctx.stroke();//描边画圆
    ctx.restore();//恢复现场
}

/**
 * 画刻度
 */
function drawMarks() {
    ctx.save();//保存之前的配置
    ctx.lineWidth = 6; //统一设置线条宽度
    ctx.strokeStyle = "#aaa"; //统一设置线条颜色
    for (var i = 0; i < 60; i++) {
        //绘制一个刻度
        ctx.save();
        ctx.beginPath();
        //旋转画布
        ctx.rotate(getRadian(6 * i)); //旋转
        ctx.moveTo(0, -radius + 10);
        if (i % 5 === 0) {
            ctx.lineTo(0, -radius + 30);
        }
        else {
            ctx.lineTo(0, -radius + 20);
        }
        ctx.lineCap = "round";//线段末端设置为圆形
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore(); //恢复到之前的配置
}

/**
 * 辅助画线的函数
 * lineWidth: 线的宽度
 * color: 线的颜色
 * length：线的长度
 * angle：画布的旋转角度
 */
function _drawLine(lineWidth, color, length, angle) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color; //设置颜色
    ctx.lineWidth = lineWidth; //设置线宽
    ctx.lineCap = "round"; //设置末端
    ctx.rotate(getRadian(angle));//旋转画布
    ctx.moveTo(0, 0.1 * length);
    ctx.lineTo(0, -0.9 * length);
    //阴影
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,.5)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.stroke();
    ctx.restore();
}

//画时针、分针、秒针
function drawLines() {
    var now = new Date();//当前时间
    //今天凌晨的时间
    var zero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    //今天凌晨到现在，经过的毫秒数
    var milis = now.getTime() - zero.getTime();
    //今天凌晨到现在，经过的秒数
    var seconds = Math.floor(milis / 1000);
    //画时针
    //经过的小时数
    var hAngle = seconds / 60 / 60 / 12 * 360;
    _drawLine(6, "#333", 70, hAngle);

    //画分针
    var mAngle = seconds / 60 / 60 * 360;
    _drawLine(5, "#888", 90, mAngle);

    //画秒针
    var sAngle = seconds / 60 * 360;
    _drawLine(3, "#f40", 100, sAngle);
}



/**
 * 画全部
 */
function draw() {
    //清空画布
    ctx.clearRect(-width / 2, -height / 2, width, height);
    //重新画
    drawCircle();
    drawMarks();
    drawLines();
}

draw();

setInterval(draw, 1000);