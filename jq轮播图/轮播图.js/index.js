var nowIndex = 0,
     width = $('.wrapper').width(),
     len = $('.item').length,
     time = null,
     flag = true;
function init() {
     bindEvent();
     slider();
}
function bindEvent() {
     $('.left-btn').add($('.right-btn')).add($('.item')).on('click', function () {
          if ($(this).attr('class') == 'left-btn') {
               move('left');
          } else if ($(this).attr('class') == 'right-btn') {
               move('right');
          } else {
               var index = $(this).index();
               move(index);
          }
          changeStyle(nowIndex);
     })
     $('.wrapper').on('mouseover', function () {
          $('.right-btn').add($('.left-btn')).css({
               display: 'block'
          })
          clearInterval(time);
     }).on('mouseleave', function () {
          $('.right-btn').add($('.left-btn')).css({
               display: 'none'
          })
          slider();
     })
}
function move(direction) {
     if (flag) {
          flag = false;
          if (direction == 'left' || direction == 'right') {
               if (direction == 'left') {
                    if (nowIndex == 0) {
                         $('.box').css({
                              left: -(width * len)
                         })
                         nowIndex = len - 1;
                    } else {
                         nowIndex = nowIndex - 1;
                    }
                    $('.box').animate({
                         left: -(width * nowIndex)
                    }, function () {
                         flag = true;
                    })
               } else {
                    if (nowIndex == 4) {
                         $('.box').animate({
                              left: -(width * len)
                         }, function () {
                              $('.box').css({
                                   left: 0
                              });
                              flag = true;
                         })
                         nowIndex = 0;
                    } else {
                         nowIndex = nowIndex + 1;
                         $('.box').animate({
                              left: -(width * nowIndex)
                         }, function () {
                              flag = true;
                         })
                    }
               }
          } else {
               nowIndex = direction;
               $('.box').animate({
                    left: -(width * nowIndex)
               }, function () {
                    flag = true;
               });
          }
     }
}

function changeStyle(index) {
     $('.active').removeClass('active');
     $('.item').eq(index).addClass('active');
}

function slider() {
     time = setInterval(function () {
          move('right');
          changeStyle(nowIndex);
     }, 2500)
}
init();