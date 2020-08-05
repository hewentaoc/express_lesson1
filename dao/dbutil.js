let mysql = require('mysql');
/*
* 连接数据库
*
* */
function  createConnection() {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        post: '3306',
        user: 'root',
        password: '123456',
        database: 'school',
    })
    return connection;
}
module.exports = createConnection;