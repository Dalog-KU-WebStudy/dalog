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
                    if(!rows[0]){
                        console.log("No title");
                        /* insert title */
                        var query2 = connection.query('insert into title (user_id, title) values (?,?)', [req.user.user_id, req.body.titleInput], function(err, roww){
                            if(err) { throw err; }
                            console.log("Title Inserted!");
                            req.user.title = req.body.titleInput;
                            console.log(req.user);
                            res.render('index.ejs', {profile:req.user, title:req.user.title});
                        })
                    }
                    else {
                        /* update title */
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
            console.log("no user");
            res.send("<script>alert('로그인이 필요한 서비스입니다.');history.back();</script>");
        }
    })
}