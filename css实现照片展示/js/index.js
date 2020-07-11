var wrapper = document.getElementById('wrapper')
var item = document.getElementsByClassName('item')
var close = document.getElementsByClassName('close')
console.log(wrapper)
var timer = setTimeout(function() {
  wrapper.classList.remove('init')
}, 200)
for (var i = 0; i < item.length; i++) {
  item[i].onclick = function() {
    this.classList.add('active')
    wrapper.classList.add('wrapper-active')
  }
}

for (var i = 0; i < close.length; i++) {
  close[i].onclick = function(e) {
    for (var j = 0; j < item.length; j++) {
      e.stopPropagation()
      wrapper.classList.remove('wrapper-active')
      item[j].classList.remove('active')
    }
  }
}
