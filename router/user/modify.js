const express = require('express');
const bodyParser = require('body-parser');
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);

const bcrypt = require('bcrypt');
const saltRounds = 10;
connection.connect();


module.exports = function(router) {
router.get('/user/modify', function(req,res){
    console.log('modify')
    
    if (req.user) {
        console.log(req.user.user_id);
        const query = connection.query(`select * from dalog_user where user_id=?`, req.user.user_id, (err, result) => {
            if (err) {
                return done(err);
            } 
            if(result) {
                console.log('modify query 실행');

                const query2 = connection.query(
                    "select title from title where user_id=?",
                    [req.user.user_id],
                    function (err, rows) {
                      if (err) {
                        throw err;
                      }
                      if (rows[0]) {
                        req.user.title = rows[0].title;
                      } else {
                        req.user.title = "여기를 눌러 타이틀을 수정하세요!";
                      }
                    }
                );

                // profile 객체에 값 넣기
                const profile= {
                    user_id : req.user.user_id,
                    user_pw : result[0].user_pw,
                    user_name : result[0].user_name,
                    birth : result[0].birth,
                    phone : result[0].phone,
                    provider : req.user.provider,
                    title: req.user.title
                }

                
                console.dir(profile);
                res.render('modify.ejs', {profile:profile, board: req.cookies['board']});

            } else {
                res.send("<script>alert('회원가입이 필요합니다.');location.href='/user/join';</script>");
            }
        })
    } else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

router.post('/user/modify', function(req,res){
    console.log('modify post router 호출')

    const now_userpw = req.body.now_password;
    const user_pw=req.body.new_password;
    const user_name=req.body.user_name;
    let yy= req.body.yy;
    if(!yy){
        yy='0000';
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
        if(req.user.provider=='local'){
            console.log('로컬')
            const query = connection.query(`select user_pw from dalog_user where user_id=?`,req.user.user_id, (err,result)=>{
                if(err){
                    return done(err);
                }
                if(result){
                    console.log(result[0].user_pw, now_userpw);
                    const same = bcrypt.compareSync(now_userpw, result[0].user_pw);
                    console.log(same);
                    if(!same){
                        console.log('현재 비밀번호 일치하지 않음');
                        res.send("<script>alert('현재 비밀번호가 일치하지 않습니다.');location.href='/user/modify';</script>");
                    } else {
                        if(!user_pw){
                            console.log('현재 비밀번호 입력하지 않음');
                            connection.query(`update dalog_user set user_name=?, birth=?, phone=? where user_id=?;`, [user_name, birth, phone, req.user.user_id], (err,result)=>{
                                if(err){
                                    return done(err);
                                } else {
                                    res.send("<script>alert('정보수정이 완료되었습니다.');location.href='/user/modify';</script>");
                                }
                            })
                        } else {
                            const new_userpw = bcrypt.hashSync(user_pw, saltRounds);
                            const query = connection.query(`update dalog_user set user_pw=?,user_name=?, birth=?, phone=? where user_id=?;`, [new_userpw, user_name, birth, phone, req.user.user_id], (err,result)=>{
                                if(err){
                                    return done(err);
                                } else {
                                    res.send("<script>alert('정보수정이 완료되었습니다.');location.href='/user/modify';</script>");
                                }
                            })
                        }
                    }
                }
            })
        } else {
            const query = connection.query(`update dalog_user set user_name=?, birth=?, phone=? where user_id=?;`, [user_name, birth, phone, req.user.user_id], (err,result)=>{
                if(err){
                    return done(err);
                } else {
                    res.send("<script>alert('정보수정이 완료되었습니다.');location.href='/user/modify';</script>");
                }
            })
        }
    }
})
}