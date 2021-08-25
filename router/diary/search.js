const dbconfig = require("../../config/dbconfig");
const mysql = require("mysql");
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function (router) {
  router.post("/diary/search", (req, res) => {
    if (req.user) {
      var query1 = connection.query(
        `select * from diary where diary_title like '%${req.body.search}%' and user_id = '${req.user.user_id}'`,
        function (err, rows) {
          if (err) {
            throw err;
          } else {
            console.log(rows);
            if (!rows[0]) {
              console.log("Diary Search : Not exists...");
            } else {
              console.log(rows);
              res.send(rows);
            }
          }
        }
      );
    } else {
      console.log("no user");
      res.send(
        "<script>alert('로그인이 필요한 서비스입니다.');location.href='/user/login';</script>"
      );
    }
  });
};
