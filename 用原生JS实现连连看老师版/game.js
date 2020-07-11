var doms = {
  container: document.querySelector('.container'),
  time: document.querySelector('.time span'),
  win: document.getElementById('divWin'),
  lose: document.getElementById('divLose')
}

var config = {
  imgNumber: 24,
  maxImgIndex: 12,
  minImgIndex: 1,
  time: 30
}

var audios = {
  right: document.getElementById('audright'),
  win: document.getElementById('audwin'),
  lose: document.getElementById('audlose'),
  bg: document.getElementById('audbg')
}

var imgArr = []

function ImgCard(index) {
  this.index = index
  this.active = false
  this.valished = false
  this.dom = document.createElement('div')
  this.dom.className = 'item'
  this.dom.innerHTML = `
        <img src="images/role${this.index}.jpg">
    `
  var that = this
  this.dom.onclick = function() {
    setActive(that)
  }
}

ImgCard.prototype.appendTo = function(container) {
  container.appendChild(this.dom)
}

ImgCard.prototype.setActive = function(value) {
  this.active = value
  if (this.active) {
    this.dom.classList.add('active')
  } else {
    this.dom.classList.remove('active')
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

function initImgs() {
  //1. 生成数组
  for (var i = 0; i < config.imgNumber; i += 2) {
    var index = getRandom(config.minImgIndex, config.maxImgIndex)
    imgArr.push(new ImgCard(index))
    imgArr.push(new ImgCard(index))
  }
  //2. 随机排序
  imgArr.sort(() => Math.random() - 0.5)
  //3. 添加到容器
  for (var i = 0; i < imgArr.length; i++) {
    imgArr[i].appendTo(doms.container)
  }
}

function setActive(imgCard) {
  if (imgCard.valished) {
    return
  }
  //获取当前选中的imgCard对象
  var curActiveCard = imgArr.find(it => it.active && !it.valished)
  //设置当前的选中状态
  imgCard.setActive(true)
  if (curActiveCard) {
    //之前有选中
    if (curActiveCard.index === imgCard.index) {
      valish(curActiveCard, imgCard)
    } else {
      curActiveCard.setActive(false)
    }
  }
}

function valish(card1, card2) {
  if (card1.dom === card2.dom) {
    return
  } else {
    isValising = true
    card1.valished = card2.valished = true
    card1.dom.style.transition = card2.dom.style.transition = '0.5s'
    card1.dom.style.opacity = card2.dom.style.opacity = 0
    //播放声音
    audios.right.currentTime = 0
    audios.right.play()
    setTimeout(() => {
      card1.dom.style.visibility = card2.dom.style.visibility = 'hidden'
    }, 500)
    //胜负
    isWin()
  }
}
var timer = null
function isWin() {
  var unValishedCard = imgArr.find(it => !it.valished)
  if (!unValishedCard) {
    //胜利
    doms.container.style.display = 'none'
    doms.win.style.transform = 'translate(-50%, -50%) scale(1)'
    clearInterval(timer)
    audios.bg.pause()
    audios.win.play()
  }
}

var curTime = config.time
function showTime() {
  doms.time.innerText = curTime + 's'
}

function startTime() {
  timer = setInterval(() => {
    curTime--
    showTime()
    if (curTime === 0) {
      //失败
      doms.container.style.display = 'none'
      doms.lose.style.transform = 'translate(-50%, -50%) scale(1)'
      clearInterval(timer)
      audios.bg.pause()
      audios.lose.play()
    }
  }, 1000)
}

document.querySelector('.begin button').onclick = function() {
  begin()
}

function begin() {
  audios.bg.play()
  document.querySelector('.begin').style.display = 'none'
  doms.container.style.display = 'grid'
  startTime()
  showTime()

  initImgs()
}
