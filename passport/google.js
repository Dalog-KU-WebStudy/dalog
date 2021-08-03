const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../config/google_config');
const dbconfig = require('../config/dbconfig');
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
var passport = require('passport');
connection.connect();

passport.use(new GoogleStrategy(
        {
            clientID : config.clientID,
            clientSecret : config.clientSecret,
            callbackURL : config.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
          
          process.nextTick(function(){
              user = {
                name : profile.family_name+profile.given_name,
                email : profile.given_name+profile.sub%256538472+'@gmail.com',
                provider:'google',
                google : profile._json
              } 
              console.log(user);

              const query = connection.query(`select * from dalog_user where user_id=?`, user.email, (err, results) => {
                  if(err){
                      return done(err);
                  }else{
                      // 새로운 사용자 -> insert 필요
                      if(results.length==0){
                          console.log('google new user')
                          const sql = 'insert into dalog_user (user_id,user_name) values(?,?)';
                          connection.query(sql,[user.email,user.name],(err,result)=>{
                            if(err) return done(err)
                            else{
                              console.log('login!_success');
                              done(null,profile);
                            }
                          })    

                      } 
                      //이미 가입된 유저
                      else{
                        done(null,profile);
                      }
                    }
                  })
              });
          }));
          

const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(301).redirect('/login');
    }
  };

module.exports = function(app){
    app.get('/', authenticateUser, (req, res, next) => {
        res.render('index', { title: 'Express' });
    });
    
    app.get('/login', (req, res, next)  => {
       res.render('login', { title: 'Login' })
    });
    
    app.get('/login/google',
    passport.authenticate('google',{scope:['profile']})
    );
    
    app.get('/login/google/callback',
    passport.authenticate('google',{
        failureRedirect: '/login',
          successRedirect: '/'
    }));
}