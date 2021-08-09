const mysql = require('mysql');
const dbConfig = require('../../config/dbconfig');
const passport = require('passport');
const connection = mysql.createConnection(dbConfig);
const LocalStrategy = require("passport-local").Strategy;
connection.connect();

passport.use('local-join',new LocalStrategy({
    usernameField : "email",
    passwordField:"password",
    passReqToCallback : true
}, function(req, emial, password, done){
    console("LOGIN_check start");
    console(req.body);
}))