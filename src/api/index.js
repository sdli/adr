import express from 'express';
import bodyParser from "body-parser";
import configs from "./utils/configs"; 
import session from "express-session";
import cookieParser from "cookie-parser";
import apis from "./lib/";

// express库
const app = new express();
const port  = configs.apiPort;

// 配置传输session和cookie
app.use(cookieParser());
app.use(session({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized: false,
  cookie: {secure: false} //不设置过期时间
}));

//配置解析工具
app.use(bodyParser.urlencoded({ extended: false}));

// 登录接口
app.post('/login', apis.loginStart);

// 加载权限
app.post('/loadAuth',apis.loadAuth);

// 加载镇级别列表
app.post("/countryList",apis.countryList);

// 加载镇级别报告
app.post("/countryReport",apis.countryReport);

// 加载镇级别报告
app.post("/villageReport",apis.villageReport);

// 加载验证码
app.get('/img',apis.loadImg);

// 监听端口
app.listen(port,apis.listen);

// 登出操作
app.get('/logout',apis.logout);