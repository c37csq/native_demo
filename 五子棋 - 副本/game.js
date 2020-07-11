//配置
var config = {
  rows: 15, //行数
  cols: 15, //列数
  gameDom: document.getElementsByClassName('game')[0],
  infoDom: document.getElementsByClassName('info')[0],
  btnDom: document.getElementsByClassName('button')[0],
  splitSize: 40
}
var board
var nextChess = 1
var isGameOver = false
/**
 * 初始化棋盘
 */
function initBoard() {
  board = new Array(config.rows)
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(config.cols)
    board[i].fill(0) //给数组每一项赋值为零
  }
}

/**
 * 下棋相当于向指定行和列放置一枚棋子.
 */
function pushChess(row, col) {
  if (row < 0 || col < 0 || row > config.rows - 1 || col > config.cols - 1) {
    return
  }
  if (board[row][col]) {
    return
  }
  board[row][col] = nextChess
  var div = document.createElement('div')
  console.log(nextChess)
  div.className = 'chess ' + (nextChess === 1 ? 'black' : 'white')
  div.style.left = col * config.splitSize + 'px'
  div.style.top = row * config.splitSize + 'px'
  config.gameDom.appendChild(div)
  if (nextChess === 1) {
    nextChess = 2
  } else {
    nextChess = 1
  }
  if (isWin(row, col)) {
    isGameOver = true
    config.gameDom.onclick = null
  }
  showInfo()
}

function bindEvent() {
  config.gameDom.onclick = function(e) {
    if (e.target.classList.contains('chess')) {
      return
    }
    var x = e.offsetX - 20,
      y = e.offsetY - 20
    var col = Math.round(x / config.splitSize) //列
    var row = Math.round(y / config.splitSize) //行
    pushChess(row, col)
  }
  config.btnDom.onclick = init
}
/**
 * 显示相关信息
 */
function showInfo() {
  if (isGameOver) {
    var str
    if (nextChess === 1) {
      str = '白棋胜利'
    } else {
      str = '黑棋胜利'
    }
    config.infoDom.innerHTML = '游戏结束' + str
  } else {
    var str
    if (nextChess === 1) {
      str = '轮到黑棋'
    } else {
      str = '轮到白棋'
    }
    config.infoDom.innerHTML = str
  }
}
/**
 * 获取指定格子的内容
 * @param {} row
 * @param {*} col
 */
function getChess(row, col) {
  if (board[row] === undefined) {
    return
  }
  if (board[row][col] === undefined) {
    return
  }
  return board[row][col]
}
/**
 * 判断是否游戏结束
 */
function isWin(row, col) {
  var chess = getChess(row, col) //得到当前棋子
  //横向五子相连
  var line = 1
  //往左边
  for (var i = col - 1; getChess(row, i) === chess; i--) {
    line++
  }
  //往右边
  for (var i = col + 1; getChess(row, i) === chess; i++) {
    line++
  }
  if (line >= 5) {
    return true
  }
  //纵向五子相连
  var line = 1
  //往左边
  for (var i = row - 1; getChess(i, col) === chess; i--) {
    line++
  }
  //往右边
  for (var i = row + 1; getChess(i, col) === chess; i++) {
    line++
  }
  if (line >= 5) {
    return true
  }
  //正斜线
  var line = 1
  //左上方向
  for (var i = row - 1; (j = col - 1); getChess(i, j) === chess, i--, j--) {
    line++
  }
  //右下方向
  for (var i = row + 1; (j = col + 1); getChess(i, j) === chess, i++, j++) {
    line++
  }
  if (line >= 5) {
    return true
  }
  //反斜线
  var line = 1
  //左下方向
  for (var i = row + 1; (j = col - 1); getChess(i, j) === chess, i++, j--) {
    line++
  }
  //右上方向
  for (var i = row - 1; (j = col + 1); getChess(i, j) === chess, i--, j++) {
    line++
  }
  if (line >= 5) {
    return true
  }
}

/**
 * 初始化
 */
function init() {
  nextChess = 1
  isGameOver = false
  config.gameDom.innerHTML = ''
  initBoard()
  bindEvent()
  showInfo()
}
init()
