const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();
const path = require('path');
const router = require('./view');

module.exports=function(router){
    router.post('/',(req,res)=>{
        console.log("simple_diary");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
        if(dd<10){
            dd = '0'+dd;
        }
        if(mm<10){
            mm = '0'+mm;
        }
        var date = yyyy+'-'+mm+'-'+dd;
        const title = req.body.title;
        const content = req.body.content;
    
        if(req.user){
            var query = connection.query('insert into diary (user_id, diary_date, diary_title,diary_content) values(?,?,?,?)'
            ,[req.user.user_id,date,title,content],(err,result)=>{
                if(err){
                    return res.status(500).json(err);
                }else{
                    res.redirect('/diary/view');
                }
            })        
        }
    
        else {
            res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        }
    
    })    
}
