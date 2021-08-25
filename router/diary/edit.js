const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.get('/:id', (req,res)=>{
    console.log('edit/:id get 호출 '+req.params.id);
    
    if(req.user){
        const id = req.params.id;
        res.render('edit.ejs',{profile:req.user, id:id, board: req.cookies['board']});

    } else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

router.post('/:id', (req,res)=>{
    console.log('edit/:id post 호출 '+req.params.id);

    if(req.user){
        const id = req.params.id;
        const user_id = req.user.user_id;
        connection.query(`select * from diary where user_id=? and diary_id=?`,[user_id, id], (err,result)=>{
            if(err) return res.status(500).json(err);
            if(!result[0]){
                console.log('잘못된 접근');
                res.send("wrongId");
            } else {
                console.dir(result[0]);
                res.json(result[0]);
            }
        })
    }
})

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'uploads');
    },
    filename: (req, file, callback)=> {
        //apple.jpg
        const extension = path.extname(file.originalname); //.jpg
        const basename = path.basename(file.originalname, extension); //apple
        callback(null, basename+"_"+Date.now()+extension); //apple_202105231133.jpg
    }
})

const upload = multer({
    storage: storage,
    limits: {
        files:2,
        fileSize: 1024*1024*100
    }
})

router.route('/post/:id').post(upload.array('photo',1), (req,res)=>{
    console.log('edit/post post 호출'+req.params.id);

    const files = req.files;
    console.dir(req.files[0]);

    let originalname='';
    let filename='';
    let mimetype='';
    let size=0;

    if (Array.isArray(files)){
        console.log(`클라이언트에서 받아온 파일 개수 : ${files.length}`);
        for(let i=0; i<files.length; i++) {
            originalname=files[i].originalname;
            filename=files[i].filename;
            mimetype=files[i].mimetype;
            size=files[i].size;
        }
    }

    const id = req.params.id;
    const user_id = req.user.user_id;
    const date=req.body.date;
    const weather=req.body.weather;
    const temp_high=req.body.temp_high;
    const temp_low=req.body.temp_low;
    const title=req.body.title;
    const content=req.body.content;
    console.log(date, weather, temp_high, temp_low, filename, title, content);

    if(req.user){
        if(title===''){
            return res.send("<script>alert('제목을 입력해주세요.');history.go(-1);</script>");
        } else if(content===''){
            return res.send("<script>alert('내용을 입력해주세요.');history.go(-1);</script>");
        }
        if(files[0]){
            console.log('파일있음');
            connection.query(`update diary set diary_date=?,weather=?,temp_high=?,temp_low=?,diary_title=?,diary_content=?,image_dir=? where user_id=? and diary_id=?;`,[date,weather,temp_high, temp_low, title, content, filename, user_id, id], (err,result)=>{
                if(err){
                    return res.status(500).json(err);
                } else {
                    res.redirect(`/diary/view/${id}`);
                }
            })
        } else {
            console.log('파일없음');
            connection.query(`update diary set diary_date=?,weather=?,temp_high=?,temp_low=?,diary_title=?,diary_content=? where user_id=? and diary_id=?;`,[date,weather,temp_high, temp_low, title, content, user_id, id], (err,result)=>{
                if(err){
                    return res.status(500).json(err);
                } else {
                    res.redirect(`/diary/view/${id}`);
                }
            })
        }
    } else {
        res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
    }
})

module.exports = router;