const express = require('express');
const router = express.Router();
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function(app,router) {
router.get('/diary/edit/:id', (req,res)=>{
    console.log('edit/:id 호출 '+req.params.id);
    
    if(req.user){
        const id = req.params.id;
        const user_id = req.user.user_id;

        connection.query(`select * from diary where user_id=? and diary_id=?`,[user_id, id], (err,result)=>{
            if(err) return res.status(500).json(err);
            if(!result[0]){
                console.log('잘못된 접근');
                res.send("<script>alert('잘못된 접근입니다.');location.href='/';</script>");
            } else {
                console.dir(result[0]);
                res.render('edit.ejs',{profile:app.locals.profile, diary:result[0]});
            }
        })
    }
})
}
//module.exports = router;