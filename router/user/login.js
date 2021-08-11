const path = require('path');

module.exports = function(router, passport){
const login_passport=require('../../passport/login');
login_passport(passport);

router.get('/user/login',(req,res)=>{
    console.log('login page');
    res.sendFile(path.join(__dirname, '../../public/user/login.html'));
})

router.post('/user/login', function(req,res,next){
    passport.authenticate('local-login', function(err,user,info){
        if(err) res.send("<script>alert('오류가 발생하였습니다.');location.href='/user/login';</script>");
        if(!user) return res.send("<script>alert('아이디 또는 비밀번호를 확인해주세요.');history.back();</script>");;

        req.logIn(user, function(err){
            if(err) return next(err);
            return res.redirect('/');
        })
    })(req,res,next);
})
}