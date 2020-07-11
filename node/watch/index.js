var fs = require('fs');
fs.watch('./data.css',function(eventName,data){
    fs.readFile('./data.css','utf-8',function (err,data){
           console.log(data);
        })
})