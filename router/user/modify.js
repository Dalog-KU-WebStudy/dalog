const express = require('express');
const router = express.Router();
const path = require('path');
var session = require('express-session');

module.exports = function(router, profile) {
router.get('/user/modify', function(req,res){
    console.log('modify')
    console.log(profile);
    
    res.sendFile(path.join(__dirname, '../../public/user/modify.html'));
})
}

// module.exports = router;