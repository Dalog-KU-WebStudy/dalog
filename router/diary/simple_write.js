const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();
const path = require('path');
<<<<<<< refs/remotes/origin/develop

module.exports=function(router){
    router.post('/question',(req,res)=> {

        console.log("simple write post");
=======
const router = require('./view');

module.exports=function(router){
    router.post('/',(req,res)=>{
        console.log("simple_diary");
>>>>>>> fix : 한줄일기 진행중
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
<<<<<<< refs/remotes/origin/develop
        const simple_title = req.body.selectQuestion;
        console.log("simple title : " + simple_title);
        console.log("=== req.body ===");
        console.log(req.body);
        const content = req.body.answer;

        if(req.user){
            var query = connection.query('insert into diary (user_id, diary_date, diary_title,diary_content) values(?,?,?,?)'
            ,[req.user.user_id,date,simple_title,content],(err,result)=>{
=======
        const title = req.body.title;
        const content = req.body.content;
    
        if(req.user){
            var query = connection.query('insert into diary (user_id, diary_date, diary_title,diary_content) values(?,?,?,?)'
            ,[req.user.user_id,date,title,content],(err,result)=>{
>>>>>>> fix : 한줄일기 진행중
                if(err){
                    return res.status(500).json(err);
                }else{
                    res.redirect('/diary/view');
                }
            })        
        }
<<<<<<< refs/remotes/origin/develop

        else {
            res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        }

    })
}
=======
    
        else {
            res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        }
    
    })    
}
>>>>>>> fix : 한줄일기 진행중
