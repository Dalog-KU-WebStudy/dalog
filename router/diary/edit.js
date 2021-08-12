const express = require('express');
const router = express.Router();
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.get('/:id', (req,res)=>{
    console.log('edit/:id 호출');
    res.redirect('/diary/edit');
})

module.exports = router;