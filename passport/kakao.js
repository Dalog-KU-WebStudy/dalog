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

// kakao 객체 생성
const kakao={
    clientID: '169381b5824258f2de96b86eb52f827a',
    clientSecret: 'lBsCL5TbPK0yI8Epfyi4QMU2uCqWHgYW',
    redirectUri: 'http://localhost:3000/login/kakao/callback'
};


// 카카오 로그인 페이지 연결 만들기
// profile, account_email
router.get('/login/kakao',(req,res)=>{
    const kakaoAuthURL = 'https://kauth.kakao.com/oauth/authorize?client_id='+ kakao.clientID +'&redirect_uri=' + kakao.redirectUri + '&response_type=code&scope=profile_nickname,account_email,birthday';
    res.redirect(kakaoAuthURL);
})


// 로그인 이후 나올 페이지 설정 - axios를 통한 비동기통신 
// 페이지가 바뀌지 않고도 정보를 주고 받을 수 있다
router.get('/login/kakao/callback', async(req,res)=>{
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

    res.send('success'); // 일단 연결성공 시 브라우저에 success 표시, 추후 수정예정
})


// 정보 페이지 설정
router.get('/public/user/join.html',(req,res)=>{
    let {profile_nickname,account_email,birthday}=req.session.kakao.properties;
    res.render('/public/user/join.html',{
        profile_nickname, account_email, birthday,
    })
})
 
 
router.get('/',(req,res)=>{   
    res.render('../public/index.html');
});
 
router.get(kakao.redirectUri)


module.exports = router;