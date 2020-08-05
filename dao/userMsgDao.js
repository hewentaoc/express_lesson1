let createConnection = require('./dbutil');

    function insertUserMsg (params , success) {
        let connection = createConnection();
        let sqlStr = 'insert into user_msg (name, pic_path, origin_name ,pic_size) values (?,?,?,?);';
        connection.connect();
        connection.query(sqlStr,params,function (error ,result) {
            if(error == null){
                success(result);
            }else{
                throw new Error(error);
            }
        })
        connection.end();
    }
    module.exports = {
        insertUserMsg,
    }