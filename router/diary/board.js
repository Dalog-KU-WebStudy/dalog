const express = require("express");
const router = express.Router();
const path = require("path");
const dbconfig = require("../config/dbconfig");
const mysql = require("mysql");
const connection = mysql.createConnection(dbconfig);
connection.connect();

// router.get("/diary/get", function (req, res) {
//   console.log("diary get 실행");
//   if (req.user) {
//     connection.query(
//       "select * from diary where user_id=?",
//       [req.user.user_id],
//       function (err, rows) {
//         if (err) {
//           throw err;
//         }
//         if (rows) {
//           res.send(rows);
//         }
//       }
//     );
//   } else {
//     res.send(
//       "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
//     );
//   }
// });
