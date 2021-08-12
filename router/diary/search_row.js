const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function(router){
    router.post('/diary/search_row', (req, res)=>{
        console.log(req.body);
        var search = req.body.search;

        if(req.user){
            var query1 = connection.query('select * from diary where diary_title=?;', search, function(err, rows){
                if(err){ throw err; }
                else{
                    console.log(rows);
                    if(!rows[0]){
                        console.log("Diary Search : Not exists...");
                        res.render('board_row.ejs', {profile: req.user, title:req.user.title, msg : "검색결과를 찾을 수 없습니다.", row: rows});
                    }
                    else {
                        console.log("Diary Search : Found!!");
                        console.log(rows.length);
                        res.render('board_row.ejs', {profile: req.user, title:req.user.title, msg : "" , row: rows})
                    }
                }
            });
        }
        else{
            console.log("no user");
            res.send("<script>alert('로그인이 필요한 서비스입니다.');location.href='/user/login';</script>");
        }
      })
}