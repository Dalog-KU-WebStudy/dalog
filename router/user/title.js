const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function(router){
    router.post('/', function(req, res){
        console.log("title edit");
        console.log(req.user);
        if(req.user){
            var title = req.user.title;
            console.log("title: " + title);
            var query1 = connection.query('select * from title where user_id=?;', [req.user.user_id], function(err, rows){
                if(err){ throw err; }
                else{
                    console.log(rows);
                    if(rows === "[]"){
                        console.log("No title");
                        /* 삽입해주자. */
                        /* Code */ 
                    }
                    else {
                        var query2 = connection.query('update title set title =? where user_id=?;', [req.body.titleInput, req.user.user_id], function(err, rowss) {
                            if(err) { throw err;}
                            console.log("Title Changed!");
                            req.user.title = req.body.titleInput;
                            console.log(req.user);
                            res.render('index.ejs', {profile:req.user, title:req.user.title});
                        })
                    }
                }
            })
        }
        else {
            console.log("로그인해야 타이틀 수정하지");
            res.send("<script>alert('로그인이 필요한 서비스입니다.');history.back();</script>");
        }
    })
}