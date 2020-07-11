var snakeWidth = 20, 
    snakeHeight = 20,
    tr = 30,
    td = 30;

var snake = null,
    food = null,
    game = null;

/**
 * x 方块横坐标 y 方块纵坐标  className 类名
 */
function Square (x, y, className) {
  this.x = x * snakeWidth;
  this.y = y * snakeHeight;
  this.class = className;
  this.dom = document.createElement('div');
  this.dom.className = this.class;
  this.parent = document.getElementsByClassName('wrap')[0];
}

/**
 * 创建方块dom，并添加到页面里
 */
Square.prototype.create = function () {
  this.dom.style.position = 'absolute';
  this.dom.style.width = snakeWidth + 'px';
  this.dom.style.height = snakeHeight + 'px';
  this.dom.style.left = this.x + 'px';
  this.dom.style.top = this.y + 'px';
  this.parent.appendChild(this.dom);
}

/**
 * 移除方块dom
 */
Square.prototype.remove = function () {
  this.parent.removeChild(this.dom);
}

// 创建一条蛇
function Snake () {
  this.head = null; // 存一下蛇头的信息
  this.tail = null; // 蛇尾
  this.pos = [];    // 存储蛇身上每一个方块的位置
  this.directionNum = { // 存储蛇走的方向
    left: {
      x: -1,
      y: 0,
      rotate: 180 // 蛇头在不同的方向应该进行旋转，要不始终向右
    },
    right: {
      x: 1,
      y: 0,
      rotate: 0
    },
    up: {
      x: 0,
      y: -1,
      rotate: -90
    },
    down: {
      x: 0,
      y: 1,
      rotate: 90
    }
  }
}

Snake.prototype.init = function () {
  // 创建蛇头、蛇身、蛇尾
  var snakeHead = new Square(2, 0, 'snakeHead');
  snakeHead.create();
  this.head = snakeHead;  // 存储蛇头信息
  this.pos.push([2, 0]);  // 把蛇头位置存储起来

  // 创建蛇身一
  var snakeBody1 = new Square(1, 0, 'snakeBody');
  snakeBody1.create();
  this.pos.push([1, 0]) // 把蛇身一坐标存储

  // 创建蛇身二
  var snakeBody2 = new Square(0, 0, 'snakeBody');
  snakeBody2.create();
  this.tail = snakeBody2; // 把蛇尾信息存储起来
  this.pos.push([0, 0]) // 把蛇身二坐标存储

  //形成链表关系
  snakeHead.last = null;
  snakeHead.next = snakeBody1;

  snakeBody1.last = snakeHead;
  snakeBody1.next = snakeBody2;

  snakeBody2.last = snakeBody1;
  snakeBody2.next = null;

  // 给蛇添加默认的方向
  this.direction = this.directionNum.right; // 默认让蛇往右走
}

/**
 * 这方法用来获取蛇头下一个位置对应的元素，根据元素做不同的事情
 */
Snake.prototype.getNextPos = function () {
  var nextPos = [ // 蛇头要走的下一个点的坐标
    this.head.x / snakeWidth + this.direction.x,
    this.head.y / snakeHeight + this.direction.y
  ];
  
  // 下一个点是自己，撞到了自己游戏结束
  var selfCollied = false; // 是否撞到自己
  this.pos.forEach(item => {
    if (item[0] == nextPos[0] && item[1] == nextPos[1]) {
      selfCollied = true;
    }
  });
  if (selfCollied) {
    this.strategies.die.call(this);
    return;
  }

  // 下一个点是围墙，游戏结束
  if (nextPos[0] < 0 || nextPos[1] < 0 || nextPos[0] > td - 1 || nextPos[1] > tr - 1) {
    this.strategies.die.call(this);
    return;
  }

  // 下一个点是食物，要吃
  if (food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]) {
    this.strategies.eat.call(this);
    return;
  }
  
  // 下一个点什么都不是，继续走
  this.strategies.move.call(this);
}


// 处理碰撞后要做的事
Snake.prototype.strategies = {
  // 走
  move: function (format) { // 这个参数决定要不要删除蛇尾，当传了这个参数就是吃
    // 创建新的身体，在旧蛇头的位置
    var newBody = new Square(this.head.x / snakeWidth, this.head.y / snakeHeight,'snakeBody');
    snakeBody1 = this.head.next;

    // 更新链表关系
    newBody.next = snakeBody1;
    snakeBody1.last = newBody;
    newBody.last = null;

    this.head.remove(); // 把旧蛇头删除
    newBody.create();

    // 创建新的蛇头(nextPos的坐标)
    var newHead = new Square(this.head.x / snakeWidth + this.direction.x, this.head.y / snakeHeight + this.direction.y, 'snakeHead');

    // 更新链表关系
    newHead.next = newBody;
    newBody.last = newHead;
    newHead.last = null;
    newHead.dom.style.transform = 'rotate(' + this.direction.rotate + 'deg)';
    newHead.create();
    
    // 蛇身上每一个坐标也要更新
    this.pos.splice(0, 0, [this.head.x / snakeWidth + this.direction.x, this.head.y / snakeHeight + this.direction.y]);
    this.head = newHead;  // 把蛇头更新
    
    // 删除蛇尾
    if (!format) {
      this.tail.remove();
      
      // 更新链表关系
      this.tail = this.tail.last;

      this.pos.pop();
    }
  },
  // 吃
  eat: function () {
    this.strategies.move.call(this, true);
    createFood();
    game.score ++;
  },
  // 死亡
  die: function () {
    game.over();
  }
}




snake = new Snake();


// 创建食物
function createFood () {
  // 食物坐标
  var x = null;
  var y = null;

  var include = true; // 循环跳出的条件，true表示生成食物的坐标在蛇身上

  while (include) {
    x = Math.round(Math.random() * (td - 1));
    y = Math.round(Math.random() * (tr - 1));
    
    snake.pos.forEach(item => {
      if (x != item[0] && y != item[1]) {
        // 这个条件成立说明随机出来的坐标在蛇身上并没有找到
        include = false;
      }
    });
  }
  // 生成食物
  food = new Square(x, y, 'food');
  food.pos = [x, y] // 存储生成食物的坐标
  var foodDom = document.querySelector('.food');
  if (foodDom) {
    foodDom.style.left = x * snakeWidth + 'px';
    foodDom.style.top = y * snakeHeight + 'px';
  } else {
    food.create();
  }
}


// 创建游戏
function Game () {
  this.timer = null;
  this.score = 0;
}

Game.prototype.init = function () {
  snake.init();
  createFood();

  document.onkeydown = function (ev) {
    if (ev.which == 37 && snake.direction != snake.directionNum.right) {
      snake.direction = snake.directionNum.left;
    } else if (ev.which == 38 && snake.direction != snake.directionNum.down) {
      snake.direction = snake.directionNum.up;
    } else if (ev.which == 39 && snake.direction != snake.directionNum.left) {
      snake.direction = snake.directionNum.right;
    } else if (ev.which == 40 && snake.direction != snake.directionNum.up) {
      snake.direction = snake.directionNum.down;
    } 
  }
  this.start();
  // snake.getNextPos();
}

Game.prototype.start = function () {  // 开始游戏
  this.timer = setInterval(() => {
    snake.getNextPos();
  }, 200);
}

Game.prototype.pause = function () {
  clearInterval(this.timer);
}

Game.prototype.over = function () {
  alert('你的得分为：' + this.score);
  clearInterval(this.timer);
  // 回到初始状态
  var wrap = document.querySelector('.wrap');
  wrap.innerHTML = '';
  game = new Game();
  snake = new Snake();
  var start_btn_wrap = document.querySelector('.btn');
  var pauseBtn = document.querySelector('.btn .start_game');
  var startBtn = document.querySelector('.btn .start-game');
  pauseBtn.style.display = 'none';
  startBtn.style.display = 'block';
  start_btn_wrap.style.display = 'block';
}

// 开始游戏
game = new Game();

var startBtn = document.querySelector('.start-game');
startBtn.onclick = function () {
  startBtn.parentNode.style.display = 'none';
  game.init();
}

// 暂停
var wrap = document.getElementsByClassName('wrap')[0];
var pauseBtn = document.querySelector('.btn .start_game');
wrap.onclick = function () {
  game.pause();
  pauseBtn.parentNode.style.display = 'block';
  pauseBtn.style.display = 'block';
}

pauseBtn.onclick = function () {
  game.start();
  pauseBtn.parentNode.style.display = 'none';
}