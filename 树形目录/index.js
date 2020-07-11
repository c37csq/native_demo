//设置一种数据结构，用于表示树形目录中的数据
/**
 * 每个菜单的对象结构
 * {
 *      title: "菜单标题",
 *      children: [] 菜单的子菜单, 如果没有子菜单，该属性可省略
 *      ...其他属性
 * }
 */
var datas = [
    {
        title: "HTML CSS",
        children: [
            {
                title: "1.概述",
                children: [
                    {
                        title: "1. HTML CSS简介"
                    },
                    {
                        title: "2. 开发环境的搭建"
                    },
                    {
                        title: "3. 第一个HTML页面"
                    }
                ]
            },
            {
                title: "2. HTML基础",
                children: [
                    {
                        title: "1. 什么是HTML"
                    },
                    {
                        title: "2. HTML中的术语"
                    },
                    {
                        title: "3. 常用元素"
                    },
                ]
            }
        ]
    },
    {
        title: "JavaScript",
        children: [
            { title: "测试" }
        ]
    }
]



/**
 * 根据传入的菜单对象，创建对应的DOM元素
 * @param {*} menuObj 
 * @param {*} domContainer dom的容器
 */
function createMenu(menuObj, domContainer) {
    var menuDom = document.createElement("div");
    menuDom.className = "menu"; //类样式
    var hasChildren = true; //是否有子菜单
    if (!menuObj.children || menuObj.length === 0) {
        //没有children属性，或，children的长度为0
        hasChildren = false;
    }
    menuDom.innerHTML = `<div class="head">
                            ${hasChildren ? `<div class="icon"></div>` : ""}
                            <div class="title">${menuObj.title}</div>
                        </div>`;
    //子菜单的容器
    var childrenContainer = document.createElement("div");
    childrenContainer.className = "children"
    menuDom.appendChild(childrenContainer);
    domContainer.appendChild(menuDom); //加入到容器
    if (hasChildren) {
        //添加子菜单
        for (var i = 0; i < menuObj.children.length; i++) {
            var child = menuObj.children[i];
            createMenu(child, childrenContainer);
        }
    }

    menuDom.onclick = function (e) {
        e.stopPropagation(); //阻止事件冒泡
        if (e.target.className === "icon") {
            //如果有类样式expand，则移除，否则，添加
            menuDom.classList.toggle("expand");
            // if (menuDom.classList.contains("expand")) {
            //     //包含了expand
            //     menuDom.classList.remove("expand");
            // }
            // else{
            //     menuDom.classList.add("expand");
            // }
        }
    }
}

/**
 * 初始化整个树形目录
 */
function initTree() {
    var divTree = document.querySelector(".tree");
    for (var i = 0; i < datas.length; i++) {
        var menuObj = datas[i];//拿到根菜单对象
        createMenu(menuObj, divTree);
    }
}

initTree();