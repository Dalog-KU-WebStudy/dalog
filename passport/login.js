const mysql = require('mysql');
const dbConfig = require('../config/dbconfig');
const passport = require('passport');
const connection = mysql.createConnection(dbConfig);
const LocalStrategy = require("passport-local").Strategy;
connection.connect();

module.exports = function(passport){
    passport.use('local-login',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, function(res, email, password, done){
        console.log('login start');
        var query = connection.query('select * from dalog_user where user_id=? and user_pw=?',[email, password],function(err,rows){
            if (err) return done(err);
        
            if(rows.length){
                const profile ={
                    user_id:rows[0].user_id,
                    user_name:rows[0].user_name,
                    birth:rows[0].birth,
                    phone:rows[0].phone,
                    provider:'local'
                }
                return done(null,profile);
            }else{
                console.log("fialldld");
                return done(null,false,{'message':'로그인 실패'})
            }     
            
        })
    }));
}
