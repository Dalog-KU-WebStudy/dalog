

const express = require('express');
const router = express.Router();
const path = require('path');

// const passport = require('passport');
// const app = express();

module.exports = function(app, router,passport){
// passport.serializeUser(function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// });


const naver_login = require('../passport/naver');
naver_login(passport);
// router.use('/login/naver', naver_login);
// passport.use('naver', new naver_login(passport));


//라우터 등록
router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
})
router.get('/user/login', function(req,res){
    res.sendFile(path.join(__dirname, '../public/user/login.html'));
})
router.get('/diary/write', function(req,res){
    res.sendFile(path.join(__dirname, '../public/diary/write.html'));
})
router.get('/diary/view', function(req,res){
    res.sendFile(path.join(__dirname, '../public/diary/view.html'));
})
router.get('/diary/edit', function(req,res){
    res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
})
router.get('/diary/board_grid', function(req,res){
    res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
})
router.get('/diary/board_row', function(req,res){
    res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
})


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

router.get('/profile', function(req,res){
    console.log(req.user);
    res.redirect('/');
})


const user_join = require('./user/join/index');
router.use('/user/join', user_join);

const user_modify = require('./user/modify');
user_modify(router);

const user_delete = require('./user/delete');
router.use('/user/delete', user_delete);

const logout = require('./user/logout');
router.use('/user/logout', logout);
}

const diary_write = require('./diary/write');
diary_write(router);
// router.use('/diary/write', diary_write);

// module.exports = router;

