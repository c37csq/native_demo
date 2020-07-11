## 获取上下文

在同一个canvas上以相同的 contextType 多次调用此方法只会返回同一个上下文。

```js
var ctx = canvas.getContext(contextType);
```

当 contextType 为 "2d" 时，返回CanvasRenderingContext2D对象，可以使用该对象作画。

## CanvasRenderingContext2D

> 弧度 = 角度 * PI / 180

**路径**

注意：以下的相关方法，均是描述路径，不会真正的绘制

- beginPath()，开启一个新的路径
- closePath()，闭合一个路径，该函数仅作图形闭合，不会开启新的路径
- moveTo(x, y)，移动笔触到目标点
- lineTo(x, y)，将笔触从当前路径的上一个点，连线到当前的点
- arc(x, y, radius, startAngle, endAngle, anticlockwise)
  - x：圆弧中心（圆心）的 x 轴坐标。
  - y：圆弧中心（圆心）的 y 轴坐标。
  - radius：圆弧的半径。
  - startAngle：圆弧的起始点， x轴方向开始计算，单位以弧度表示。
  - endAngle：圆弧的终点， 单位以弧度表示。
  - anticlockwise 可选：可选的Boolean值 ，如果为 true，逆时针绘制圆弧，反之，顺时针绘制。

**绘制相关**

- stroke()：描边
- fill()：填充

**样式相关**

- strokeStyle：描边颜色
- fillStyle：填充颜色
- lineWidth：线条粗细
- lineCap：线条末端类型
  - butt：方形
  - round：原形
  - square：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
- shadowBlur：描述阴影模糊效果。 默认 0，值越大，越模糊
- shadowColor：阴影的颜色
- shadowOffsetX：阴影水平偏移量
- shadowOffsetY：阴影垂直偏移量
- translate(x, y)：平移上下文
- rotate(angle)：顺时针旋转的弧度。

**上下文状态**

- save()：保存当前的绘画样式状态
- restore()：恢复到上一次保存的样式状态
- clearRect(x, y, width, height)：清除矩形区域内所有的内容