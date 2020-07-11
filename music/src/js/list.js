(function ($, root) {
  var $scope = $(document.body)

  function renderList(data) {
    // var bar = $('<div>');
    // bar.attr('class', 'scroll-bar')
    var html = '';
    for (var i = 0; i < data.length; i++) {
      html +=
        "<li>" +
        data[i].song + " - " + data[i].singer + "<span class='play'></span><span class='close'></span></li>"
    }
    $scope.find('.list-content').html(html);
    // $scope.find('.list-wrapper').append(bar);

  }

  root.renderList = function (data) {
    renderList(data)
  }
}(window.Zepto, window.player || (window.player = {})))