var root = window.player
var $ = window.Zepto
var $scope = $(document.body)
var songList
var controlmanger
var audiomanger = new root.audioManger()
var process = root.process;
var index = 0;
var bar = root.setBar;
$scope.on('play:change', function (e, index) {
  audiomanger.getAudio(songList[index].audio)
  audiomanger.audio.onended = function () {
    var index = controlmanger.next()
    $scope.trigger('play:change', [index])
    process.upData(0)
    process.start()
    process.render(songList[index].duration)
    root.render(songList[index])
  }
  if (audiomanger.status === 'play') {

    var i = index;
    $('.list-content li').removeClass('red');
    $('.list-content li').eq(index).addClass('red');
    audiomanger.play()
    process.start()
  }
  if (audiomanger.status === 'pause') {
    $('.list-content li').removeClass('red');
    $('.list-content li').eq(index).addClass('red');

  }
  process.render(songList[index].duration)
  root.render(songList[index])
})

$scope.on('click', '.prev-btn', function () {
  var index = controlmanger.prev()
  $scope.trigger('play:change', [index])
})
$scope.on('click', '.next-btn', function () {
  var index = controlmanger.next()
  $scope.trigger('play:change', [index])
})

$scope.on('click', '.play-btn', function () {
  if (audiomanger.status === 'play') {
    audiomanger.pause()
    process.stop()
  } else {
    process.start()
    audiomanger.play();
    // $('.list-content li').eq(0).addClass('red');
  }
  $scope.find('.play-btn').toggleClass('pause')
})
window.onload = function () {
  $scope.on('click', '.list-btn', function () {
    if ($scope.find('.list-wrapper').css("opacity") == '0') {
      $scope.find('.list-wrapper').addClass('active');
      // root.renderList(songList);
      // console.log(bar.setBarHeight)
      // console.log(333);
      bar();
    } else {
      $scope.find('.list-wrapper').removeClass('active');
    }
  })
}

// window.onload = function () {
//   $scope.addEventListener('onclick', '.list-btn', function () {
//       bar.setBarHeight();
//       bar.setBarTop();
//   })
// }

//绑定touch事件
function bindTouch() {
  var $sliderPoint = $scope.find('.slider-pointer')
  var offset = $scope.find('.pro-wrapper').offset()
  var left = offset.left
  var width = offset.width
  $sliderPoint
    .on('touchstart', function (e) {
      process.stop()
    })
    .on('touchmove', function (e) {
      var x = e.changedTouches[0].clientX
      var percent = (x - left) / width
      if (percent > 1 || percent < 0) {
        percent = 0
      }
      process.upData(percent)
    })
    .on('touchend', function (e) {
      var x = e.changedTouches[0].clientX
      var percent = (x - left) / width
      if (percent > 1 || percent < 0) {
        percent = 0
      }

      process.start(percent)
      var curDuration = songList[controlmanger.index].duration
      var duration = curDuration * percent
      audiomanger.jumpToPlay(duration)
      $scope.find('.play-btn').addClass('pause')
    })
}

function getData(url) {
  $.ajax({
    type: 'GET',
    url: url,
    success: successFn,
    error: function () {
      console.log('error')
    }
  })
}

function successFn(data) {
  bindTouch()
  console.log(data)
  controlmanger = new root.controlManger(data.length)
  songList = data;
  $scope.trigger('play:change', [0])
  root.renderList(songList)
  // bar.setBarHeight();
  // bar.setBarTop();
  $('.list-content li').eq(0).addClass('red');
}
getData('/data/data.json')