//装字母图片的容器
var letterContainer = document.querySelector(".letters");
var score = 0; //总分
var curLost = 0; //当前丢失的量
var maxLost = 10; //最大丢失的量
var divBoard = document.querySelector(".board"); //得到面板的div

/**
 * 得到最小值到最大值之间的随机数
 * @param {*} min 
 * @param {*} max 取不到最大值
 */
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 随机得到一个字母
 */
function getRandomLetter() {
    var letterCode = getRandom(65, 91); //根据A和Z的字符编码，得到一个随机编码
    //根据字符编码，得到一个字符串
    return String.fromCharCode(letterCode)
}

/**
 * Letter构造，通过该函数，可以创建一个字母对象
 */
function Letter() {
    this.top = -100; //纵坐标
    this.left = getRandom(0, letterContainer.clientWidth - 100);
    //随机字母
    this.letter = getRandomLetter();
    //速度随机
    this.speed = getRandom(50 + score / 10, 100 + score / 10); // 1秒钟移动的像素值，比方说，取值范围：50~100
    //创建dom对象
    this.img = document.createElement("img");
    this.img.src = `img/letter/${this.letter}.png`;
    this.img.className = "letter";
    letterContainer.appendChild(this.img);
    //设置图片坐标
    this.img.style.left = this.left + "px"; //横坐标只设置一次
    this.render(); //设置纵坐标
}

/**
 * 将该字母重新显示
 */
Letter.prototype.render = function () {
    //原型方法中的this指向调用该方法的对象
    this.img.style.top = this.top + "px";
}

/**
 * 告知该函数经过的时间（单位毫秒）
 * 该函数会根据自身的top值、速度、和经过的时间，重新计算出当前的top值，然后自行改变top值，重新显示
 */
Letter.prototype.move = function (duration) {
    var dis = this.speed * duration / 1000; //计算移动的距离
    this.top += dis;
    this.render();
}

/**
 * 杀死这个元素（将自己清除掉）
 */
Letter.prototype.kill = function () {
    this.img.remove(); //从dom中移除该元素
    var index = letterArray.indexOf(this)
    letterArray.splice(index, 1);
}


var letterArray = []; //用于保存产生的字母对象
var produceTimer; //用于记录生产字母计时器的id
/**
 * 该函数用于生产字母
 */
function produceLetter() {
    clearInterval(produceTimer);
    produceTimer = setInterval(function () {
        //产生一个字母，并将该字母，加入到一个数组
        letterArray.push(new Letter());
    }, 600);
}

var moveTimer; //用于记录移动计时器的id
/**
 * 移动所有的字母
 */
function move() {
    clearInterval(moveTimer);
    moveTimer = setInterval(function () {
        for (var i = 0; i < letterArray.length; i++) {
            //得到数组中的当前字母对象
            var ltr = letterArray[i];
            ltr.move(10);
            //判断该元素是否该自杀了
            if (ltr.top > letterContainer.clientHeight) {
                ltr.kill();
                i--;
                curLost++; //丢失了一个
                setBoard();
                if (curLost === maxLost) {
                    //游戏结束
                    gameOver();
                }
            }
        }
    }, 16)
}

function gameOver() {
    clearInterval(produceTimer);
    clearInterval(moveTimer);
    window.onkeypress = null;
    document.querySelector(".gameover").style.display = "block";
}

produceLetter();
move();
setBoard();

/**
 * 设置面板中的数据
 */
function setBoard() {
    divBoard.innerHTML = `
        <p>得分：${score}</p>
        <p>丢失：${curLost} / ${maxLost}</p>
    `;
}

//注册键盘事件
window.onkeypress = function (e) {
    var pressLetter = e.key.toUpperCase(); //得到按键字符串的大写格式
    for (var i = 0; i < letterArray.length; i++) {
        var ltr = letterArray[i];
        if (ltr.letter === pressLetter) {
            //按对了
            ltr.kill();
            score += 10;
            setBoard();
            return; //杀一个得了
        }
    }
}