/*
* 控制层
* 接受请求
* 返回数据
* response.End的作用就是让request执行到此结束，输出到客户端浏览器。
* */
let studentDao = require('../dao/studentDao');
let url = require('url');
let fs = require('fs');
let path = new Map();
 function queryAllStudent (request,response) {
     studentDao.queryAllStudent(function(result){
         /* 解决乱码 */
         response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
         response.write(JSON.stringify(result));
         response.end();/* 结束request请求 */
     })
 }
 path.set('/api/queryAllStudent',queryAllStudent);

 function insertStudent (request , response){
     let pramsObj = url.parse(request.url , true).query;
     let paramsArr = [pramsObj.stu_num , pramsObj.name , pramsObj.age , pramsObj.class,pramsObj.pwd ];
     studentDao.insertStudent( paramsArr, function (result) {
         response.writeHead(200, {'Content-type':"text/html; charset=utf-8"});
         response.write('添加成功');
         response.end();
     })
 }
 path.set('/api/insertStudent',insertStudent);

 function login (request , response) {
    let params = url.parse(request.url ,true).query;
    studentDao.queryStudentByStuNum(params.stuNum, function (result) {
        if(result && result.length > 0 && result[0].pwd == params.password){
            response.cookie('id', result[0].id);/* 增加cookie */
            response.redirect('/index.html');/* 重定向 */
        }else {
            response.redirect('/error.html');/* 重定向错误页面 */
        }
    })
 }
 path.set('/login',login);

 function getPic(request,response) {
    let params = url.parse(request.url , true).query;
    try {
        let filedata = fs.readFileSync("./"+ params.path);
        response.writeHead(200);
        response.write(filedata);
        response.end();
    }catch (e) {
        response.writeHead(404);
        response.end();
    }

 }
path.set('/getPic', getPic);
 module.exports.path = path;