(function () {
    var songs = [{
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
        {
            name: "广东爱情故事",
            author: "广东雨神",
            url: "music/1.mp3"
        },
        {
            name: "被风吹过的夏天",
            author: "林俊杰",
            url: "music/2.mp3"
        },
        {
            name: "牵丝戏",
            author: "银临/Aki阿杰",
            url: "music/3.mp3"
        },
        {
            name: "沙漠骆驼",
            author: "展展与罗罗",
            url: "music/4.mp3"
        },
    ];
    var listDom = document.querySelector(".music .list");
    var titleDom = document.querySelector(".title span");
    var audDom = document.querySelector("audio");
    var playIndex = -1; //播放的歌曲的数组下标，-1表示不播放任何歌曲
    /**
     * 初始化歌曲列表
     */
    function initSongList() {
        for (var i = 0; i < songs.length; i++) {
            var li = document.createElement("li");
            var s = songs[i]; //获取当前歌曲
            li.innerHTML = `
                <span class="name">${s.name} - ${s.author}</span>
                <span class="play"></span>
                <span class="close"></span>
            `;
            listDom.appendChild(li);
        }
        barHelper.init();
    }

    /**
     * 根据playIndex，播放一首歌
     */
    function play() {
        var beforeLi = listDom.querySelector(".playing");
        if (beforeLi) {
            //去掉之前li的playing样式
            beforeLi.classList.remove("playing");
        }
        if (playIndex === -1) {
            audDom.src = ""; //清空src
            titleDom.innerHTML = ""; //清空标题
            return;
        }
        var s = songs[playIndex]; //拿到歌曲对象
        audDom.src = s.url; //设置播放地址
        titleDom.innerHTML = `${s.name} - ${s.author}`; //设置标题
        audDom.play(); //调用play方法直接播放
        //为对应的li加上类样式
        listDom.children[playIndex].classList.add("playing");
    }

    initSongList();

    listDom.onclick = function (e) {
        if (e.target.className === "play") {
            //切换歌曲
            //得到元素在父元素中的下标
            //将类数组转换为真数组
            var children = Array.from(listDom.children)
            playIndex = children.indexOf(e.target.parentElement)
            play();
        } else if (e.target.className === "close") {
            //移除歌曲
            var children = Array.from(listDom.children)
            var index = children.indexOf(e.target.parentElement)
            songs.splice(index, 1); //歌曲数组中移除
            e.target.parentElement.remove(); //元素移除
            if (index === playIndex) {
                playIndex = -1;
                play();
            }
            barHelper.init();
        }
    }

    //播放进度改变事件
    audDom.ontimeupdate = function () {
        //audDom.currentTime：当前播放时间
        //audDom.duration：总时间
        if (audDom.currentTime >= audDom.duration) {
            //播放结束
            playIndex++;
            if (playIndex > songs.length - 1) {
                playIndex = 0;
            }
            play();
        }
    }
})();