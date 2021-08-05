// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const naverConfig = require('../config/naver_config');
const dbconfig = require('../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function(passport) {
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// });

passport.use(new NaverStrategy({
    clientID: naverConfig.clientID,
    clientSecret: naverConfig.clientSecret,
    callbackURL: naverConfig.callback_url,
    //svcType: 0  // optional. see http://gamedev.naver.com/index.php/%EC%98%A8%EB%9D%BC%EC%9D%B8%EA%B2%8C%EC%9E%84:OAuth_2.0_API
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        const str = profile._json.birthday;
        const output = [str.slice(0, 2), '-', str.slice(2)].join('');
        const birth = "0000-" + output;
        user = {
            user_id: profile.emails[0].value,
            name: profile.name,
            birth: birth,
            mobile: profile._json.mobile,
            provider: 'naver'
        };
        console.log(user);
        

        const query = connection.query(`select * from dalog_user where user_id=?`, user.user_id, (err, result) => {
            if (err) {
                return done(err);
            } else {
                if (result.length == 0) {
                    // 신규 유저 회원가입 이후 로그인
                    console.log('new user')
                    const sql = 'insert into dalog_user (user_id, user_name, birth, phone) values (?,?,?,?)';
                    connection.query(sql, [user.user_id, user.name, user.birth, user.mobile], (err, result) => {
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
}));
}
