const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    if(req.user) {
        console.log('logout됨');
        req.logout();
    }
    res.redirect('/user/login');
})

module.exports = router;