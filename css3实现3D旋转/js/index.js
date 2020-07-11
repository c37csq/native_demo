var oLi = Array.prototype.slice.call(document.getElementsByTagName('li'));

oLi.forEach(function (ele, index) {
  ele.size = getSize(ele);
  ele.addEventListener('mouseenter', function (e) {
    addClass(this, e, 'in');
  })
  ele.addEventListener('mouseleave', function (e) {
    addClass(this, e, 'out');
  })
})

function getSize(ele) {
  return {
    x: ele.offsetWidth,
    y: ele.offsetHeight
  }
}

function addClass(ele, e, state) {
  var x = e.offsetX - ele.size.x / 2;
  var y = e.offsetY - ele.size.y / 2;
  var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
  var direction;
  switch (d) {
    case 0:
      direction = 'top';
      break;

    case 1:
      direction = 'right';
      break;

    case 2:
      direction = 'bottom';
      break;

    case 3:
      direction = 'left';
  }
  ele.className = state + '-' + direction;
}