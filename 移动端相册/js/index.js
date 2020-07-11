var total = 10,
  liWidth = ($('ul').width() - 24) / 4,
  activeIndex,
  ratio = $(window).height() / $(window).width()
//生成li
function render() {
  var str = ''
  for (var i = 0; i < total; i++) {
    str +=
      '<li style="height:' +
      liWidth +
      'px"><img src="./images/' +
      i +
      '.jpg"></li>'
  }
  $(str).appendTo($('.wrapper')).animate({
    opacity: 1
  }, 500)
}
render()
$('ul').on('tap', 'li', function () {
  activeIndex = $(this).index()
  show(activeIndex)
  console.log(activeIndex)
})

function show(i) {
  $('.show')
    .html('')
    .show()
  var oImg = new Image()
  oImg.src = './images/' + (i - 1) + '.jpg'
  oImg.onload = function () {
    var h = this.height,
      w = this.width
    if (h / w > ratio) {
      $(this)
        .appendTo($('.show'))
        .css({
          height: '100%'
        }).animate({
          opacity: 1
        }, 500)
    } else {
      $(this)
        .appendTo($('.show'))
        .css({
          width: '100%'
        }).animate({
          opacity: 1
        }, 500)
    }
  }
}

$('.show')
  .on('tap', function () {
    $(this).hide()
  })
  .on('swipeLeft', function () {
    activeIndex = activeIndex >= total ? total : activeIndex + 1
    console.log(activeIndex)
    show(activeIndex)
  })

  .on('swipeRight', function () {
    activeIndex = activeIndex <= 1 ? 1 : activeIndex - 1
    console.log(activeIndex)
    show(activeIndex)
  })