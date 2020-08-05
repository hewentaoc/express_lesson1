/*
* 加载controller层中的文件
*
* */

let fs = require('fs');
let globalConfig = require('./config');
let files = fs.readdirSync('./'+ globalConfig.controller_path);
let pathMap = new Map();

function init (app){
    for(let i = 0 ;i < files.length ; i++) {
        let temp = require('./'+ globalConfig.controller_path + "/" + files[0]);
        if( temp.path ){
            for(let [k,v] of temp.path){
                if(pathMap.get(k) == null){
                    pathMap.set(k,v);
                    app.get(k,v);/* 监听已有的所有接口的get请求 */
                }else{
                    throw new Error('url出现错误,url:'+ k);
                }
            }
        }
    }
}

 module.exports.init = init;

