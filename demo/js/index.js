var config = {
	stageWidth: 500,
	domWidth: 20,
	playerSpeed: 8
}
/**
 * 创建player的构造函数
 */
function Player(top, left, className) {
	this.dom = document.createElement('div')
	this.left = left
	this.top = top
	this.className = className
	this.stage = document.getElementById('game')
	this.dom.className = this.className
	this.dom.style.top = this.top + 'px'
	this.dom.style.left = this.left + 'px'
	this.stage.appendChild(this.dom)
}
//给玩家添加键盘事件
Player.prototype.bindEvent = function() {
	var that = this
	document.onkeydown = function(e) {
		var e = window.event || e
		switch (e.keyCode) {
			case 37: //左
				that.left -= config.playerSpeed
				if (that.left <= 0) {
					that.left = 0
				}
				that.dom.style.left = that.left + 'px'
				break

			case 39: //右
				that.left += config.playerSpeed
				if (that.left >= config.stageWidth - config.domWidth) {
					that.left = config.stageWidth - config.domWidth
				}
				that.dom.style.left = that.left + 'px'
				break
			case 38:
				that.top -= config.playerSpeed
				if (that.top <= 0) {
					that.top = 0
				}
				that.dom.style.top = that.top + 'px'
				break
			case 40:
				that.top += config.playerSpeed
				if (that.top >= config.stageWidth - config.domWidth) {
					that.top = config.stageWidth - config.domWidth
				}
				that.dom.style.top = that.top + 'px'
				break
		}
	}
}
/**
 *创建怪物的函数
 *
 */
function Monster(className) {
	this.top = 0
	this.left = 0
	this.speedX = getRandom(0.5, 3.5)
	this.speedY = getRandom(0.5, 3.5)
	this.timer = null
	this.className = className
	this.dom = document.createElement('div')
	this.stage = document.getElementById('game')
	this.dom.className = this.className
	this.dom.style.left = this.left + 'px'
	this.dom.style.top = this.top + 'px'
	this.stage.appendChild(this.dom)
}
//怪物运动的方法
Monster.prototype.run = function() {
	var that = this
	this.timer = setInterval(function() {
		that.left += that.speedX
		if (that.left < 0) {
			that.left = 0
			that.speedX = -that.speedX
		}
		if (that.left >= config.stageWidth - config.domWidth) {
			that.left = config.stageWidth - config.domWidth
			that.speedX = -that.speedX
		}
		that.dom.style.left = that.left + 'px'
		that.top += that.speedY
		if (that.top < 0) {
			that.top = 0
			that.speedY = -that.speedY
		}
		if (that.top >= config.stageWidth - config.domWidth) {
			that.top = config.stageWidth - config.domWidth
			that.speedY = -that.speedY
		}
		that.dom.style.top = that.top + 'px'
		isOver(that, player)
		if (isOver(that, player)) {
			for (var i = 0; i < monsterArr.length; i++) {
				var monster = monsterArr[i]
				monster.stop()
			}
			clearInterval(timer)
		}
	}, 16)
}
//暂停怪物的方法
Monster.prototype.stop = function() {
	clearInterval(this.timer)
}
var timer = null
var player = new Player(
	(config.stageWidth - config.domWidth) / 2,
	(config.stageWidth - config.domWidth) / 2,
	'player'
)
var monsterArr = []
/**
 * 初始化函数
 */
function init() {
	player.bindEvent()
	timer = setInterval(function() {
		var monster = new Monster('monster')
		monsterArr.push(monster)
		monster.run()
	}, 2000)
	setTime()
}
/**
 *随机数函数
 *
 * @param {*} min
 * @param {*} max
 * @returns
 */
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}
/**
 *判断游戏是否胜利
 *
 * @param {*} monster
 * @param {*} player
 * @returns
 */
function isOver(monster, player) {
	if (
		Math.abs(player.left - monster.left) < config.domWidth &&
		Math.abs(player.top - monster.top) < config.domWidth
	) {
		alert(
			'game over!!! 你的成绩是:' +
				minuteDom.innerText +
				':' +
				secondDom.innerText +
				':' +
				millisecondDom.innerText
		)
		clearInterval(timer1)
		return true
	}
}
var timer1
var minuteDom = document.getElementsByClassName('minutes')[0],
	secondDom = document.getElementsByClassName('seconds')[0],
	millisecondDom = document.getElementsByClassName('milliseconds')[0]
/**
 * 设置计时器
 */
function setTime() {
	var minute = 0,
		second = 0,
		millisecond = 0
	timer1 = setInterval(function() {
		millisecond = millisecond + 1
		if (millisecond >= 100) {
			millisecond = 0
			second = parseInt(second) + 1
		}
		if (parseInt(second) < 10) {
			second = '0' + parseInt(second)
		} else {
			second = parseInt(second)
		}
		if (parseInt(second) >= 60) {
			second = 0
			minute = minute + 1
		}
		if (minute < 10) {
			minute = '0' + parseInt(minute)
		} else {
			minute = parseInt(minute)
		}
		minuteDom.innerText = minute
		secondDom.innerText = second
		millisecondDom.innerText = millisecond
	}, 10)
}
init()
