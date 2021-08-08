var KakaoStrategy = require('passport-kakao').Strategy;
const kakao_config = require('../config/kakao_config');
const dbconfig = require('../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
const sha256 = require('sha256');
connection.connect();

module.exports = function(passport){

    // '/kakao' 로 요청이들어오면 kakao-login 전략을 이용함

    passport.use('kakao-login', new KakaoStrategy({
        clientID: kakao_config.clientID,
        clientSecret: kakao_config.clientSecret,
        callbackURL: kakao_config.callback_url,
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            const str = profile._json.kakao_account.birthday;
            var output = [str.slice(0, 2), '-', str.slice(2)].join('');
            // console.log(output);
            const NewUserBirth = "0000-" + output;
            user = {
                user_id: profile._json.kakao_account.email,
                name: profile.username,
                password: String(sha256.x2(String(profile.id))),
                birthday: NewUserBirth,
                provider: 'kakao',
            };
            console.log(user);
            const query = connection.query(`select * from dalog_user where user_id=?`, user.user_id, (err, result) => {
                if (err) {
                    return done(err);
                } else {
                    if (result.length == 0) {
                        // 신규 유저 회원가입 이후 로그인
                        console.log('new user')
                        const sql = 'insert into dalog_user (user_id, user_pw, user_name, birth) values (?,?,?,?)';
                        connection.query(sql, [user.user_id, user.password, user.name, user.birthday], (err, result) => {
                            if (err) {
                                return done(err);
                            } else {
                                console.log('new user login');
                                done(null, user);
                            }
                        })
                    } else {
                        //기존 유저 로그인
                        console.log('old user');
                        done(null, user);
                    }
                }
            })
        });

        // return done(null, profile); // 성공시 profile로 값이 넘어옵니다.
    }));
}
