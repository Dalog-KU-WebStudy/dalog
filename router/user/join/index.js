const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser');
const mysql = require('mysql')
const fetch = require('node-fetch');
const config = require('./join_config');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const connection = mysql.createConnection(config.db);
connection.connect();


router.use(express.json());
router.use(express.urlencoded({ extended : true}));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended : true}));

fetch('https://httpbin.org/post', {
        method: 'post',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Origin-Allow' : "*", 
        },
})
.then(res => res.json());
// .then(json => console.log(json));

router.get('/', function(req,res){     
    
    console.log('get join url')
    res.sendFile(path.join(__dirname, '../../../public/user/join.html'))
})

passport.serializeUser(function(user,done){
    console.log('passport session save : ',user.id);
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    console.log('passport session get id : ',id);
    done(null,id);
})


// passport.use('local-join', new LocalStrategy({
//     emailField : 'email',
//     passwordField : 'password',
//     nameField : 'name',
//     phoneField : 'phone',
//     passReqToCallback : true
// },function(res,email,password,name,phone,done){

//     var query = connection.query('select * from dalog_user where email=?',[email],function(err,rows){
//         if(err) return done(err);

//         if(rows.length){
//             console.log('existed user')
//             return done (null,false)
//         }else{
//             var sql = {email:email, password:password, name:name, phone:phone};
//             var query = connection.query('insert into dalog_user set ?',sql,(err,rows)=>{
//                 if(err) throw err
//             })
//         }
//     })
// }))

// 회원가입정보 DB에 넣기
router.post('/join', async function(req,res,done){

    console.log("\n====== insert into db ======\n");
    console.log(req.headers);
    console.log(req.body);
    var body = req.body;

    var email = body.userEmail;
    var name = body.userName;
    var passwd = body.userPW;
    var birth_yy = body.yy;
    var birth_mm = body.mm;
    var birth_dd = body.dd;
    var phone = body.phone;

    if(birth_yy == null) birth_yy = "0000";
    if(birth_mm == "월") birth_mm = "00";
    if(birth_dd == null) birth_dd = "00";
    
    var birth = birth_yy + "-" + birth_mm + "-" + birth_dd;

    console.log(email)
    console.log(name)
    console.log(passwd)
    console.log(birth)
    console.log(phone)

    // 해당 id를 가진 user가 존재하는지 찾아본다.
    const sql = "select * from dalog_user where user_id = ?";
    const post = [email];
    connection.query(sql, post, (err, results, fields) => {
    if (err) {
        console.log(err);
        // done(err);
    }

    console.log("==== results ====");
    console.log(results);
    
    if(results.length != 0){    // 중복검사
        console.log("이미 가입한 유저입니다.")
        body.email_error.innerHTML = "이미 가입된 아이디입니다.";
        body.email_error.style.display = "block";
        return done(null, results);
    }

    else if(results.length == 0){
        console.log("신규가입");
        var query = connection.query('insert into dalog_user (user_id, user_pw, user_name, birth, phone) values ("' + email + '","' + passwd + '","' + name + '","' + birth + '","' + phone + '")', function(err, rows) {
            if(err) { throw err;}
            console.log("Data inserted!");
        })

        // 가입이 되었다면 메인페이지로
        res.redirect('/');
    }
    })
})

passport.use('local-login',new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(res,email,password,done){
    var query = connection.query('select * from dalog_user where email=?',[email],function(err,rows){
        if(err) return done(err);

        if(rows.length){
            return done(null,{'email' : email, 'password' : password})
        }else{
            console.log("fail!")
            return done(null, false, {'message':'not found'})
        }
    })
}))

router.post('/',function(req,res,next){
    passport.authenticate('local-login',function(err,user,info){
        if(err) {res.status(500).json(err);} 
        if(!user) {return res.status(401).json(info.message);}
        
        req.logIn(user,function(err){
            if(err) {return next(err);}
            return res.json(user);
        });    
    }) (req,res,next);
})


module.exports = router;