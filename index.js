const express = require('express');
const static = require('serve-static');
const path = require('path');
const router = express.Router();
const router_index = require('./router/index');
// const naver_login = require('./passport/naver');
const google_login = require('./passport/google');
const kakao_login = require('./passport/kakao');
var passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy;
const naverStrategy = require('passport-naver').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var session = require('express-session')
var flash = require('connect-flash')

const app = express();
app.listen(3000, function(){
    console.log('server start');
})

app.use(express.static('public'));

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
router_index(router, passport);
// app.use(router_index);


// naver_login(app);
google_login(app);
app.use(kakao_login);
app.get('/', function(req,res){
    console.log('?????');
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// // naver 로그인
// router.get('/login/naver',
//     passport.authenticate('naver')
// );
// // naver 로그인 연동 콜백
// router.get('/login/naver/callback',
//     passport.authenticate('naver', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     })
// );