const multer = require('multer');
const path = require('path');
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();


module.exports = function(router) {

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


    router.route('/diary/write').post(upload.array('photo',1), (req,res)=> {
        console.log('/diary/write router 호출');
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

        const date=req.body.date;
        const weather=req.body.weather;
        const temp_high=req.body.temp_high;
        const temp_low=req.body.temp_low;
        const title=req.body.title;
        const content=req.body.content;

        console.log(date, weather, temp_high, temp_low, title, content);

        if(req.user){
            const query = connection.query(`insert into diary (user_id, diary_date, diary_title, diary_content, image_dir, weather, temp_high, temp_low) values (?,?,?,?,?,?,?,?)`,[req.user.user_id, date, title, content, filename, weather, temp_high, temp_low], (err,result)=>{
                if(err){
                    return res.status(500).json(err);
                } else {
                    console.log('result:  '+result.insertId);
                    res.redirect(`/diary/view/${result.insertId}`);
                }
            })
        } else {
            res.send("<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>");
        }

    })

}