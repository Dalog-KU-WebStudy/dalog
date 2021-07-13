const express = require('express');
const static = require('serve-static');
const path = require('path');
const router = express.Router();
const naver_login = require('./user/passport/naver');
var passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const naverStrategy = require('passport-naver').Strategy;
var session = require('express-session')
var flash = require('connect-flash')

const app = express();
app.listen(3000, function(){
    console.log('server start');
})

app.use('/main',express.static(path.join(__dirname,'/index.html')));
app.use('/css',express.static(path.join(__dirname,'/css')));
app.use('/diary',express.static(path.join(__dirname,'/diary')));
app.use('/user',express.static(path.join(__dirname,'/user')));
app.use('/media',express.static(path.join(__dirname,'/media')));
app.use('/summernote',express.static(path.join(__dirname,'/summernote')));
app.use('/user/login', express.static(path.join(__dirname,'/user/login.html')))

app.set('view engine', 'ejs')
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router);
naver_login(app);
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './index.html'));
})
