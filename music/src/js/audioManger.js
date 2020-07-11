(function ($, root) {
  function audioManger() {
    this.audio = new Audio();
    this.status = "pause";
  }
  audioManger.prototype = {
    //歌曲播放
    play: function () {
      this.audio.play();
      this.status = 'play';
    },
    pause: function () {
      this.audio.pause();
      this.status = 'pause';
    },
    //获取音频路径
    getAudio: function (src) {
      this.audio.src = src;
      this.audio.load();
    },
    jumpToPlay: function (duration) {
      this.audio.currentTime = duration;
      this.play();
    }

  }



  root.audioManger = audioManger;
}(window.Zepto, window.player || (window.player = {})))