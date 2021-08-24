const express = require('express');
const router = express.Router();
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.post('/', (req,res)=>{
    console.log('delete/:id 호출');

    const diary_id = req.body.diary_id;
    connection.query(`delete from diary where user_id=? and diary_id=?`, [req.user.user_id, diary_id], (err,result)=>{
        if(err){
            return done(err);
        } else {
            console.log(`${req.user.user_id} 회원의 ${diary_id}번째 글 삭제`);

            console.log(req.cookies['board']);
            let board = req.cookies['board'];
            res.redirect(`/diary/board_${board}`);
        }
    })
})

module.exports = router;