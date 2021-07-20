var GoogleStrategy = require('passport-google-oauth2').Strategy;
const fs = require("fs");
var passport = require('passport');

const option = {
    host : "dalog.cd8bwymbnzsj.ap-northeast-2.rds.amazonaws.com",
    port : 3306,
    user : "daloguser",
    password : "dalog1234!",
    database : "dalog",
}

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy(
        {
            clientID : '32143467552-12l49nuqf2df6u6ubh234lb7qo1td7be.apps.googleusercontent.com',
            clientSecret : 'wShMkLgGkZfRLL6m2Df3WFp1',
            callbackURL : 'http://localhost:3000/login/google/callback',
            passReqToCallback : true
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            console.log(accessToken);

            return done(null, profile);
        }
    )
)

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