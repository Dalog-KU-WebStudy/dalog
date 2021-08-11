const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();
const path = require('path');
const { Router } = require('express');

Router.get('/',(req,res)=>{

    const date = req.body.date;
    const title = req.body.title;
    const content = req.body.content;

    if(req.user){
        var query = connection.query('insert into diary (user_id, diary_date, diary_title,diary_content) values(?,?,?,?)'
        ,[req.user,date,title,content],(err,result)=>{
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