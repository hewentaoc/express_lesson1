/*
* 加载配置文件
*
* */

let fs = require('fs');
let globalConfig = {};
let file = fs.readFileSync('./server.conf');
let fileArr = file.toString().split('\r\n');
for(let i = 0 ; i < fileArr.length ; i++){
    globalConfig[fileArr[i].trim().split('=')[0]] = fileArr[i].split('=')[1];
}
module.exports = globalConfig;