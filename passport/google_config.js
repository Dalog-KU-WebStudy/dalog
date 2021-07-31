module.exports = {
    clientID : '32143467552-12l49nuqf2df6u6ubh234lb7qo1td7be.apps.googleusercontent.com',
    clientSecret : 'wShMkLgGkZfRLL6m2Df3WFp1',
    callbackURL : 'http://localhost:3000/login/google/callback',

    db :{
        "connectionLimit":50,
        "host":"dalog.cd8bwymbnzsj.ap-northeast-2.rds.amazonaws.com",
        "port":"3306",
        "user":"daloguser",
        "password":"dalog1234!",
        "database":"dalogdb"
    }
}