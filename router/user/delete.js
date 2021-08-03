const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../../passport/dbconfig');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.post('/', (req,res)=>{
    console.log('delete router 호출');
    console.dir(req.user);
    
    if(req.user){
        const query = connection.query(`delete from dalog_user where user_id=?`, req.user._json.email, (err,result)=>{
            if(err){
                return done(err);
            } else {
                console.log(req.user._json.email+ '회원 삭제');

                res.redirect('/user/logout');
            }
        })
    }
})

module.exports = router;