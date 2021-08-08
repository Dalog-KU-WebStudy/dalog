const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function(router){

    router.get('/title', function(req, res){
        console.log('get title edit');
        if(req.user){
            console.log(req.user.user_id);
            const query = connection.query(`select title from title where user_id=?`, req.user.user_id, (err, result) => {
                if (err) {
                    return done(err);
                } else {
                    console.log('title query 실행');
                    console.dir(result[0]);
                }
            })
        }
    })

    router.post('/title', function(req, done){
        var title = req.body.titleInput;
        console.log("title 수정할곤뒈");
        console.log(title);
        if(req.user){
            var query = connection.query('update title set title =? where user_id=?;', [title, req.user.user_id], function(err, rows) {
                if(err) { throw err;}
                console.log("Title Changed!");
                return done(null, profile);
            })
        }
        else {
            alert("로그인이 필요합니다.");
            return done(null, false);
        }
    })
}