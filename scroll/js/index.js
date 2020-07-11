

(function () {//功能模块

    var ele_container = document.getElementsByClassName('container')[0],
        ele_content = document.getElementsByClassName('content')[0],
        ele_duration = document.getElementsByClassName('duration')[0],
        ele_bar = document.getElementsByClassName('bar')[0];

    var persent = ele_container.offsetHeight / ele_content.offsetHeight;
    var barH = Math.floor(persent * ele_duration.offsetHeight);
    ele_bar.style.height = barH + 'px';


    init();
    function init() {
        scrollDrag(ele_bar);//滚动条拖拽事件
        scrollBtn(ele_bar);//鼠标点击滑动
        scrollWheel(ele_bar,ele_container);//滚轮事件


    }
    function scrollDrag(item) {
        item.onmousedown = function (e) {
            var e = e || window.event;
            e.preventDefault();
            var e_y = e.pageY //鼠标Y点 

            document.onmousemove = function (e) {
                var chay = e.pageY - e_y;
                item.style.top = item.offsetTop + chay + 'px';
                e_y = e.pageY;
                if(item.offsetTop<=0){ //判断上临界
                    item.style.top = 0 + 'px';
                }
                if(item.offsetTop + item.offsetHeight > ele_duration.offsetHeight){//判断下临界值
                    item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                }

                contentMove(item);


            }

            document.onmouseup = function (e) {
                document.onmousemove = null;


            }
        }




    }
    function scrollBtn(item){
        var scroll =  document.getElementsByClassName('scroll')[0];
        scroll.onclick =  function(e){
            var num = 5;
            console.log(e.target.id);
            if(e.target.id == 'up'){//点击上面 滑块往上走
                item.style.top = item.offsetTop - num + "px";
                if(item.offsetTop<=0){ //判断上临界
                    item.style.top = 0 + 'px';
                }


            }else if(e.target.id == 'down'){//点击下面 滑块往下走
                item.style.top = item.offsetTop + num + "px";
                if(item.offsetTop + item.offsetHeight > ele_duration.offsetHeight){//判断下临界值
                    item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                }
            }

            contentMove(item);
        }


    }
    function contentMove(item){
        //  滑块滑出去的部分 /  可滑动区域  =  比例   
            //  比例 * 可溢出部分  =  溢出高度  
            var persentH = item.offsetTop / (ele_duration.offsetHeight - item.offsetHeight);
            var contentMoveH = Math.floor(persentH *(ele_content.offsetHeight - ele_container.offsetHeight));
            ele_content.style.top = -contentMoveH + "px";

    }
    function scrollWheel(item,content){
        var num = 8;
        content.onmousewheel = function(e){
                // console.log(e);
                if(e.wheelDelta > 0 ){//滑块往上走
                    item.style.top = item.offsetTop - num + "px";
                    if(item.offsetTop<=0){ //判断上临界
                        item.style.top = 0 + 'px';
                    }
                }else{//滑块往下走
                    item.style.top = item.offsetTop + num + "px";
                    if(item.offsetTop + item.offsetHeight > ele_duration.offsetHeight){//判断下临界值
                        item.style.top = ele_duration.offsetHeight - item.offsetHeight + 'px';
                    }


                }
                contentMove(item);



        }



    }
})()