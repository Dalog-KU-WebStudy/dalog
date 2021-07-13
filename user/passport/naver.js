const passport = require('passport');
const naverStrategy = require('passport-naver').Strategy;
const config = require('./naver_config');
const request = require('request');

module.exports = function(app){
    app.get('/login/naver', function(req,res){
        // event.preventDefault();
        api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + config.clientID + '&redirect_uri=' + config.callback_url + '&state=200';
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
        // res.end(`<script>window.location.href=${api_url}</script>`);
        // window.location.href=api_url;
    })

    app.get('/login/naver/callback', function (req, res) {
        code = req.query.code;
        state = req.query.state;
        api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + config.clientID + '&redirect_uri=' + config.callback_url + '&state=' + '200';
        // var request = require('request');
        var options = {
            url: api_url,
            headers: {'X-Naver-Client-Id':config.clientID, 'X-Naver-Client-Secret': config.clientSecret}
        };
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
                res.end(body);
            } else {
                res.status(response.statusCode).end();
                console.log('error = ' + response.statusCode);
            }
        });
    });
}