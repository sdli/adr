import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";

const getOriginalLink = function(data){
  let originalLink = "";
  let originalCheckLink= "";
  switch (data.orgLevel){
    case 1:
      originalLink = '/city/'+data.orgId;
      originalCheckLink = '/checkCity/'+data.orgId;break;
    case 2: 
      originalLink = '/area/'+data.orgId;
      originalCheckLink = '/checkArea/'+data.orgId;break;
    case 3: 
      originalLink = '/data/'+data.orgId;
      originalCheckLink = '/checkData/'+data.orgId;break;
    default: return null;
  }
  return {originalLink,originalCheckLink};
};

const LoginFetch = {
  check: function*(){
        let data = yield request('/api/loadAuth', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              credentials: 'include'
          });
         return data.data.code != 0 ?data.data.userInfo:false;   
  },
  login:function*(loginInfo){
        let data = yield request('/api/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            },
            body: objToQuery(loginInfo),
            credentials: 'include'
        });

        //成功后返回effects yield结果
        switch(parseInt(data.data.code)){
              case 200: return data;
              case 400: return false;
              case -1: return false;
              default : return false;
        }
    },
    logout: function*(){
        let data = yield request("/api/logout",{
          method: "GET",
          headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          body: null,
          credentials: "include"
        });
        switch(parseInt(data.data.code)){
            case 1: return true;
            case 0: return false;
            default: return false;
        }
    }
};
export default {
  namespace: 'login',
  state: {
      token: "",
      tel: "",
      alert: 'none',
      loading: false,
      status: false,
      loginData:{},
      originalLink:"",
      originalCheckLink:""
    },
  reducers: {
    loginOK(state,{loginData,originalLink,originalCheckLink}) {
      return {...state,status:true,alert:"none",loginData:loginData,originalLink:originalLink,originalCheckLink:originalCheckLink};
    },
    loginFail(state){
      return {...state,alert: 'block'};
    },
    loginWaiting(state){
      return {...state,alert: 'none'};
    }
  },
  effects: {
    *login({loginInfo},{put,call}){
        const data = yield call(LoginFetch.login,loginInfo);
        if(data){
           let link = getOriginalLink(data.data.data);
           yield put({type:"loginOK",loginData:data.data.data,originalLink:link.originalLink,originalCheckLink:link.originalCheckLink});
           yield put(routerRedux.push(link.originalLink));
        }else{
           yield put({ type: 'loginFail'});
        }
    },
    *getAuth({pathname},{put,call}){
        try{
          const auth = yield call(LoginFetch.check);
          if(!auth){yield put(routerRedux.push("/login"));}
          else{
            let link = getOriginalLink(auth);
            yield put({type:"loginOK",loginData:auth,originalLink:link.originalLink,originalCheckLink:link.originalCheckLink});
            if(pathname === "/"){
              yield put(routerRedux.push("/data/"+ auth.orgId));
            }
          };
        }catch(err){
          yield put(routerRedux.push("/error"));
        }
    },
    *checkAuthLogin({},{put,call,select}){
        const auth = yield call(LoginFetch.check);
        if(auth) yield put(routerRedux.push("/data/"+auth.orgId));
    },
    *logout({},{put,call}){
       const logoutAuth  = yield call(LoginFetch.logout);
       if(logoutAuth) yield put(routerRedux.push("/login"));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (!configs.authException.some((val)=>val===pathname)) {
          dispatch({type:"getAuth",pathname:pathname});
        }
      });
      history.listen(({pathname})=>{
        if(pathname === '/login'){
          dispatch({type:"checkAuthLogin"});
        }
      });
    },
  }
};