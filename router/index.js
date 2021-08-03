const express = require('express');
const router = express.Router();
const path = require('path');

// const passport = require('passport');
// const app = express();

module.exports = function(router,passport){
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

    const kakao_login = require('../passport/kakao');
    kakao_login(passport);

    router.get('/login/kakao', passport.authenticate('kakao-login'));

    router.get('/login/kakao/callback', passport.authenticate('kakao-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));


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

    const user_join = require('./user/join');
    user_join(passport);

    //라우터 처리 
    router.get('/user/join', (req, res)=>{
        console.log('get join url');
        var msg; 
        var errMsg = req.flash('error'); 
        if(errMsg) msg = errMsg; 
        res.sendFile(path.join(__dirname, '../public/user/join.html'))
    }); 

    router.post('/user/join', passport.authenticate('local-join',{ 
        // successRedirect : '/', //인증성공시 이동하는화면주소 
        failureRedirect : '/user/join', //인증실패시 이동하는화면주소 
        failureFlash : true //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨. 
    }), function(req, res){
        res.redirect('/profile');
    });

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


    const user_modify = require('./user/modify');
    // router.get('/user/modify', function(req,res){
        // })
    user_modify(router, profile);
    // router.use('/user/modify', user_modify);

    const logout = require('./user/logout');
    router.use('/user/logout', logout);
}

// module.exports = router;

