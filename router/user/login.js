const mysql = require('mysql');
const dbConfig = require('../../config/dbconfig');
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
       var query = connection.query('select * from dalog_user where email=?',[email],function(err,rows){
           if (err) return done(err);
    
           if(rows.length){
               return done(null,{'email' : email, 'id' : rows[0].UID})
           }else{
               console.log("fialldld")
               return done(null,false,{'message' : 'your login info is not found'})
            }     
           
       })
    }));
}
