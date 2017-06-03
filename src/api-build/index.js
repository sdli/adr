"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _configs = require("./utils/configs");

var _configs2 = _interopRequireDefault(_configs);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _captchapng = require("captchapng");

var _captchapng2 = _interopRequireDefault(_captchapng);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default();
var port = _configs2.default.apiPort;
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
    secret: 'sessiontest',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(_bodyParser2.default.urlencoded({ extended: false }));

// setResponse(app);
app.post('/login', function (req, res, next) {
    var sess = req.session;
    var username = req.body.username;
    var password = req.body.password;
    if (sess.count) {
        sess.count++;
    } else {
        sess.count = 1;
    }
    if (username == '123' && password == '123') {

        var result = {
            status: 1,
            code: '1',
            msg: 'succ',
            count: sess.count
        };
        sess.status = 1;
        sess.username = username;
        res.setHeader("Content-Type", "application/json");
        res.json(result);
        sess.save();
    } else {
        var _result = {
            status: 0,
            code: '0',
            msg: 'fail',
            count: sess.count,
            username: username
        };
        sess.status = 0;
        res.setHeader("Content-Type", "application/json");
        res.json(_result);
    }
});

app.post('/loadAuth', function (req, res, next) {
    var loginStatus = typeof req.session.status === "undefined" ? false : req.session.status;
    if (loginStatus) {
        var result = {
            code: '1',
            username: req.session.username,
            msg: 'login auth OK!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } else {
        var _result2 = {
            code: '0',
            username: "steven?",
            msg: 'no auth!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(_result2);
    }
});

app.get('/img', function (req, res, next) {
    var pngNum = parseInt(Math.random() * 9000 + 1000);
    req.session.pngNum = pngNum;
    var p = new _captchapng2.default(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    next();
});

app.listen(port, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  API listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});
//# sourceMappingURL=index.js.map