const express = require('express');
const router = express.Router();
const dbconfig = require('../../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
connection.connect();

router.get('/:id', (req,res)=>{
    console.log('delete/:id 호출');
    res.redirect('/diary/board_grid');
})

module.exports = router;