const express = require('express');
const static = require('serve-static');
const path = require('path');
const ejs = require('ejs');
const router = express.Router();
var passport = require('passport')
const router_index = require('./router/index');
const google_login = require('./passport/google');
const KakaoStrategy = require('passport-kakao').Strategy;
const naverStrategy = require('passport-naver').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require("passport-local").Strategy;
var session = require('express-session')
var flash = require('connect-flash')
var user_join = require("./router/user/join");
const MySQLStore = require('express-mysql-session');

const app = express();
app.listen(3000, function(){
    console.log('server start');
})

app.use(express.static('public'));
app.use(express.static('uploads'));
// app.use('/uploads', static(path.join(__dirname,'uploads')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use("local-join", user_join);

app.use(router);
router_index(app, router, passport);


google_login(app);
