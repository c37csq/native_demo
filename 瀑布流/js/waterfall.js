function createWaterFall(dom, urls, width) {
  var col;
  var gap;
  createImgDom();
  setImgPosition();
  var timer = null;
  window.onresize = function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      setImgPosition();
    }, 500);
  }


  //计算每个空隙的宽度
  function cal() {
    var containerWidth = parseInt(dom.clientWidth);
    col = Math.floor(containerWidth / width);
    var space = containerWidth - col * width;
    gap = space / (col + 1);
  }

  //创建图片对象，并插入到div中.
  function createImgDom() {
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      var img = document.createElement('img');
      img.src = url;
      img.style.width = width + 'px';
      img.style.position = "absolute";
      img.onload = function () {
        setImgPosition();
      }
      dom.appendChild(img);
    }
  }

  //给每张图片设置坐标.
  function setImgPosition() {
    cal();
    var colY = new Array(col);
    colY.fill(0);
    for (var i = 0; i < dom.children.length; i++) {
      var img = dom.children[i];
      var y = Math.min(...colY); //es6语法取数组中的最小值，从而计算y的坐标.
      var index = colY.indexOf(y); //计算第几列
      img.style.left = ((index + 1) * gap + index * width) + 'px';
      img.style.top = y + 'px';
      colY[index] += parseInt(img.height) + gap; //更新数组
    }
    var height = Math.max(...colY);
    dom.style.height = height + 'px';
  }



}