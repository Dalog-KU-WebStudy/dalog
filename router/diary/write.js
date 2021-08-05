const express= require('express');
const static = require('serve-static');
const multer = require('multer');
const path = require('path');
const router = express.Router();


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

        res.redirect('/diary/view');
    })

}