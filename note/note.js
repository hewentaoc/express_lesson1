/*
* express的笔记
*
* 发送文件必须使用post方法
*
* ### http模块只能解析http的请求头,请求中的数据体没办法解析
* ### 如果请求中的数据体中上传文件,http模块没法解析
* ### 所以可以需要使用express
*
* 注:
* 你项目上线后，仍然需要用的东西要加 --save;
* */
// let net = require('net');
let express = require('express');
let app = new express();/* 创建对象 */
/* 做一个静态文件服务器
*  将静态资源放在一个路径下
*
* */
app.use(express.static('./page'));/* 开启静态文件服务器 */
app.listen(12306);/* 开启端口为12306的服务器 */

/*
* 监听"/query"接口的get请求
* request,response等同于http中的request,response
*
* */
app.get('/query',function (request, response) {

})

/*
* express中的拦截器
* app.get() 可以控制接口监听的next函数
*
* 之前学的重定向
* response.writeHead(302 , {
     "location":"/main.html",  //重定向到main页面
     "Set-Cookie":"id="+"id",
  })

* 现在的重定向
* response.redirect('/login.html');
* /app/* 用来拦截api下面的所有路径
*
*/

app.get('/app/*', function (request,response,next) { /* express中的拦截器 */

    response.redirect('/login.html');/* 页面重定向 */

})

/*
* 读取cookie
* cookie-parser 解析cookie的工具包
* 快速解析页面中存储的cookie
*
* */

let cookie = require('cookie-parser');
app.use(cookie());
/*
* request.cookies === 一个cookie对象
*
*/


/*
*  文件的上传和下载
*
*  发送文件必须用post请求
*
*
* */
/*
1.
FormData 接口提供了一种表示表单数据的键值对的构造方式，
经过它的数据可以使用 XMLHttpRequest.send() 方法送出，
本接口和此方法都相当简单直接。
如果送出时的编码类型被设为 "multipart/form-data"，
它会使用和表单一样的格式。
*/

/*
2.
   解析上传文件 需要用到multer模块
   文件可以存在数据库 也可以存在磁盘上
   建议把文件存在磁盘上 即file文件下
*/

let multer = require('multer');
/*
3.
Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据
*/
let fileSingle = multer({
        dest:"./file/",        /* 上传文件存在的位置*/
    })
/*
4.
* post方法第二个参数 用来解析文件的方法 即通过哪个方法来解析file文件
*
*
* objMulter.any()表示接收任何上传的数据，
* 对应的有个objMulter.single('file')(表示只接收name为file的上传数据)，
*
* */

/*
5.
  两种传参的方式 get,post
  1. 拼接在url的后面, url.parse(request.url).query;
  2. 放在form表单里,进行post请求,将数据放在request的数据体(body)中传上来的 request.body
*/

// post方法第二个参数 用来解析文件的方法 即通过哪个方法来解析file文件
app.post('/upload',fileSingle.single("file") ,function (request ,response) {
        request.file.originalname; /* 上传的文件名 */
        request.file.size; /* 上传文件的大小 */
        request.file.path; /* 存储的路径 */
        request.body.name; /* post传递的数*/
    /*
    * 上传用户的信息
    * 用户名、用户的头像
    * 头像的图片存放到某个路径下(某个文件夹下,也是磁盘上)
    * 数据库中存 用户名,用户头像的路径
    *
    * */
})





//5. 通配符拦截所有路由请求，作逻辑判断
app.use('*',function(req,res,next){
    /*if(req.xxx){
        // 逻辑代码
        next() // 放行
    }else{
        // 逻辑代码
    }*/
})
// app.use(express.static(__dirname + '/public'));



/*
6.
  文件的下载分为两种情况
  1. 展示在页面里

  2. 作为文件下载到本地
     以文件存储的形式给他下载到这个浏览器这个下载的路径下
   <a href='#' download='pic.png'></a>




*/

