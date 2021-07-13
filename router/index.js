const express = require('express');
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