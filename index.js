/*
* 创建静态文件服务器
* app.get('/queryAllStudent', studentController.path.get('/queryAllStudent'));
* 上述这种监听方式不够全面,在loader中对已有的所有接口进行监听
* */

let express = require('express');
let globalConfig = require('./config'); /* 引入配置文件 */
let cookie = require('cookie-parser');/* 解析cookie */
let multer = require('multer');/* 解析文件 */
let userMsgDao = require('./dao/userMsgDao');
let studentController = require('./controller/studentController');
let app = new express();
let loader = require('./loader');
let fileSingle = multer({dest: './file/'});/* 用来存储上传的文件 */
app.use(express.static(globalConfig.page_path));/* 静态文件路径 */
console.log(globalConfig.page_path)
app.use(cookie());/* 解析cookie字符串为对象 */
app.get('/api/*' , function (request , response , next) {/* 拦截器,拦截app路径下面的所有路径 */
    console.log(request.cookies)
    if(request.cookies.id){/* 判断是否存在cookie */
        next();/* 存在cookie就正常访问接口 */
    }else{/* 不存在cookie就跳转到登录页面 */
        response.redirect("/login.html");/* 进行页面的重定向 */
    }
})
/* 用来接受uploadFile的post请求, 表示只接收name为file的上传数据*/
app.post('/uploadFile', fileSingle.single('file'), function (request ,response) {
    let name = request.body.name;
    let pic_path = request.file.path;
    let origin_name = request.file.originalname;
    let pic_size = request.file.size;
    let paramArr = [name,pic_path,origin_name,pic_size]
    userMsgDao.insertUserMsg(paramArr, function (result) {
        let res = {
            path:pic_path
        }
        response.writeHead(200);
        response.write(JSON.stringify(res));
        response.end();
    })
})
app.listen(globalConfig.port);
loader.init(app);



