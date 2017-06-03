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
        return data.data.code >0?true:false;   
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
              case 1: return true;
              case 0: return false;
              default : return false;
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
      status: false
    },
  reducers: {
    loginOK(state) {
      return {status:true};
    },
    loginFail(){
      return {alert: 'block'};
    },
    loginWaiting(){
      return {alert: 'none'};
    }
  },
  effects: {
    *login({loginInfo},{put,call}){
        const data = yield call(LoginFetch.login,loginInfo);
        if(data){
           yield put({ type: 'loginOK'});
           yield put(routerRedux.push('/'));
        }else{
           yield put({ type: 'loginFail'});
        }
    },
    *getAuth({},{put,call}){
        try{
          const auth = yield call(LoginFetch.check);
          if(!auth){yield put(routerRedux.push("/login"));}
          else{yield put({type:"loginOK"})};
        }catch(err){
          yield put(routerRedux.push("/error"));
        }
    },
    *checkAuthLogin({},{put,call,select}){
        const auth = yield call(LoginFetch.check);
        if(auth) yield put(routerRedux.push("/"));
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (!configs.authException.some((val)=>val===pathname)) {
          dispatch({type:"getAuth"});
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