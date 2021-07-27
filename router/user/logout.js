const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    req.logout();
    res.redirect('/user/login.html');
})

module.exports = router;