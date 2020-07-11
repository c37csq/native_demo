var obj = {
    init: function () {
        this.nums = Array.from(document.getElementsByClassName('nums'));
        this.classList = ['visible', 'close', 'far', 'far', 'distant', 'distant'];
        this.use24Hours = true;
        this.start();
    },
    start: function () {
        var self = this;
        setInterval(function () {
            var time = self.getClock();
            self.nums.forEach(function(ele,index){
                var n = +time[index];
                var offset = n * 86;
                ele.style.transform = 'translateY(calc(50vh - 43px - ' + offset + 'px))';
                Array.from(ele.children).forEach(function(ele2,i2){
                    var className = self.getclassName(n,i2);
                    ele2.className = className;
                });
            });
        }, 200);
    },
    getClock: function () {
        var d = new Date();
        var h = this.use24Hours ? d.getHours() : d.getHours % 12;
        var m = d.getMinutes();
        var s = d.getSeconds();
        var str = '';
        str = [h, m, s].reduce(function (p, n) {
            return (p + ('0' + n).slice(-2));
        }, '');
        return str;
    },
    getclassName: function (n, i2) {
        var className = this.classList.find(function(ele,i){
            return i2 - i === n || i2 + i === n;
        });
        return className || '';
    }
};
obj.init();


//开始--》获取到当前时间
// --》当前时间 14 17 35 -->字符串141735
//-->六个数与六个类名为column的div分别对应上
//-->分别找到每一列为当前时间的数字垂直局中显示 --根据数字大小调节在Y轴上移动的距离
//-->同一列中不同数字位置不同 透明度不同（根据为每一个数字见不同的类名实现）