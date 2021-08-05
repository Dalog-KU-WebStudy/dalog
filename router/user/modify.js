const express = require('express');
const bodyParser = require('body-parser');
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();


module.exports = function(router) {
router.get('/user/modify', function(req,res){
    console.log('modify')
    
    //naver 경우 req.user의 email값으로 db가져오기
    if (req.user) {
        console.log(req.user.user_id);
        const query = connection.query(`select * from dalog_user where user_id=?`, req.user.user_id, (err, result) => {
            if (err) {
                return done(err);
            } else {
                console.log('modify query 실행');
                console.dir(result[0]);

                // profile 객체에 값 넣기
                const profile= {
                    user_id : req.user.user_id,
                    user_pw : result[0].user_pw,
                    user_name : result[0].user_name,
                    birth : result[0].birth,
                    phone : result[0].phone,
                    provider : req.user.provider
                }
                
                console.dir(profile);
                res.render('modify.ejs', {profile:profile});

            }
        })
    } else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

router.post('/user/modify', function(req,res){
    console.log('modify post router 호출')

    const user_pw=req.body.new_password;
    const user_name=req.body.user_name;
    let yy= req.body.yy;
    if(!yy){
        yy='1111';
    }
    let mm= req.body.mm;
    if(mm=='월'){
        mm='00';
    }
    let dd= req.body.dd;
    if(!dd){
        dd='00';
    }
    const phone = req.body.phone;
    let birth = yy+'-'+mm+'-'+dd;
    console.log(user_pw, user_name, birth, phone, ' 으로 정보수정');

    if(req.user){
        const query = connection.query(`update dalog_user set user_pw=?,user_name=?, birth=?, phone=? where user_id=?;`, [user_pw, user_name, birth, phone, req.user.user_id], (err,result)=>{
            if(err){
                return done(err);
            } else {
                res.send("<script>alert('정보수정이 완료되었습니다.');location.href='/user/modify';</script>");
            }
        })
    }
})
}