const express = require('express');
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();


module.exports = function(router) {
router.get('/user/modify', function(req,res){
    console.log('modify')
    console.log(req.user._json.email);

    console.log('session: '+ req.session.user_profile.user_id);
    
    // res.sendFile(path.join(__dirname, '../../public/user/modify.html'));

    //naver 경우 req.user의 email값으로 db가져오기
    let profile={};
    if (req.user) {
        const query = connection.query(`select * from dalog_user where user_id=?`, req.user._json.email, (err, result) => {
            if (err) {
                return done(err);
            } else {
                console.log('modify query 실행');
                console.dir(result[0]);

                // profile 객체에 값 넣기
                profile.user_id = req.user._json.email;
                profile.user_pw = result[0].user_pw;
                profile.user_name = result[0].user_name;
                profile.birth = result[0].birth;
                profile.phone = result[0].phone;

                
                console.dir(profile);
                renderModify(res,profile);

            }
        })
    }
})
}

const renderModify = function(res,profile){
    res.render('modify.ejs', {profile:profile});
}