import express from 'express';
import bodyParser from "body-parser";
import configs from "./utils/configs"; 
import session from "express-session";
import captchapng from 'captchapng';
import cookieParser from "cookie-parser";

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

// setResponse(app);
app.post('/login',function(req,res,next){
    let sess = req.session;
    let username = req.body.username;
    let password = req.body.password;
    if(sess.count){
        sess.count++;
    }else{
        sess.count =1;
    }
    if(username == '123' && password == '123'){

        const result = {
            status: 1,
            code: '1',
            msg: 'succ',
            count: sess.count,
        };
        sess.status = 1;
        sess.username = username;
        res.setHeader("Content-Type","application/json");
        res.json(result);
        sess.save();
    }else{
        const result = {
            status: 0,
            code: '0',
            msg: 'fail',
            count: sess.count,
            username: username
        };
        sess.status = 0;
        res.setHeader("Content-Type","application/json");
        res.json(result);
    }
});

app.post('/loadAuth',function(req,res,next){
  let loginStatus = (typeof req.session.status === "undefined")?false:req.session.status;
  if(loginStatus){
      let result = {
          code : '1',
          username: req.session.username,
          msg : 'login auth OK!'
      };
      res.setHeader("Access-Control-Allow-Origin","*");
      res.setHeader("Content-Type","application/json");
      res.json(result);
  }else{
    let result = {
        code : '0',
        username: "steven?",
        msg : 'no auth!'
    };
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Content-Type","application/json");
    res.json(result);
  }
});

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

app.listen(port,function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  API listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});