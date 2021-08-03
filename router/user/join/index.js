// const express = require('express')
// const router = express.Router()
// const path = require('path')
// const mysql = require('mysql')
// const fetch = require('node-fetch');
// const config = require('./join_config');
// const connection = mysql.createConnection(config.db);

// connection.connect();


// router.use(express.json());
// router.use(express.urlencoded({ extended : true}));

// fetch('https://httpbin.org/post', {
//         method: 'post',
//         headers: { 
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Access-Control-Origin-Allow' : "*", 
//         },
// })
// .then(res => res.json());
// // .then(json => console.log(json));

// router.get('/', function(req,res){
//     console.log('get join url')
//     res.sendFile(path.join(__dirname, '../../../public/user/join.html'))
// })


// // 회원가입정보 DB에 넣기
// router.post('/user/join', function(req,res,done){

//     console.log("\n====== insert into db ======\n");
//     console.log(req.headers);
//     console.log(req.body);
//     var body = req.body;

//     var email = body.userEmail;
//     var name = body.userName;
//     var passwd = body.userPW;
//     var birth_yy = body.yy;
//     var birth_mm = body.mm;
//     var birth_dd = body.dd;
//     var phone = body.phone;

//     if(birth_yy == null) birth_yy = "0000";
//     if(birth_mm == "월") birth_mm = "00";
//     if(birth_dd == null) birth_dd = "00";
    
//     var birth = birth_yy + "-" + birth_mm + "-" + birth_dd;

//     // 해당 id를 가진 user가 존재하는지 찾아본다.
//     const sql = "select * from dalog_user where user_id = ?";
//     const post = [email];
//     connection.query(sql, post, (err, results, fields) => {
//     if (err) {
//         console.log(err);
//         // done(err);
//     }

//     console.log("==== results ====");
//     console.log(results);
    
//     if(results.length != 0){    // 중복검사
//         console.log("이미 가입한 유저입니다.")
//         body.email_error.innerHTML = "이미 가입된 아이디입니다.";
//         body.email_error.style.display = "block";
//         return done(null, results);
//     }

//     else if(results.length == 0){
//         console.log("신규가입");
//         var query = connection.query('insert into dalog_user (user_id, user_pw, user_name, birth, phone) values ("' + email + '","' + passwd + '","' + name + '","' + birth + '","' + phone + '")', function(err, rows) {
//             if(err) { throw err;}
//             console.log("Data inserted!");
//         })

//         // 가입이 되었다면 메인페이지로
//         res.redirect('/');
//     }
//     })
// })


// module.exports = router;

const mysql = require('mysql')
const dbconfig = require('../../../config/dbconfig');
const passport = require('passport');
const connection = mysql.createConnection(dbconfig);
const LocalStrategy = require("passport-local").Strategy;

connection.connect();

module.exports = function(passport){
    passport.use('local-join', new LocalStrategy({
        usernameField : "email",
        passwordField : "password",
    
        // 아래 콜백함수의 첫번째 파라미터로 req 객체 전달
        passReqToCallback : true
    
    }, function(req, email, password, done) {
    
        // 사용자가 입력한 것들 입력받는다.
        var name = req.body.name || req.query.name;
        var birth_yy = req.body.yy || req.query.yy;
        var birth_mm = req.body.mm || req.query.mm;
        var birth_dd = req.body.dd || req.query.dd;
        var phone = req.body.phone || req.query.phone;
    
        if(birth_yy == null) birth_yy = "0000";
        if(birth_mm == "월") birth_mm = "00";
        if(birth_dd == null) birth_dd = "00";
        
        var birth = birth_yy + "-" + birth_mm + "-" + birth_dd;
    
        console.log("passport의 local-join 호출");
        console.log(email + ":" + pwd);
    
        process.nextTick(function(){
    
            // 해당 id를 가진 user가 존재하는지 찾아본다.
            const sql = "select * from dalog_user where user_id = ?";
            const post = [email];
            connection.query(sql, post, (err, user) => {
                
                // 조회하다가 에러 발생한 경우
                if(err) { return done(err); }
    
                // 1. 이미 등록된 사용자가 있는 경우
                if(user.length) {
                    console.log("이미 등록된 계정입니다.");
    
                    // 검증 콜백에서 두번째 파라미터를 false로 해서 인증 실패처리
                    return done(null, false, req.flash("joinMessage", "이미 등록된 계정입니다."));
                } else {
                    // 2. 등록되지 않은 경우
                    console.log("등록된 사용자가 없으므로 회원가입 진행");
                                            
                    var query = connection.query('insert into dalog_user (user_id, user_pw, user_name, birth, phone) values ("' + email + '","' + password + '","' + name + '","' + birth + '","' + phone + '")', function(err, rows) {
                        if(err) { throw err;}
                        console.log("Data inserted!");
                        console.log(rows);
                        return done(null, rows);
                    })
    
                    // 가입이 되었다면 메인페이지로
                    // res.redirect('/');
                        
                    user.save(function(err){
                    
                        if(err) {throw err;} // 북마크 - 여기서 에러남
                        
                        console.log("사용자 데이터 추가 완료");
                        
                        res.redirect('/');
                        
                        return done(null, user);
                    });
                } // end...if
    
            });
        }); // nextTick end
    }));
}