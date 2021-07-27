// 필요없음. 혹시 모르니 일단 주석처리만 하고 삭제는 X


/*const express = require('express');
const app = express()
const nunjucks = require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const router = express.Router();
const passport = require('passport')
const path = require('path');

router.get('/', function(req,res){
    var id=req.user;
    if(!req.user) res.render('login.html');
    else res.render('index.html', {'id' : id});
})


// nunjucks 세팅
router.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
})

// session 세팅
router.use(session({
    secret:'ras',
    resave:true,
    secure:false,
    saveUninitialized:false,
}))



router.use('/kakao', require('../passport/kakao'));
router.use('/naver', require('../passport/naver'));


module.exports = router;
*/

const express = require('express');
const router = express.Router();
const path = require('path');
// const passport = require('passport');
// const app = express();

module.exports = function(router,passport){
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


const naver_login = require('../passport/naver');
naver_login(passport);
// router.use('/login/naver', naver_login);
// passport.use('naver', new naver_login(passport));


// naver 로그인
router.get('/login/naver',
    passport.authenticate('naver')
);
// naver 로그인 연동 콜백
router.get('/login/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    })
);
let profile;
router.get('/profile', function(req,res){
    console.log(req.user);
    profile = req.user;
    res.redirect('/');
})
console.log('profile: '+profile);

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const user_modify = require('./user/modify');
// router.get('/user/modify', function(req,res){
    // })
user_modify(router, profile);
// router.use('/user/modify', user_modify);

const logout = require('./user/logout');
router.use('/logout', logout);
}

// module.exports = router;