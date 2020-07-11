var config = {
    options: [{
            value: -1,
            text: "不限"
        },
        {
            value: 100,
            text: "100万"
        },
        {
            value: 200,
            text: "200万"
        },
        {
            value: 300,
            text: "300万"
        },
        {
            value: 400,
            text: "400万"
        },
        {
            value: 500,
            text: "500万"
        },
        {
            value: 600,
            text: "600万"
        },
        {
            value: 700,
            text: "700万"
        },
        {
            value: 800,
            text: "800万"
        }
    ],
    ulList: document.getElementsByClassName('select')[0],
    container: document.querySelector('.container'),
    liWidth: 80,
    containerWidth: 800,
    title: document.querySelector('.text p'),
    btn1: document.getElementsByTagName('button')[0],
    btn2: document.getElementsByTagName('button')[1]
}

config.ulWidth = config.options.length * config.liWidth;
config.maxLeft = config.containerWidth / 2;
config.minLeft = config.maxLeft - config.ulWidth + config.liWidth;
/**
 * 创建Li标签并插入到ul中
 */
function createLi() {
    config.ulList.style.width = config.ulWidth + 'px';
    for (var i = 0; i < config.options.length; i++) {
        var num = config.options[i];
        var li = document.createElement('li');
        li.style.width = config.liWidth + 'px';
        li.innerHTML = `<p data-value="${num.value}">${num.text}</p>`;
        config.ulList.appendChild(li);
    }
}


/**
 * 根据value设置ul margin-left
 * @param {} val 
 */
function setChoose(val) {
    val = val.toString();
    config.ulList.style.transition = '.5s';
    var children = Array.from(config.ulList.children);
    var index = children.findIndex(function (dom) {
        return dom.querySelector('p').dataset.value === val;
    })
    if (index === -1) return;
    var left = config.containerWidth / 2 - index * config.liWidth;

    config.ulList.style.marginLeft = left + 'px';
}

/**
 * 根据当前ul位置，计算选中的对象
 */
function getChoose() {
    var left = getComputedStyle(config.ulList).marginLeft;
    left = config.containerWidth / 2 - parseFloat(left);
    left = Math.abs(left);
    var index = left / config.liWidth;
    index = Math.round(index);
    return config.options[index];
}
/**
 * 绑定拖拽事件
 */

function bindDragEvent() {
    config.ulList.onmousedown = function (e) {
        config.ulList.style.transition = "";
        var x = e.pageX;
        var left = parseFloat(getComputedStyle(config.ulList).marginLeft);
        window.onmousemove = function (e) {
            var dis = e.pageX - x;
            var newLeft = left + dis;
            if (newLeft < config.minLeft) {
                newLeft = config.minLeft;
            } else if (newLeft > config.maxLeft) {
                newLeft = config.maxLeft;
            }
            config.ulList.style.marginLeft = newLeft + 'px';

        }
        window.onmouseup = function () {
            window.onmousemove = null;
            var op = getChoose();
            setChoose(op.value);
            setTitle(op);
        }
    }
}

function forbiddenSelect() {
    config.container.onselectstart = function () {
        return false;
    }
}

function setTitle(op) {
    config.title.innerText = `选中的文本:${op.text},选中的值:${op.value}`;
}
config.btn1.onclick = function () {
    setChoose(100);
    setTitle({
        value: 100,
        text: "100万"
    });
}
config.btn2.onclick = function () {
    setChoose(500);
    setTitle({
        value: 500,
        text: "500万"
    });
}


function init() {
    createLi();
    setChoose('-1');
    bindDragEvent();
    forbiddenSelect();
}
init();