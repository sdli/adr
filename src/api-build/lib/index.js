"use strict";

var _configs = require("../utils/configs");

var _configs2 = _interopRequireDefault(_configs);

var _request = require("../utils/request");

var _request2 = _interopRequireDefault(_request);

var _date = require("../utils/date");

var _date2 = _interopRequireDefault(_date);

var _request3 = require("request");

var _request4 = _interopRequireDefault(_request3);

var _captchapng = require("captchapng");

var _captchapng2 = _interopRequireDefault(_captchapng);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = _configs2.default.apiPort;

/**
 * 请求登录接口
 * @param {请求内容} req 
 * @param {返回内容} res 
 */
function loginStart(req, res, next) {
    var sess = req.session;
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password,
        code = _req$body.code;

    if (parseInt(code) != parseInt(sess.pngNum)) {
        res.json(_configs2.default.codeErrorResponse);
        return true;
    }
    if (username && password) {
        _request4.default.post({
            url: _configs2.default.getServerUrl('login'),
            body: JSON.stringify({
                phone: username,
                password: password
            }),
            header: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }, function (err, httpResponse, body) {
            try {
                var result = JSON.parse(body);
                if (result.code == "200") {
                    sess.username = username;
                    sess.password = password;
                    sess.token = result.data.tokenInfo.token;
                    sess.userInfo = result.data;
                    sess.expire = Date.parse(new Date()) / 1000 + result.data.tokenInfo.token - 300;
                    res.json(result);
                } else {
                    res.json(_configs2.default.reloadResponse);
                }
            } catch (err) {
                if (err) {
                    res.json(_configs2.default.reloadResponse);
                }
            }
        });
    } else {
        res.json(_configs2.default.reloadResponse);
    }
}

/**
 * 接口quest方法获取封装，一次callback
 * @param {*请求参数} req 
 * @param {*请求参数} res 
 */
var InitFetch = function InitFetch(met, url, vali) {
    var method = met;
    var validator = typeof vali !== "undefined" || vali != null ? vali : null;
    var tryToken = function tryToken(req) {
        var sess = req.session;
        var username = sess.username,
            password = sess.password,
            token = sess.token,
            expire = sess.expire;

        if (username && password && token && expire) {
            if (expire > Date.parse(new Date()) / 1000) {
                return token;
            } else {
                return false;
            }
        }
    };
    return function (req, res, initData) {
        (0, _co2.default)(regeneratorRuntime.mark(function _callee() {
            var realToken, sess, result, requestUrl;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            realToken = tryToken(req);
                            sess = req.session;

                            if (realToken) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 6;
                            return (0, _request2.default)(_configs2.default.getServerUrl('login'), {
                                body: JSON.stringify({
                                    phone: req.session.username,
                                    password: req.session.password
                                }),
                                method: 'POST',
                                header: {
                                    "Content-type": "application/json;charset=UTF-8"
                                }
                            });

                        case 6:
                            result = _context.sent;

                            if (result.data.code == "200") {
                                sess.token = result.data.data.tokenInfo.token;
                                sess.userInfo = result.data.data;
                                sess.expire = Date.parse(new Date()) / 1000 + result.data.data.tokenInfo.expireTime;
                                realToken = sess.token;
                            }

                        case 8:
                            if (!(method.toLowerCase() == "post")) {
                                _context.next = 12;
                                break;
                            }

                            _request4.default.post(Object.assign({ body: JSON.stringify(initData) }, {
                                headers: {
                                    "Content-type": "application/json",
                                    "authorization": realToken
                                },
                                url: url
                            }), function (err, response, body) {
                                var result = JSON.parse(body);
                                if (result.code == "200") {
                                    if (validator) {
                                        validator(result, req, res);
                                    } else {
                                        res.json(result);
                                    }
                                } else {
                                    res.json(_configs2.default.reloadResponse);
                                }
                            });
                            _context.next = 30;
                            break;

                        case 12:
                            requestUrl = "";
                            _context.t0 = req.body.type;
                            _context.next = _context.t0 === "village" ? 16 : _context.t0 === "childDetails" ? 18 : _context.t0 === "byRosterId" ? 20 : _context.t0 === "byVillageId" ? 22 : _context.t0 === "byOrgId" ? 24 : _context.t0 === "tableList" ? 26 : 28;
                            break;

                        case 16:
                            requestUrl = url + "?orgId=" + req.body.organId + "&currPage=1&pageSize=100&currLevel=" + req.body.level + "&loginUserId=" + req.body.loginUserId;
                            return _context.abrupt("break", 29);

                        case 18:
                            requestUrl = url + "?childId=" + req.body.childId;
                            return _context.abrupt("break", 29);

                        case 20:
                            requestUrl = url + "?rosterId=" + req.body.id;
                            return _context.abrupt("break", 29);

                        case 22:
                            requestUrl = url + "?villId=" + req.body.id + "&currLevel=" + req.body.level;
                            return _context.abrupt("break", 29);

                        case 24:
                            requestUrl = url + "?orgId=" + req.body.id + "&currLevel=" + req.body.level;
                            return _context.abrupt("break", 29);

                        case 26:
                            requestUrl = url + req.body.organId;
                            return _context.abrupt("break", 29);

                        case 28:
                            requestUrl = url + "?orgId=" + req.body.organId + "&currLevel=" + req.body.level;

                        case 29:
                            (0, _request4.default)({
                                mothod: "GET",
                                url: requestUrl,
                                headers: {
                                    "authorization": realToken
                                }
                            }).pipe(res);

                        case 30:
                            _context.next = 35;
                            break;

                        case 32:
                            _context.prev = 32;
                            _context.t1 = _context["catch"](0);

                            if (_context.t1) {
                                res.json(_configs2.default.reloadResponse);
                            }

                        case 35:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[0, 32]]);
        }));
    };
};

/**
 * 接口二次封装。第二个callback
 * @param {*接口类型} type 
 */
function fetchUrl(mothod, type) {
    var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return InitFetch(mothod, _configs2.default.getServerUrl(type), func);
}

/**
 * 加载认证
 * @param {*处理请求} req 
 * @param {*处理返回数据} res 
 * @param {*} next 
 */
function loadAuth(req, res, next) {
    var loginStatus = typeof req.session.username === "undefined" || typeof req.session.password === "undefined" || !req.session.username || !req.session.password ? false : true;
    if (loginStatus) {
        var result = {
            code: '1',
            userInfo: req.session.userInfo,
            msg: 'login auth OK!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } else {
        var _result = {
            code: '0',
            msg: 'no auth!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(_result);
    }
}

/**
 * 监听端口号
 * @param {错误} error 
 */
function listen(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  API listening on port %s.", port, port);
    }
}

function loadImg(req, res, next) {
    var pngNum = parseInt(Math.random() * 9000 + 1000);
    req.session.pngNum = pngNum;
    var p = new _captchapng2.default(80, 30, parseInt(pngNum)); // width,height,numeric captcha 
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

/**
 * 请求登出
 * @param {请求内容} req 
 * @param {返回内容} res 
 * @param {传递方法} next 
 */
function logout(req, res, next) {
    req.session.username = null;
    req.session.password = null;
    var result = {
        "code": 1,
        "msg": "logout succ"
    };
    res.json(result);
}

/**
 * 下载接口
 */
function download(req, res) {
    var type = req.body.type;
    switch (type) {
        case "byRosterId":
            fetchUrl("get", "downloadChild")(req, res);break;
        case "byVillageId":
            fetchUrl("get", "downloadCountry")(req, res);break;
        case "byOrgId":
            fetchUrl("get", "downloadOrg")(req, res);break;
        default:
            res.json(_configs2.default.reloadResponse);
    }
}

/**
 * export整合
 */
var funcs = {
    countryList: fetchUrl("get", "countryList"),
    countryReport: fetchUrl("get", "countryReport"),
    villageReport: fetchUrl("get", "villageReport"),
    getChildDetails: fetchUrl("get", "getChildDetails"),
    shenhe: fetchUrl("post", "shenhe"),
    changePassword: fetchUrl("post", "changePassword"),
    download: download,
    loginStart: loginStart,
    initFetch: InitFetch,
    loadAuth: loadAuth,
    listen: listen,
    loadImg: loadImg,
    logout: logout
};

module.exports = funcs;
//# sourceMappingURL=index.js.map