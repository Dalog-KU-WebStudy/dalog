const express = require('express');
const router = express.Router();
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.get('/:id',(req,res)=>{
    console.log(req.params.id+'view get 호출');

    if(req.user){
        const id = req.params.id;
        res.render('view.ejs',{profile:req.user, id:id});

    }else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

router.post('/:id', (req,res)=>{
    console.log(req.params.id+'view post 호출');

    if(req.user){
        const id = req.params.id;
        const user_id = req.user.user_id;
        connection.query(`select * from diary where user_id=? and diary_id=?`,[user_id, id], (err,result)=>{
            if(err) return res.status(500).json(err);
            if(!result[0]){
                console.log('잘못된 접근');
                res.send("wrongId");
            } else {
                console.dir(result[0]);
                res.json(result[0]);
                return;
            }
        })

    }else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

module.exports=router;