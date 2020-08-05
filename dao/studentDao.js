/*
* 请求数据库
*
*
* */
let createConnection = require('./dbutil');
function queryAllStudent (success) {/* 请求所有学生 */
    let connection = createConnection();
    let querySql = 'select * from student;';
    connection.connect();
    connection.query(querySql, function( error,result ){
        if(error == null) {
            success(result)
        }else{
            throw new Error(error);
        }
    } );
    connection.end();
}

function insertStudent (params , success) {
    let connection = createConnection();
    let querySql = 'insert into student (stu_num,name,age,class,pwd) values (?,?,?,?,?);';
    connection.connect();
    connection.query(querySql,params,function (error , result) {
            if(error == null){
                success(result);
            }else{
                throw new Error(error);
            }
    })
    connection.end();
}

function queryStudentByStuNum (stuNum , success) {
    let connection = createConnection();
    let querysql = 'select * from student where stu_num = ?;';
    connection.connect();
    connection.query(querysql,stuNum,function (error,result) {
        if(error == null){
            success(result);
        }else{
            throw new Error(error);
        }
    })
    connection.end();
}


module.exports = {
    queryAllStudent,
    insertStudent,
    queryStudentByStuNum,
};