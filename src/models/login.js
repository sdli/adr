import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";

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
        console.log(loginInfo,"用户登录传参");
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
      loginData:{}
    },
  reducers: {
    loginOK(state,{loginData}) {
      return {...state,status:true,alert:"none",loginData:loginData};
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
        console.log(data,"用户登录信息");
        if(data){
           yield put({type: 'loginOK',loginData:data.data.data});
           switch (data.data.data.orgLevel){
             case 1: yield put(routerRedux.push('/city/'+data.data.data.orgId));break;
             case 2: yield put(routerRedux.push('/area/'+data.data.data.orgId));break;
             case 3: yield put(routerRedux.push('/data/'+data.data.data.orgId));break;
             default: return null;
           }
        }else{
           yield put({ type: 'loginFail'});
        }
    },
    *getAuth({pathname},{put,call}){
        try{
          const auth = yield call(LoginFetch.check);
          if(!auth){yield put(routerRedux.push("/login"));}
          else{
            yield put({type:"loginOK",loginData:auth});
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