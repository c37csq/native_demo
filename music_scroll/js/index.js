
/**
 * 解析歌词字符串
 * { time: 开始时间, words: 歌词内容 }
 */
function parseLrc() {
  var lines = lrc.split('\n');
  var result = [];
  for (var i = 0; i < lines.length; i ++) {
    var str = lines[i];
    var parts = str.split(']');
    var timeStr = parts[0].substring(1);
    var obj = {
      time: parseTime(timeStr),
      words: parts[1]
    }
    result.push(obj);
  }
  return result;
}

function parseTime(timeStr) {
  var parts = timeStr.split(':');
  return +parts[0] * 60 + +parts[1];
}

var lrcData = parseLrc();

// 获取需要的DOM
var doms = {
  audio: document.querySelector('audio'),
  ul: document.querySelector('.container ul'),
  container: document.querySelector('.container'),
}

/**
 * 计算在当前播放器播放到第几秒的情况下，应该高亮显示的歌词下标
 * lrcData数组中，应该高亮的下标
 * 如果没有任何一句歌词显示 则显示-1
 */
function findIndex() {
  // 播放器当前时间
  var curTime = doms.audio.currentTime;
  for (var i = 0; i < lrcData.length; i ++) {
    if (curTime < lrcData[i].time) {
      return i - 1;
    }
  }
  // 找遍了都没找到（说明播放到最后一句）
  return lrcData.length - 1;
}

/**
 * 创建歌词元素li
 */
function createLrcElements() {
  var frag = document.createDocumentFragment(); // 文档片段
  for (var i = 0; i < lrcData.length; i++) {
    var li = document.createElement('li');
    li.textContent = lrcData[i].words;
    frag.appendChild(li); // 改动了 dom 树
  }
  doms.ul.appendChild(frag);
}

createLrcElements();

// 容器高度
var containerHeight = doms.container.clientHeight;
// li高度
var liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight;
/**
 * 设置ul元素偏移量
 */
function setOffset() {
  var index = findIndex();
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  doms.ul.style.transform = 'translateY(-' + offset + 'px)';
  // 去掉之前的active样式
  var li = doms.ul.querySelector('.active');
  if (li) {
    li.classList.remove('active');
  }
  li = doms.ul.children[index];
  if (li) {
    li.classList.add('active');
  }
}

doms.audio.addEventListener('timeupdate', setOffset);


// 数据逻辑 -> 界面逻辑 -> 事件
