(function () {
    var container = document.querySelector('.container'),
        content = document.querySelector('.content'),
        duration = document.querySelector('.duration'),
        bar = document.querySelector('.bar');
    var barHeight = container.offsetHeight / content.offsetHeight * duration.offsetHeight;
    if(content.offsetHeight < container.offsetHeight) {
        barHeight = 0;
    }
    bar.style.height = barHeight + 'px';
    /**
     * 鼠标拖拽事件
     * @param {*} item 
     */
    function scrollDrag(item) {
       item.onmousedown = function (e) {
           var e = e || window.event;
           e.preventDefault();
           var y = e.pageY;
           document.onmousemove = function (e){
               var disY = e.pageY - y;
               item.style.top = item.offsetTop + disY + 'px';
               y = e.pageY;
               if(item.offsetTop <= 0) {
                   item.style.top = 0 + 'px';
               }
               if(item.offsetTop + item.offsetHeight > duration.offsetHeight){
                   item.style.top = duration.offsetHeight -item.offsetHeight + 'px';
               }
               contentMove(item);
           }
           document.onmouseup = function (e) {
                document.onmousemove = null;
           }
       }
    }
    scrollDrag(bar)
/**
 * 滚动条俩边按钮的点击事件
 * @param {} item 
 */
    function scrollBtn(item){
      var scroll = document.getElementsByClassName('scroll')[0];
      scroll.onclick = function (e) {
          var speed = 5;
          if(e.target.id == 'up') {
              item.style.top = item.offsetTop - speed + 'px'
          }
          if(item.offsetTop <=0) {
              item.style.top = 0 + 'px';
          }
       else if(e.target.id == 'down') {
          item.style.top = item.offsetTop + speed + 'px';
      if(item.offsetTop + item.offsetHeight > duration.offsetHeight) {
          item.style.top = duration.offsetHeight - item.offsetHeight + 'px';
      }
    }
       contentMove(item);
    }
}
scrollBtn(bar)
/**
 * 鼠标滚轮事件
 * @param {}} item 
 * @param {*} content 
 */
       function scrollWheel(item,content) {
           var speed = 8;
           content.onmousewheel = function (e) {
               if(e.wheelDelta > 0) {
                   item.style.top = item.offsetTop - speed + 'px';
                   if(item.offsetTop <= 0) {
                       item.style.top = 0 + 'px';
                   }
               } else {
                   item.style.top = item.offsetTop + speed + 'px';
                   if(item.offsetTop + item.offsetHeight > duration.offsetHeight) {
                       item.style.top = duration.offsetHeight -item.offsetHeight + 'px';
                   }
               }
               contentMove(item);
           }
       }
       scrollWheel(bar,content)
    /**
     * 根据滚动条高度设置内容移动的距离
     * @param {*} item 
     */
    function contentMove(item){
        var contentMove = (content.offsetHeight - container.offsetHeight) * item.offsetTop / (duration.offsetHeight - item.offsetHeight);
        content.style.top = -contentMove + 'px';
    }
})()