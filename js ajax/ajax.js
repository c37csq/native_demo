//ajax函数封装
function ajax(method, url, data, callback, flag) {
  var xhr
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest()
  } else {
    xhr = new ActiveXObject('Microsoft XMLHttp')
  }
  method = method.toUpperCase()
  if (method == 'GET') {
    xhr.open(method, url + '?' + data + '&timer=', flag)
    xhr.send()
  } else if (method == 'POST') {
    xhr.open(method, url, flag)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.send(data)
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        callback(xhr.responseText)
      }
    }
  }
}

//执行函数
function show(data) {
  var value = JSON.parse(data)
  var str = ''
  value.forEach(function(ele, index) {
    str += '<li>' + ele.title + 'ele.data' + '</li>'
  })
  ul.innerHTML = str
}

//调用函数
ajax('GET', 'url', '', show, true) //get请求

//data = 'username=' + username.value + '&age=' + age.value;
ajax('POST', 'url', data, show, true) //post请求  //e.preventDefault();
