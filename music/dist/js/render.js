//渲染模块
(function ($, root) {
  //渲染歌曲信息
  function renderInfo(data) {
    var $scope = $(document.body);

    var html = "<div class='song-name'>" + data.song + "</div>" +
      "<div class='singer-name'>" + data.singer + "</div>" +
      "<div class='album-name'>" + data.album + "</div>";
    $scope.find('.song-info').html(html);
  }
  //渲染图片信息
  function renderImage(src) {
    var img = new Image();
    img.onload = function () {
      $scope.find('.song-img img').attr('src', src);
      root.blurImg(img, $scope);
    }
    img.src = src;
  }
  //渲染喜欢按钮
  function renderLikeBtn(isLike) {
    if (isLike) {
      $scope.find('.like-btn').addClass('liking');
    } else {
      $scope.find('.like-btn').removeClass('liking');
    }
  }
  //渲染数据
  root.render = function (data) {
    renderInfo(data);
    renderImage(data.image);
    renderLikeBtn(data.isLike);
  }
}(window.Zepto, window.player || (window.player = {})))