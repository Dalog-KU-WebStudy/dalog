const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('./google_config');
const mysql = require('mysql');
const connection = mysql.createConnection(config.db);
var passport = require('passport');
connection.connect();

passport.use(new GoogleStrategy(
        {
            clientID : config.clientID,
            clientSecret : config.clientSecret,
            callbackURL : config.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
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