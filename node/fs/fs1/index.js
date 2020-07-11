var fs = require('fs');

// fs.readFile('./data.txt',function (err,data){
//    console.log(data);
// })


var rs = fs.createReadStream('./data.txt',{start:0,end:5,encoding:'utf-8'});

rs.on('data',function(data){
    console.log(data)
})

// var chunk = ''
// rs.on('readable',function(){
//     var data = rs.read();
//     if(data){
//         chunk += data;
//     }
// })
rs.on('end',function(){
    console.log('end');
})

