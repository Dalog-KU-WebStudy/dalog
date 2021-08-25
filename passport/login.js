const mysql = require('mysql');
const dbConfig = require('../config/dbconfig');
const passport = require('passport');
const connection = mysql.createConnection(dbConfig);
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
connection.connect();

module.exports = function(passport){
    passport.use('local-login',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(res, email, password, done){
        console.log('login start');
        var query = connection.query('select * from dalog_user where user_id=?',[email],function(err,rows){
            if (err) return done(err);
            const same = bcrypt.compareSync(password, rows[0].user_pw);
            if(same){
                const profile ={
                    user_id:rows[0].user_id,
                    user_name:rows[0].user_name,
                    birth:rows[0].birth,
                    phone:rows[0].phone,
                    provider:'local'
                }
                return done(null,profile);
            }else{
                console.log("login failed");
                return done(null,false,{'message':'로그인 실패'})
            }     
            
        })
    }));
}
