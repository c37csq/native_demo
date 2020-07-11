var fs = require('fs');

var rs = fs.createReadStream('./index.txt');
var ws = fs.createWriteStream('./dest.txt',{
    defaultEncoding:'utf-8',
    flags:'a'
});
rs.pipe(ws)
// rs.on('data',function (data){
//     ws.write(data);

// })
// rs.on('end',function(){
//     ws.end();
// })