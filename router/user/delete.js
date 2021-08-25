const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../../config/dbconfig');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.post('/', (req,res)=>{
    console.log('delete router 호출');
    
    if(req.user){
        console.dir(req.user);
        connection.query(`delete from title where user_id=?`, req.user.user_id, (err,result)=>{
            if(err){
                throw err;
            }
        })
        connection.query(`delete from diary where user_id=?`, req.user.user_id, (err,result)=>{
            if(err){
                throw err;
            }
        })
        connection.query(`delete from calendar where user_id=?`, req.user.user_id, (err,result)=>{
            if(err){
                throw err;
            }
        })
        connection.query(`delete from dalog_user where user_id=?`, req.user.user_id, (err,result)=>{
            if(err){
                throw err;
            } else {
                console.log(req.user.user_id+ '회원 삭제');

                res.redirect('/user/logout');
            }
        })
    }
})

module.exports = router;