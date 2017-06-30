// import "babel-polyfill";
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

// 加载村别报告
app.post("/villageReport",apis.villageReport);

// 加载儿童详情
app.post("/getChildDetails",apis.getChildDetails);

// 查询接口
app.post("/searchChildren",apis.searchChildren);

// 加载镇级别保障评估报告
app.post("/countryCheckReport",apis.countryCheckReport);

// 加载村级别评估报告
app.post("/villageCheckList",apis.villageCheckList);

// 修改密码
app.post("/changePassword",function(req,res,next){
      apis.changePassword(req,res,
          {
            "newPwd": req.body.passwordnew1,
            "newPwdConfirm": req.body.passwordnew2,
            "oldPwd": req.body.passwordold,
            "userId": req.body.userId
          }
      );
});

// 下载excel
app.post("/download",apis.download);

// 加载验证码
app.get('/img',apis.loadImg);

// 审核报告接口
app.post("/shenhe",function(req,res,next){
    apis.shenhe(req,res,{
        action:req.body.action,
        applyId:req.body.applyId,
        level:req.body.level,
        operatorId:req.body.operatorId,
        remark:req.body.remark
      }
    );
});

// 监听端口
app.listen(port,apis.listen);

// 登出操作
app.get('/logout',apis.logout);