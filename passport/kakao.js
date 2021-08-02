// const passport = require('passport');
// const express = require('express');
// const app = express();
// const nunjucks = require('nunjucks');
// const axios = require('axios');
// const qs = require('qs');
// const mysql = require('mysql');
// const router = express.Router();
// const path = require('path');
// const kakao_config = require('./kakao_config');
// const connection = mysql.createConnection(kakao_config.db);
// const KakaoStrategy = require('passport-kakao').Strategy;
// const sha256 = require('sha256');

// connection.connect();

// // kakao 객체 생성
// const kakao={
//     clientID: kakao_config.clientID,
//     clientSecret: kakao_config.clientSecret,
//     redirectUri: kakao_config.callback_url
// };


// // 카카오 로그인 페이지 연결 만들기
// // profile, account_email
// router.get('/login/kakao',(req,res)=>{
//     const kakaoAuthURL = 'https://kauth.kakao.com/oauth/authorize?client_id='+ kakao.clientID +'&redirect_uri=' + kakao.redirectUri + '&response_type=code&scope=profile_nickname,account_email,birthday';
//     res.redirect(kakaoAuthURL);
// })


// // 로그인 이후 나올 페이지 설정 - axios를 통한 비동기통신 
// // 페이지가 바뀌지 않고도 정보를 주고 받을 수 있다
// router.get('/login/kakao/callback', async(req,res)=>{

//     const { session, query } = req;
//     const { code } = query;

//     // axios>>promise object
//     try{// access 토큰을 받기 위한 코드
//         token = await axios({
//             method:'POST',
//             url: 'https://kauth.kakao.com/oauth/token',
//             headers:{
//                 'content-type':'application/x-www-form-urlencoded'
//             },
//             data:qs.stringify({
//                 grant_type: 'authorization_code',   // 특정 스트링
//                 client_id:kakao.clientID,
//                 client_secret:kakao.clientSecret,
//                 redirect_uri:kakao.redirectUri,
//                 code:req.query.code,    // 결과값을 반환했다. 안됐다.
//             })// 객체를 string으로 변환
//         })
//     } catch(err){
//         res.json(err.data);
//     }

//     const { access_token } = token.data;

//     // access 정보를 사용하여 사용자의 정보를 카카오측에 요청
//     let user;
//     try{
//         /*
//         console.log("=====token info====");
//         console.log(token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
//         */
//         user = await axios({
//             method:'get',
//             url:'https://kapi.kakao.com/v2/user/me',
//             headers:{
//                 Authorization: `Bearer ${access_token}`
//             }// 헤더에 내용을 보고 보내주겠다.
//         })
//     }catch(e){
//         res.json(e.data);
//     }

//     /*
//     console.log("======user info======");
//     console.log(user);
//     */

//     const authData = {
//         ...token.data,
//         ...user.data
//     };

//     const result = linkUser(session, "kakao", authData);
//     console.log("=== link user ===");
//     console.log(result);
//     console.log("==== AuthData ====");
//     console.log(authData);

//     if(result){
//         console.info("계정에 연결되었습니다.");
        
//         const NewUserId = authData.kakao_account.email;
//         const NewUserPassword = String(sha256.x2(String(authData.id)));
//         const NewUserName = authData.properties.nickname;

//         // birthday 형식 수정
//         // 근데 연도를 못 가져오네...
//         // 초기 연도 : 0000
//         const str = authData.kakao_account.birthday;
//         var output = [str.slice(0, 2), '-', str.slice(2)].join('');
//         // console.log(output);
//         const NewUserBirth = "0000-" + output;

//         // 해당 id를 가진 user가 존재하는지 찾아본다.
//         const sql = "select * from dalog_user where user_id = ?";
//         const post = [NewUserId];
//         connection.query(sql, post, (err, results, fields) => {
//         if (err) {
//             console.log(err);
//             // done(err);
//         }

//         // 만약 해당 유저가 존재하지 않는다면,
//         // 새로운 아이디를 하나 만들어주고 로그인을 시켜줌.
//         if (results.length === 0) {
//             const sql = "INSERT dalog_user(user_id, user_pw, user_name, birth) values(?,?,?,?)";
//             const post = [NewUserId, NewUserPassword, NewUserName, NewUserBirth];
//             connection.query(sql, post, (err, results, fields) => {
//             if (err) {
//                 console.log(err);
//                 // done(err);
//             }

//             // 가입이 되었다면 해당 유저로 바로 로그인시켜줌 
//             const sql = "SELECT * FROM dalog_user where user_id =?";
//             const post = [NewUserId];
//             connection.query(sql, post, (err, results, fields) => {
//                 if (err) {
//                 console.log(err);
//                 // done(err);
//                 }
//                 const user = results[0];
//                 return user;
//             });
//             });
//         } else {
//             // 이미 유저가 존재한다면 바로 로그인시켜줌.
//             const user = results[0];
//             console.log("이미 존재하는 유저입니다. ");
//             return user;
//         }
//         })
//     } else{
//         console.warn("이미 연결된 계정입니다.");
//     }

//     req.session.kakao = user.data;

//     if(!user) res.redirect('/login');
//     else res.redirect('/');

// })

// // 사용자 앱 연결 해제

// /*
// router.get("/unlink", async(req, res) => {
//     const{ session } = req;
//     const {access_token} = session.authData.kakao;

//     let unlinkResponse;
//     try{
//         unlinkResponse = await axios({
//             method: "POST",
//             url: "https://kapi.kakao.com/v1/user/unlink",
//             headers: {
//                 Authorization: `Bearer ${access_token}`
//             }
//         });
//     } catch(err){
//         return res.json(err.data);
//     }

//     console.log("==== unlinkResponse.data ====");
//     console.log(unlinkResponse.data);

//     const { id } = unlinkResponse.data;

//     const result = unlinkUser(session, "kakao", id);

//     if (result) {
//         console.log("연결 해제되었습니다.");
//     } else {
//         console.log("카카오와 연동된 계정이 아닙니다.");
//     }

//     res.redirect("/");
// })
// */

// // 정보 페이지 설정
// router.get('/user/join.html',(req,res)=>{
//     let {profile_nickname,account_email,birthday}=req.session.kakao.properties;
//     res.render('/user/join.html',{
//         profile_nickname, account_email, birthday,
//     })
// })


// module.exports = router;

// /*
// function userLogin(accessToken, refreshToken, user, done){
//     const NewUserId = "kakao:" + user.data.id;
//     const NewUserPassword = sha256.x2(NewUserId);
//     //해당 id를 가진 user가 존재하는지 찾아본다.
//     const sql = "select * from dalog_user where user_name = ?";
//     const post = [NewUserId];
//     connection.query(sql, post, (err, results, fields) => {
//     if (err) {
//         console.log(err);
//         done(err);
//     }
//     //만약 해당 유저가 존재하지 않는다면,
//     //새로운 아이디를 하나 만들어주고 로그인을 시켜줌.
//     if (results.length === 0) {
//         const sql = "INSERT dalog_user(user_name, user_pw) values(?,?)";
//         const post = [NewUserId, NewUserPassword];
//         connection.query(sql, post, (err, results, fields) => {
//         if (err) {
//             console.log(err);
//             done(err);
//         }
//         //가입이 되었다면 해당 유저로 바로 로그인시켜줌
//         const sql = "SELECT * FROM dalog_user where user_name =?";
//         const post = [NewUserId];
//         connection.query(sql, post, (err, results, fields) => {
//             if (err) {
//             console.log(err);
//             done(err);
//             }
//             const user = results[0];
//             return done(null, user);
//         });
//         });
//     } else {
//         //이미 유저가 존재한다면 바로 로그인시켜줌.
//         const user = results[0];
//         return done(null, user);
//     }
// })
// }
// */
// function linkUser(session, provider, authData){
//     let result = false;
//     if(session.authData) {
//         if(session.authData[provider]){
//             // 이미 계정에 provider가 연결되어 있는 경우
//             return result;
//         }

//         session.authData[provider] = authData;
//     } else{
//         session.authData = {
//             [provider] : authData
//         };
//     }

//     result = true;

//     return result;
// }

// /*
// function unlinkUser(session, provider, userId) {
//     let result = false;
  
//     if (
//       session.authData &&
//       session.authData[provider] &&
//       session.authData[provider].id === userId
//     ) {
//       delete session.authData[provider];
//       result = true;
//     }
//     return result;
// }
// */

var KakaoStrategy = require('passport-kakao').Strategy;
const kakao_config = require('./kakao_config');
const mysql = require('mysql');
const connection = mysql.createConnection(kakao_config.db);
const sha256 = require('sha256');
connection.connect();

module.exports = function(passport){

    // '/kakao' 로 요청이들어오면 kakao-login 전략을 이용함
    // router.get('/login/kakao', passport.authenticate('kakao-login'));

    passport.use('kakao-login', new KakaoStrategy({
        clientID: kakao_config.clientID,
        clientSecret: kakao_config.clientSecret,
        callbackURL: kakao_config.callback_url,
    }, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            const str = profile._json.kakao_account.birthday;
            var output = [str.slice(0, 2), '-', str.slice(2)].join('');
            // console.log(output);
            const NewUserBirth = "0000-" + output;
            user = {
                name: profile.username,
                email: profile._json.kakao_account.email,
                password: String(sha256.x2(String(profile.id))),
                birthday: NewUserBirth,
                provider: 'kakao',
            };
            console.log(user);
            const query = connection.query(`select * from dalog_user where user_id=?`, user.email, (err, result) => {
                if (err) {
                    return done(err);
                } else {
                    if (result.length == 0) {
                        // 신규 유저 회원가입 이후 로그인
                        console.log('new user')
                        const sql = 'insert into dalog_user (user_id, user_pw, user_name, birthday) values (?,?,?)';
                        connection.query(sql, [user.email, user.password, user.name, user.birthday], (err, result) => {
                            if (err) {
                                return done(err);
                            } else {
                                console.log('new user login');
                                done(null, profile);
                            }
                        })
                    } else {
                        //기존 유저 로그인
                        console.log('old user');
                        done(null, profile);
                    }
                }
            })
        });

        // return done(null, profile); // 성공시 profile로 값이 넘어옵니다.
    }));
      
    // router.get('/login/kakao/callback', passport.authenticate('kakao-login', {
    //     successRedirect: '/profile',
    //     failureRedirect: '/login'
    // }));
}
