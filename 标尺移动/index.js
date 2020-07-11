var config = {
    container: document.querySelector(".container"),
    optionWidth: 70, //每个选项的宽度
    title: document.getElementById("chooseResult"),
    options: [ //选项数据
        {
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
    ]
}
config.ul = config.container.querySelector("ul");
config.containerWidth = config.container.clientWidth;
config.ulWidth = config.options.length * config.optionWidth;
config.maxLeft = config.containerWidth / 2;
config.minLeft = config.maxLeft - config.ulWidth + config.optionWidth;

function forbiddenSelect() {
    config.container.onselectstart = function () {
        return false
    }
}

function createOptions() {
    config.ul.innerHTML = "";
    var frag = document.createDocumentFragment();
    config.ul.style.width = config.ulWidth + "px";
    for (const op of config.options) {
        var li = document.createElement("li");
        li.innerHTML = `<i data-value="${op.value}">${op.text}</i>`;
        li.style.width = config.optionWidth + "px";
        frag.appendChild(li);
    }
    config.ul.appendChild(frag);
}

function setChoose(value) {
    value = value.toString();
    config.ul.style.transition = ".5s";
    var children = Array.from(config.ul.children);
    var i = children.findIndex(dom => dom.querySelector("i").dataset.value === value)
    if (i === -1) return;
    //计算margin-left
    var left = config.containerWidth / 2 - i * config.optionWidth;
    config.ul.style.marginLeft = left + "px";
}

/**
 * 根据当前ul的位置，计算出选中的对象
 */
function getChoose() {
    //获取ul的marginLeft
    var left = getComputedStyle(config.ul).marginLeft;
    left = parseFloat(left) - config.containerWidth / 2;
    left = Math.abs(left);
    var i = left / config.optionWidth;
    i = Math.round(i)
    return config.options[i];
}

function regDragEvent(callback) {
    config.ul.onmousedown = function (e) {
        config.ul.style.transition = "";
        var x = e.pageX,
            left = parseFloat(getComputedStyle(this).marginLeft);
        window.onmousemove = function (e) {
            var dis = e.pageX - x;
            var newLeft = left + dis;
            if (newLeft < config.minLeft) {
                newLeft = config.minLeft;
            } else if (newLeft > config.maxLeft) {
                newLeft = config.maxLeft;
            }

            config.ul.style.marginLeft = newLeft + "px";
            callback && callback(getChoose());
        }

        window.onmouseup = function () {
            window.onmousemove = null;
            var op = getChoose();
            setChoose(op.value);
            callback && callback(op);
        }
    }
}

function setTitle(op) {
    config.title.innerText = `选中的文本：${op.text}，选中的值：${op.value}`;
}

function init() {
    forbiddenSelect();
    createOptions();
    setChoose("-1");
    setTitle(config.options[0]);
    regDragEvent(setTitle);
}

init();