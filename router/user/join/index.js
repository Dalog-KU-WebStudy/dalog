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

        console.log("=== req.body ===");
        console.log(req.body);

        console.log("passport의 local-join 호출");

        let profile={};
    
        // 사용자가 입력한 것들 입력받는다.
        var name = req.body.name;
        var birth_yy = req.body.yy;
        var birth_mm = req.body.mm;
        var birth_dd = req.body.dd;
        var phone = req.body.phone;
    
        if(birth_yy == null) birth_yy = "0000";
        if(birth_mm == "월") birth_mm = "00";
        if(birth_dd == null) birth_dd = "00";
        
        var birth = birth_yy + "-" + birth_mm + "-" + birth_dd;
    
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

                    profile.user_id = email;
                    profile.user_pw = password;
                    profile.name = name;
                    profile.birth = birth;
                    profile.phone = phone;
                    profile.provider = 'local';
                                            
                    var query = connection.query('insert into dalog_user (user_id, user_pw, user_name, birth, phone) values ("' + email + '","' + password + '","' + name + '","' + birth + '","' + phone + '")', function(err, rows) {
                        if(err) { throw err;}
                        console.log("Data inserted!");
                        // console.log(rows);
                        done(null, profile);
                    })

                    var query2 = connection.query('insert into title (user_id, title) values ("' + email + '","' + "여기를 눌러 타이틀을 수정하세요!" + '")', function(err, rows){
                        if(err) { throw err;}
                        console.log("Title inserted!");
                        return done(null, profile);
                    })
                } // end...if
    
            });
        }); // nextTick end
    }));
}