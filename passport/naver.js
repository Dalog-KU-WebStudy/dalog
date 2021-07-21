const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const config = require('./naver_config');
const mysql = require('mysql');
// const pool = mysql.createPool(config.db);
const connection = mysql.createConnection(config.db);
connection.connect();

module.exports = function(app){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    passport.use(new NaverStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callback_url,
        svcType: 0  // optional. see http://gamedev.naver.com/index.php/%EC%98%A8%EB%9D%BC%EC%9D%B8%EA%B2%8C%EC%9E%84:OAuth_2.0_API
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //console.log("profile=");
            //console.log(profile);
            // data to be saved in DB
            user = {
                name: profile.displayName,
                email: profile.emails[0].value,
                // birthday: profile.naver.birthday,
                username: profile.displayName,
                provider: 'naver',
                naver: profile._json
            };
            //console.log("user=");
            console.log(user);

            // if(pool) {
            //     pool.getConnection((err,conn)=>{
            //         if(err){
            //             console.log(err);
            //             return;
            //         } else {
            //             console.log('db 연결 성공');
            //             const sql = conn.query(`select name from dalog_user where id=${user.naver.id}`,(err,result)=>{
            //                 conn.release();
            //                 if(err){

            //                 }
            //             });
            //             // const sql = conn.query('insert into dalog_user (user_id, password, name, birth, email, phone) values(?,?,?,?,?,?)', ['testid','1234','test','1999-01-01','test@naver.com','010-0000-0000'], (err, result)=>{
            //             //     conn.release();
            //             //     if(err){
            //             //         console.log('insert test fail');
            //             //     } else {
            //             //         console.log('insert test success');
            //             //     }
            //             // });
            //         }
            //     })
            // }
            // else {
            //     console.log('db 연결 실패');
            // }

            const query = connection.query('select * from dalog_user where user_id=?',user.naver.id, (err,result)=>{
                if(err) {
                    return done(err);
                } else {
                    if(result.length==0) {
                        // 신규 유저 회원가입 이후 로그인
                        console.log('new user')
                        const sql = 'insert into dalog_user (user_id, name, birth, email, phone) values (?,?,?,?,?)';
                        connection.query(sql, [user.naver.id, user.naver.name, user.naver.birthday, user.naver.email, user.naver.phone], (err,result)=>{
                            if(err){
                                return done(err);
                            } else {
                                console.log('new user login');
                                done(null, profile);
                            }
                        })
                    } else {
                        //기존 유저 로그인
                        console.log('old user');
                        done(null, profile);
                    }
                }

                
            })

            return done(null, profile);
        });
    }));


    // passport.use(new NaverStrategy({
    //     clientID: config.clientID,
    //     clientSecret: config.clientSecret,
    //     callbackURL: config.callback_url
    // },
    //     function (accessToken, refreshToken, profile, done) {
    //         var _profile = profile._json;
    
    //         loginByThirdparty({
    //             'auth_type': 'naver',
    //             'auth_id': _profile.id,
    //             'auth_name': _profile.nickname,
    //             'auth_email': _profile.email
    //         }, done);
    //     }
    // ));
}

function loginByThirdparty(info, done) {
    console.log('process : ' + info.auth_type);
    var stmt_duplicated = 'select * from `user` where `user_id` = ?';

    connection.query(stmt_duplicated, info.auth_id, function (err, result) {
        if (err) {
            return done(err);
        } else {
            if (result.length === 0) {
                // 신규 유저는 회원 가입 이후 로그인 처리
                var stmt_thridparty_signup = 'insert into `user` set `user_id`= ?, `nickname`= ?';
                connection.query(stmt_thridparty_signup, [info.auth_id, info.auth_name], function (err, result) {
                    if (err) {
                        return done(err);
                    } else {
                        done(null, {
                            'user_id': info.auth_id,
                            'nickname': info.auth_name
                        });
                    }
                });
            } else {
                //기존유저 로그인 처리
                console.log('Old User');
                done(null, {
                    'user_id': result[0].user_id,
                    'nickname': result[0].nickname
                });
            }
        }
    });
}