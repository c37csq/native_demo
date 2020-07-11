
    //小羊肖恩  

    var sheeps = {
        sPars:{
            frequency:70,
            speed:7,
            backNum:0,
            stage:document.getElementsByClassName('stage')[0],
            maxSheeps:8
        },
        init:function(){

            this.creatSheep()

        },
        creatSheep:function(){

            function SheepClass(data){
                this.sheep = document.createElement('div');
                data.stage.appendChild(this.sheep);
                this.sheep.className = 'sheep';
                this.frequency  = Math.floor(Math.random()*data.frequency) + 30;
                this.backNum = data.backNum;
                this.speed = data.speed;
                this.stage = data.stage;
                
                this.top = 0;
                this.currentSpeed = data.speed ;
            }
            var _this = this;
            var  timer = setInterval(function(){
                var sheepNum = _this.sPars.stage.children.length;//舞台上羊的个数
                if(sheepNum < _this.sPars.maxSheeps){
                    var sheepPlus =  new SheepClass(_this.sPars);
                    _this.sheepRun(sheepPlus);
                }
            
            },1000)
          
        },
        sheepRun:function(sheepPlus){
           
            sheepPlus.sheepAnimate = setInterval(function(){
                sheepPlus.backNum = sheepPlus.backNum + 164;
                    if(sheepPlus.backNum == 1312){
                        sheepPlus.backNum = 0;
                    }
                    // console.log(backNum);
                    sheepPlus.sheep.style.backgroundPosition= -sheepPlus.backNum +'px ' + sheepPlus.top +'px';
                    var cot  = sheepPlus.sheep.offsetLeft  - sheepPlus.speed ;
                        if(cot<= -164){
                            clearInterval(sheepPlus.sheepAnimate);
                            sheepPlus.stage.removeChild(sheepPlus.sheep)
                            console.log('remove');
                        }
                        sheepPlus.sheep.style.left = cot + 'px';

                },sheepPlus.frequency);


                //拖拽部分
                sheepPlus.sheep.onmousedown = function(e){ 
                    sheepPlus.speed = 0;
                    sheepPlus.top = -128;

                    sheepPlus.x = e.pageX;
                    sheepPlus.y = e.pageY;

            document.onmousemove = function(e){
                var chax = e.pageX - sheepPlus.x;
                var chay = e.pageY - sheepPlus.y;
                sheepPlus.sheep.style.left = chax + sheepPlus.sheep.offsetLeft + 'px';
                sheepPlus.sheep.style.top = chay + sheepPlus.sheep.offsetTop + 'px';
                sheepPlus.x = e.pageX;
                sheepPlus.y = e.pageY;
            }

            document.onmouseup = function(e){
                document.onmousemove = null;
                sheepPlus.speed = sheepPlus.currentSpeed;
                sheepPlus.top = 0;
            }   


                }


        }

    }

sheeps.init();
   //自身动画
    // var backNum = 0;//
    // var sheep = document.getElementsByClassName('sheep')[0];
    // var sheepAnimate = setInterval(function(){
    //     backNum = backNum + 164;
    //     if(backNum == 1312){
    //         backNum = 0;
    //     }
    //     // console.log(backNum);
    //     sheep.style.backgroundPosition= -backNum + 'px ' + 0 + 'px';
    // },50);
    // var sheepRun = setInterval(function(){
    //     var cot  = sheep.offsetLeft  - 10 ;
    //     if(cot<= -164){
    //         clearInterval(sheepRun)
    //         console.log('remove')
    //     }
    //     sheep.style.left = cot + 'px';
    // },50)