var fs = require("fs");
fs.readdir('./dir',function (err,data) {
    console.log(data);
})

function bfs(dirPath){
  var state = fs.statSync(dirPath);
  if(state.isFile()){
      console.log(dirPath);
      return;
  }
  if(!state.isDirectory()){
      return;
  }
  fs.readdir(dirPath,function(err,data){
     data.forEach(function(item){
        bfs(dirPath + '/' + item)
     })
  })
}
bfs('./dir')