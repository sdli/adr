import config from "../utils/configs";
import fetchRequest from "../utils/request";
import date from "../utils/date";
import request from "request";
import captchapng from 'captchapng';
import co from 'co';

var port = config.apiPort;

/**
 * 请求登录接口
 * @param {请求内容} req 
 * @param {返回内容} res 
 */
function loginStart(req, res,next) {
    let sess = req.session;
    let { username, password } = req.body;
    if (username && password) {
        request.post({
            url: config.getServerUrl('login'),
            body: JSON.stringify({
                phone: username,
                password: password
            }),
            header: {
                "Content-type": "application/json;charset=UTF-8"
            }
        }, function(err, httpResponse, body) {
            let result = JSON.parse(body);
            console.log(result);
            if (result.code == "200") {
                sess.username = username;
                sess.password = password;
                sess.token = result.data.tokenInfo.token;
                sess.userInfo = result.data;
                sess.expire = Date.parse(new Date()) / 1000 + 10;
                res.json(result);
            }else{
                res.json(config.reloadResponse);
            }
        });
    } else {
        res.json(config.reloadResponse);
    }
}


/**
 * 接口quest方法获取封装，一次callback
 * @param {*请求参数} req 
 * @param {*请求参数} res 
 */
const InitFetch = function(met,url,vali) {
        const method = met;
        const validator = (typeof vali !== "undefined" || vali != null)?vali:null;
        const tryToken = function(req) {
            var sess = req.session;
            var { username, password, token, expire } = sess;
            if (username && password && token && expire) {
                if (expire > Date.parse(new Date()) / 1000) {
                    return token;
                } else {
                    return false;
                }
            }
        };
        return function(req,res,initData){
            co(function*(){
            var realToken = tryToken(req);
            var sess = req.session;
            if (!realToken) {
                var result = yield fetchRequest(config.getServerUrl('login'), {
                    body: JSON.stringify({
                        phone: req.session.username,
                        password: req.session.password
                    }),
                    method: 'POST',
                    header: {
                        "Content-type": "application/json;charset=UTF-8"
                    }
                });

                if (result.code == "200") {
                    sess.token = result.data.tokenInfo.token;
                    sess.userInfo = result.data;
                    sess.expire = Date.parse(new Date()) / 1000 + 10;
                    realToken = sess.token;
                }
            }
            if(method.toLowerCase() == "post"){
                console.log(initData);
                request.post(Object.assign({body:JSON.stringify(initData)},{
                    headers: {
                        "Content-type": "application/json",
                        "authorization": realToken
                    },
                    url: url
                }),function(err,response,body){
                    let result = JSON.parse(body);
                    console.log(result);
                    if(result.code == "200"){
                        if(validator){
                            validator(result,req,res);
                        }else{
                            res.json(result);
                        }
                    }else{
                        res.json(config.reloadResponse);
                    }
                });
            }else{
                let requestUrl = "";
                switch (req.body.type){
                    case "village":
                        requestUrl = url+"?orgId="+req.body.organId+"&currPage=1&pageSize=100";
                        break;
                    case "childDetails":
                        requestUrl = url+"?childId="+req.body.childId;
                        break;
                    default:
                        requestUrl = url+req.body.organId;
                }
                request({
                    mothod: "GET",
                    url: requestUrl,
                    headers:{
                        "authorization": realToken
                    }
                }).pipe(res);
            }
        });
    }
}

/**
 * 接口二次封装。第二个callback
 * @param {*接口类型} type 
 */
function fetchUrl(mothod,type,func=null){
    return InitFetch(mothod,config.getServerUrl(type),func);
}

/**
 * 加载认证
 * @param {*处理请求} req 
 * @param {*处理返回数据} res 
 * @param {*} next 
 */
function loadAuth(req, res, next) {
    let loginStatus = (typeof req.session.username === "undefined" || typeof req.session.password === "undefined" || !req.session.username || !req.session.password) ? false : true;
    if (loginStatus) {
        let result = {
            code: '1',
            userInfo: req.session.userInfo,
            msg: 'login auth OK!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    } else {
        let result = {
            code: '0',
            msg: 'no auth!'
        };
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "application/json");
        res.json(result);
    }
}


/**
 * 监听端口号
 * @param {错误} error 
 */
function listen(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  API listening on port %s.", port, port)
    }
}

function loadImg(req,res,next){
    var pngNum = parseInt(Math.random()*9000+1000);
    req.session.pngNum = pngNum;
    var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha 
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
    next();
}

/**
 * 请求登出
 * @param {请求内容} req 
 * @param {返回内容} res 
 * @param {传递方法} next 
 */
function logout(req,res,next){
    req.session.username = null;
    req.session.password = null;
    let result = {
        "code":1,
        "msg": "logout succ"
    };
    res.json(result);
}
/**
 * export整合
 */
const funcs = {
    countryList: fetchUrl("get","countryList"),
    countryReport: fetchUrl("get","countryReport"),
    villageReport: fetchUrl("get","villageReport"),
    getChildDetails: fetchUrl("get","getChildDetails"),
    shenhe: fetchUrl("post","shenhe"),
    changePassword: fetchUrl("post","changePassword"),
    loginStart: loginStart,
    initFetch: InitFetch,
    loadAuth: loadAuth,
    listen: listen,
    loadImg: loadImg,
    logout: logout
};

module.exports = funcs;