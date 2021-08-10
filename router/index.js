const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = function(app, router,passport){
    const naver_login = require('../passport/naver');
    naver_login(passport);

    const kakao_login = require('../passport/kakao');
    kakao_login(passport);

    router.get('/login/kakao', passport.authenticate('kakao-login'));
    router.get('/login/kakao/callback', passport.authenticate('kakao-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));
    

    router.get('/', function(req,res){
        console.log('main page');
        res.render('index.ejs',{profile:req.user});
    })
    

    router.get('/diary/write', function(req,res){
        if(!req.user){
            res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        } else {
            res.sendFile(path.join(__dirname, '../public/diary/write.html'));
        }
    })
    router.get('/diary/view', function(req,res){
        // if(!req.user){
        //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        // } else {
        //     res.sendFile(path.join(__dirname, '../public/diary/view.html'));
        // }
        res.sendFile(path.join(__dirname, '../public/diary/view.html'));
    })
    router.get('/diary/edit', function(req,res){
        // if(!req.user){
        //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        // } else {
        //     res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
        // }
        res.sendFile(path.join(__dirname, '../public/diary/edit.html'));
    })
    router.get('/diary/board_grid', function(req,res){
        // if(!req.user){
        //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        // } else {
        //     res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
        // }
        res.sendFile(path.join(__dirname, '../public/diary/board_grid.html'));
    })
    router.get('/diary/board_row', function(req,res){
        // if(!req.user){
        //     res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        // } else {
        //     res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
        // }
        res.sendFile(path.join(__dirname, '../public/diary/board_row.html'));
    })

    const user_join = require('./user/join');
    // router.use(user_join);
    user_join(passport);

    router.get('/user/join', (req, res)=>{
        console.log('get join url');
        var msg; 
        var errMsg = req.flash('error'); 
        if(errMsg) msg = errMsg; 
        res.render('join.ejs', {'message' : msg});
    }); 
    
    router.post('/user/join', passport.authenticate('local-join',{             
            successRedirect : '/profile', //인증성공시 이동하는화면주소 
            failureRedirect : '/user/join', //인증실패시 이동하는화면주소 
            failureFlash : true //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨. 
    }));


    // naver 로그인
    router.get('/login/naver',
        passport.authenticate('naver')
    );
    // naver 로그인 연동 콜백
    router.get('/login/naver/callback',
        passport.authenticate('naver', {
            successRedirect: '/profile',
            failureRedirect: '/user/login'
        })
    );

    router.get('/profile', function(req,res){
        console.log("router get profile");
        console.log(req.user);
        res.redirect('/');
    })

    const user_modify = require('./user/modify');
    user_modify(router);

    const user_login = require('./user/login');
    user_login(router, passport);

    const user_delete = require('./user/delete');
    router.use('/user/delete', user_delete);

    const logout = require('./user/logout');
    router.use('/user/logout', logout);

    const diary_write = require('./diary/write');
    diary_write(router);

    const diary_view = require('./diary/view');
    router.use('/diary/view', diary_view);
}