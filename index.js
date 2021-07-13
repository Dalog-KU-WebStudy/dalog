const express = require('express');
const static = require('serve-static');
const path = require('path');
const router = express.Router();
const naver_login = require('./user/passport/naver');

const app = express();
app.listen(3000, function(){
    console.log('server start');
})

app.use('/index.html',express.static(path.join(__dirname,'/index.html')));
app.use('/css',express.static(path.join(__dirname,'/css')));
app.use('/diary',express.static(path.join(__dirname,'/diary')));
app.use('/user',express.static(path.join(__dirname,'/user')));
app.use('/media',express.static(path.join(__dirname,'/media')));
app.use('/summernote',express.static(path.join(__dirname,'/summernote')));


app.use(router);
naver_login(app);
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './index.html'));
})
