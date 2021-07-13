const express = require('express');
const app = express();
const nunjucks  =require('nunjucks');
const axios = require('axios');
const qs = require('qs');
const session = require('express-session');
const router = express.Router();
const passport = require('passport')
const path = require('path');
const KakaoStrategy = require('passport-kakao').Strategy;



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

// kakao 객체 생성
const kakao={
    clientID: '169381b5824258f2de96b86eb52f827a',
    clientSecret: 'lBsCL5TbPK0yI8Epfyi4QMU2uCqWHgYW',
    redirectUri: 'http://localhost:3000/user/login/kakao'
};


// 카카오 로그인 페이지 연결 만들기
// profile, account_email
router.get('/user/login/kakao',(req,res)=>{
    const kakaoAuthURL = 'https://kauth.kakao.com/oauth/authorize?client_id=169381b5824258f2de96b86eb52f827a&redirect_uri=http://localhost:3000/user/login/kakao&response_type=code&scope=profile_nickname,account_email,birthday'
    res.redirect(kakaoAuthURL);
})


// 로그인 이후 나올 페이지 설정 - axios를 통한 비동기통신 
// 페이지가 바뀌지 않고도 정보를 주고 받을 수 있다
router.get('/user/login/kakao/callback', async(req,res)=>{
    //axios>>promise object
    try{// access 토큰을 받기 위한 코드
        token = await axios({
            method:'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({
                grant_type: 'authorization_code',//특정 스트링
                client_id:kakao.clientID,
                client_secret:kakao.clientSecret,
                redirect_uri:kakao.redirectUri,
                code:req.query.code,//결과값을 반환했다. 안됐다.
            })// 객체를 string으로 변환
        })
    } catch(err){
        res.json(err.data);
    }

    // access 정보를 사용하여 사용자의 정보를 카카오측에 요청
    let user;
    try{
        console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
        user = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token.data.access_token}`
            }//헤더에 내용을 보고 보내주겠다.
        })
    }catch(e){
        res.json(e.data);
    }

    console.log(user);

    req.session.kakao = user.data;

    res.send('success');
})


// 정보 페이지 설정
router.get('/user/join.html',(req,res)=>{
    let {profile_nickname,account_email,birthday}=req.session.kakao.properties;
    res.render('/user/join.html',{
        profile_nickname, account_email, birthday,
    })
})
 
 
router.get('/',(req,res)=>{   
    res.render('main');
});
 
router.get(kakao.redirectUri)

/*
passport.use('kakao', new KakaoStrategy({
    clientID: '169381b5824258f2de96b86eb52f827a',
    callbackURL: 'http://localhost:3000/user/login/kakao',     // 위에서 설정한 Redirect URI
  }, async (accessToken, refreshToken, profile, done) => {
    //console.log(profile);
    console.log('access token : ' + accessToken);
    console.log('refresh token : ' + refreshToken);
}));


router.get('/kakao', passport.authenticate('kakao'));

router.get('/user/login/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (res, req) => {
  res.redirect('/');
});
*/
module.exports = router;