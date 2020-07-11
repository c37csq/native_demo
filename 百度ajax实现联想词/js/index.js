var oUl = $('ul');
(function () {
  var oInput = $('.search');
  oInput.on('input', function () {
    var value = $(this).val();
    getData(value);
  })

  function getData(value) {
    $.ajax({
      type: 'get',
      url: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1460,21103,29237,28518,29099,28835,29221,26350,20719' +
        '&cb=addItem',
      data: 'wd=' + value,
      dataType: 'jsonp',
      success: addItem
    })
  }
}())

function addItem(data) {
  console.log(data)
  var str = '';
  var data = data.g;
  data.forEach(function (ele, index) {
    str += '<li><a href=https://www.baidu.com/s?wd=' + ele.q + '>' + ele.q + '</a></li>';
  })
  oUl.html(str);
  oUl.css({
    'display': 'block'
  });
}