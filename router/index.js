const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dbconfig = require("../config/dbconfig");
const mysql = require("mysql");
const connection = mysql.createConnection(dbconfig);
connection.connect();

module.exports = function (app, router, passport) {
  router.use(cookieParser());

  const naver_login = require("../passport/naver");
  naver_login(passport);

  const kakao_login = require("../passport/kakao");
  kakao_login(passport);

  router.get("/login/kakao", passport.authenticate("kakao-login"));
  router.get(
    "/login/kakao/callback",
    passport.authenticate("kakao-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
    })
  );

  router.use(function (req, res, next) {
    if (req.user) {
      var query = connection.query(
        "select title from title where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows[0]) {
            req.user.title = rows[0].title;
          } else {
            req.user.title = "여기를 눌러 타이틀을 수정하세요!";
          }
          app.locals.profile = req.user;
          next();
        }
      );
    } else {
      app.locals.profile = req.user;
      next();
    }
  });

  router.get("/diary/get", function (req, res) {
    console.log("diary get 실행");
    if (req.user) {
      connection.query(
        "select * from diary where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows) {
            res.send(rows);
          }
        }
      );
    } else {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    }
  });

  router.get("/", function (req, res) {
    console.log("main page");
    console.log(app.locals.profile);
    if (!req.cookies["board"]) {
      res.cookie("board", "grid", { maxAge: 1000 * 60 * 60 * 24 * 30 });
    }
    console.log(req.cookies["board"]);
    res.render("index.ejs", {
      profile: app.locals.profile,
      board: req.cookies["board"],
    });
  });

  //메모부분

  router.post("/calendar/write", function (req, res) {
    console.log("calendar write post router 호출");
    if (req.user) {
      const query = connection.query(
        `insert into calendar (user_id, cal_date, memo, color) values (?,?,?,?)`,
        [req.user.user_id, req.body.date, req.body.memo, req.body.color],
        (err, result) => {
          if (err) {
            return done(err);
          } else {
            console.log("메모 post 성공");
            res.redirect("/");
          }
        }
      );
    } else {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    }
  });

  router.post("/calendar/edit", function (req, res) {
    console.log("calendar/edit 실행");
    if (req.user) {
      const query = connection.query(
        `update calendar set memo = '${req.body.newMemo}', color = '${req.body.color}' where cal_id= '${req.body.memoId}'`,
        (err, result) => {
          if (err) {
            return done(err);
          } else {
            console.log("메모 edit 성공");
            res.redirect("/");
          }
        }
      );
    } else {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    }
  });

  router.delete("/calendar/delete", function (req, res) {
    console.log("calendar/delete 실행");
    if (req.user) {
      const query = connection.query(
        `delete from calendar where cal_id= '${req.body.memoId}'`,
        (err, result) => {
          if (err) {
            return done(err);
          } else {
            console.log("메모 delete 성공");
            res.redirect("/");
          }
        }
      );
    } else {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    }
  });

  router.get("/calendar/memo", function (req, res) {
    console.log("calendar/memo get 실행");
    req.user &&
      connection.query(
        "select * from calendar where user_id=?",
        [req.user.user_id],
        function (err, rows) {
          if (err) {
            throw err;
          }
          if (rows) {
            res.send(rows);
          }
        }
      );
  });

  router.get("/diary/write", function (req, res) {
    if (!req.user) {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    } else {
      console.log("write get");
      res.render("write.ejs", {
        profile: app.locals.profile,
        board: req.cookies["board"],
      });
    }
  });

  router.get("/diary/board_grid", function (req, res) {
    if (!req.user) {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    } else {
      console.log("board grid get");
      res.cookie("board", "grid", { maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.render("board_grid.ejs", {
        profile: app.locals.profile,
        msg: "",
        row: "",
      });
    }
  });

  router.get("/diary/board_row", function (req, res) {
    if (!req.user) {
      res.send(
        "<script>alert('로그인이 필요합니다.');location.href='/user/login';</script>"
      );
    } else {
      console.log("board row get");
      res.cookie("board", "row", { maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.render("board_row.ejs", {
        profile: app.locals.profile,
        msg: "",
        row: "",
      });
    }
  });

  const user_join = require("./user/join");
  // router.use(user_join);
  user_join(passport);

  router.get("/user/join", (req, res) => {
    console.log("get join url");
    var msg;
    var errMsg = req.flash("joinMessage");
    if (errMsg) msg = errMsg;
    if (!req.user) {
      res.render("join.ejs", { message: msg });
    } else {
      res.send(
        "<script>alert('이미 로그인 되었습니다.');location.href='/';</script>"
      );
    }
  });


  router.post(
    "/user/join",
    passport.authenticate("local-join", {
      successRedirect: "/profile", //인증성공시 이동하는화면주소
      failureRedirect: "/user/join", //인증실패시 이동하는화면주소
      failureFlash: true, //passport 인증하는 과정에서 오류발생시 플래시 메시지가 오류로 전달됨.
    })
  );

  // naver 로그인
  router.get("/login/naver", passport.authenticate("naver"));
  // naver 로그인 연동 콜백
  router.get(
    "/login/naver/callback",
    passport.authenticate("naver", {
      successRedirect: "/profile",
      failureRedirect: "/user/login",
    })
  );

  router.get("/profile", function (req, res) {
    console.log("router get profile");
    console.log(req.user);
    res.redirect("/");
  });

  const user_modify = require("./user/modify");
  user_modify(router);

  const user_login = require("./user/login");
  user_login(router, passport);

  const user_delete = require("./user/delete");
  router.use("/user/delete", user_delete);

  const logout = require("./user/logout");
  router.use("/user/logout", logout);

  const diary_write = require("./diary/write");
  diary_write(router);

  const diary_view = require("./diary/view");
  router.use("/diary/view", diary_view);

  const diary_edit = require("./diary/edit");
  router.use("/diary/edit", diary_edit);

  const diary_delete = require("./diary/delete");
  router.use("/diary/delete", diary_delete);

  const title_change = require("./user/title");
  title_change(app, router);

  const simple_write = require("./diary/simple_write");
  simple_write(router);

  const diary_search = require("./diary/search");
  diary_search(router);
};
