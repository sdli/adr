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
                    // sess.expire = Date.parse(new Date()) / 1000 + result.data.tokenInfo.expireTime - 300;
                    sess.expire = Date.parse(new Date()) / 1000 + 10;
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
            if (parseInt(expire) > Date.parse(new Date()) / 1000) {
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
                            realToken = tryToken(req);
                            sess = req.session;

                            if (realToken) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 5;
                            return (0, _request2.default)(_configs2.default.getServerUrl('login'), {
                                body: JSON.stringify({
                                    phone: sess.username,
                                    password: sess.password
                                }),
                                method: 'POST',
                                headers: {
                                    "Content-type": "application/json;charset=UTF-8"
                                }
                            });

                        case 5:
                            result = _context.sent;

                            if (typeof result.data.code !== "undefined") {
                                if (result.data.code == "200") {
                                    sess.token = result.data.data.tokenInfo.token;
                                    sess.userInfo = result.data.data;
                                    // sess.expire = Date.parse(new Date()) / 1000 + result.data.tokenInfo.expireTime - 300;
                                    sess.expire = Date.parse(new Date()) / 1000 + 10;
                                    realToken = result.data.data.tokenInfo.token;
                                }
                            } else {
                                res.json(_configs2.default.reloadResponse);
                            }

                        case 7:
                            if (method.toLowerCase() == "post") {
                                _request4.default.post(Object.assign({
                                    body: JSON.stringify(initData) }, { headers: {
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
                            } else {
                                requestUrl = getUrl(req, url);

                                try {
                                    (0, _request4.default)({
                                        mothod: "GET",
                                        url: requestUrl,
                                        headers: {
                                            "authorization": realToken
                                        }
                                    }).pipe(res);
                                } catch (err) {
                                    res.json(_configs2.default.reloadResponse);
                                }
                            }

                        case 8:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        })).catch(function (err) {
            res.json(_configs2.default.reloadResponse);
        });
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
 * 
 * @param {*测试url} req 
 */
function getUrl(req, url) {
    var requestUrl = "";
    switch (req.body.type) {
        case "village":
            requestUrl = url + "?orgId=" + req.body.organId + "&currPage=1&pageSize=100&currLevel=" + req.body.level + "&loginUserId=" + req.body.loginUserId;
            break;
        case "childDetails":
            requestUrl = url + "?childId=" + req.body.childId;
            break;
        case "byRosterId":
            requestUrl = url + "?rosterId=" + req.body.id;
            break;
        case "byVillageId":
            requestUrl = url + "?villId=" + req.body.id + "&currLevel=" + req.body.level;
            break;
        case "byOrgId":
            requestUrl = url + "?orgId=" + req.body.id + "&currLevel=" + req.body.level;
            break;
        case "tableList":
            requestUrl = url + req.body.organId;
            break;
        case "searchChildren":
            requestUrl = url + "?orgId=" + req.body.orgId + "&level=" + req.body.level + "&currPage=1&pageSize=100&uid=" + req.body.id;
            break;
        case "checkReport":
            requestUrl = url + "?orgId=" + req.body.organId + "&beginTime=" + req.body.beginTime + "&endTime=" + req.body.endTime;
            break;
        case "villageCheckList":
            requestUrl = url + "?orgId=" + req.body.organId + "&beginTime=" + req.body.beginTime + "&endTime=" + req.body.endTime;
            break;
        case "byOrgIdForCheck":
            requestUrl = url + "?orgId=" + req.body.id + "&beginTime=" + req.body.beginTime + "&endTime=" + req.body.endTime;
            break;
        case "byVillageIdForCheck":
            requestUrl = url + "?orgId=" + req.body.id + "&beginTime=" + req.body.beginTime + "&endTime=" + req.body.endTime;
            break;
        default:
            requestUrl = url + "?orgId=" + req.body.organId + "&currLevel=" + req.body.level;
    }
    return requestUrl;
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
        case "byOrgIdForCheck":
            fetchUrl("get", "downloadOrgForCheck")(req, res);break;
        case "byVillageIdForCheck":
            fetchUrl("get", "downloadCountryForCheck")(req, res);break;
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
    searchChildren: fetchUrl("get", "searchChildren"),
    changePassword: fetchUrl("post", "changePassword"),
    countryCheckReport: fetchUrl("get", "countryCheckReport"),
    download: download,
    villageCheckList: fetchUrl("get", "villageCheckList"),
    loginStart: loginStart,
    initFetch: InitFetch,
    loadAuth: loadAuth,
    listen: listen,
    loadImg: loadImg,
    logout: logout
};

module.exports = funcs;
//# sourceMappingURL=index.js.map