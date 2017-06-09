"use strict";

require("babel-polyfill");

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _configs = require("./utils/configs");

var _configs2 = _interopRequireDefault(_configs);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _lib = require("./lib/");

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express库
var app = new _express2.default();
var port = _configs2.default.apiPort;

// 配置传输session和cookie
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false //不设置过期时间
  } }));

//配置解析工具
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// 登录接口
app.post('/login', _lib2.default.loginStart);

// 加载权限
app.post('/loadAuth', _lib2.default.loadAuth);

// 加载镇级别列表
app.post("/countryList", _lib2.default.countryList);

// 加载镇级别报告
app.post("/countryReport", _lib2.default.countryReport);

// 加载村别报告
app.post("/villageReport", _lib2.default.villageReport);

// 加载儿童详情
app.post("/getChildDetails", _lib2.default.getChildDetails);

// 修改密码
app.post("/changePassword", function (req, res, next) {
  _lib2.default.changePassword(req, res, {
    "newPwd": req.body.passwordnew1,
    "newPwdConfirm": req.body.passwordnew2,
    "oldPwd": req.body.passwordold,
    "userId": req.body.userId
  });
});

// 加载验证码
app.get('/img', _lib2.default.loadImg);

// 审核报告接口
app.post("/shenhe", function (req, res, next) {
  _lib2.default.shenhe(req, res, {
    action: req.body.action,
    applyId: req.body.applyId,
    level: req.body.level,
    operatorId: req.body.operatorId,
    remark: req.body.remark
  });
});

// 监听端口
app.listen(port, _lib2.default.listen);

// 登出操作
app.get('/logout', _lib2.default.logout);
//# sourceMappingURL=index.js.map