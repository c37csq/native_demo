var toyBox = document.getElementsByClassName('toys')[0]
var toyBoxWidth = 470
var toyWidth = 200
var timer1 = null
var timer2 = null
var time3 = null
var time4 = null
var arr = []
var claw = document.getElementsByClassName('claw')[0]
var button = document.getElementsByClassName('button')[0]
var toys = toyBox.querySelectorAll('div')
function createToy(left) {
  var div = document.createElement('div')
  div.style.left = left + 'px'
  toyBox.appendChild(div)
  arr.push(div)
}

function createToys() {
  for (var i = 0; i < 5; i++) {
    createToy(-(i + 1) * toyWidth)
  }
}
function moveToys() {
  timer1 = setInterval(function() {
    var toys = toyBox.querySelectorAll('div')
    for (var i = 0; i < toys.length; i++) {
      var toy = toys[i]
      var left = toy.style.left
      var oLeft = parseInt(left.split('px')[0])
      var speed = 2
      oLeft = oLeft + speed
      toy.style.left = oLeft + 'px'
    }
  }, 16)
}
function createMoreToys() {
  var len = arr.length
  var left = arr[len - 1].style.left
  if (left.split('px')[0] >= 0) {
    createToy(-toyWidth)
  }
}
function removeToy() {
  var left = arr[0].style.left
  if (left.split('px')[0] >= toyBoxWidth) {
    toyBox.removeChild(arr[0])
    arr.splice(0, 1)
  }
}
function clawDown() {
  claw.style.height = '345px'
  // time4 = setInterval(() => {
  //   canBeCatchToy()
  // }, 16)
  claw.addEventListener('transitionend', function() {
    claw.classList.remove('open')
    var toys = toyBox.querySelectorAll('div')
    for (var i = 0; i < toys.length; i++) {
      if (
        toys[i].style.left.split('px')[0] >= 100 &&
        toys[i].style.left.split('px')[0] <= 200
      ) {
        // console.log(i)
        clearInterval(timer1)
        toys[i].style.bottom = '265px'
      }
    }
    claw.style.height = '80px'
    claw.addEventListener('transitionend', function() {
      claw.classList.add('open')
    })
  })
}

// function canBeCatchToy() {
//   for (var i = 0; i < arr.length; i++) {
//     var toy = arr[i]
//     var left = toy.style.left
//     var oLeft = left.split('px')[0]
//     if (oLeft >= 140 && oLeft <= 300) {
//       // console.log(arr[i])
//       clearInterval(timer1)
//       // arr[i].style.left = '130px'
//       arr[i].style.bottom = '265px'
//     }
//   }
// }

button.onclick = function() {
  if (button.classList.contains('down')) {
    return
  }
  this.classList.add('down')
  clawDown()
  // time4 = setInterval(() => {
  //   canBeCatchToy()
  // }, 16)
  var that = this
  setTimeout(function() {
    that.classList.remove('down')
  }, 2000)
}
timer2 = setInterval(function() {
  createMoreToys()
}, 30)
time3 = setInterval(function() {
  removeToy()
}, 30)
createToys()
moveToys()
