import express from 'express';
import bodyParser from "body-parser";
import configs from "./utils/configs"; 
import session from "express-session";
import captchapng from 'captchapng';
import cookieParser from "cookie-parser";
import apis from "./lib/";

const app = new express();
const port  = configs.apiPort;
app.use(cookieParser());
app.use(session({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized: false,
  cookie: {secure: false}
}));

app.use(bodyParser.urlencoded({ extended: false}));

// 登录接口
app.post('/login', apis.loginStart);

// 加载权限
app.post('/loadAuth',apis.loadAuth);

// 加载镇级别列表
app.post("/countryList",apis.countryList);

app.get('/img',function(req,res,next){
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
});

app.listen(port,apis.listen);

app.get('/logout',function(req,res,next){
    req.session.username = null;
    req.session.password = null;
    let result = {
        "code":1,
        "msg": "logout succ"
    };
    res.json(result);
});