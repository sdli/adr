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

        console.log(data);
        //成功后返回effects yield结果
        switch(parseInt(data.data.code)){
              case 1: return true;break;
              case 0: return false;break;
              default : return false;
        }
    },
    getShopList: function*(){
      let data = yield request('/api/getShopList', {
          method: 'POST',
          headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          credentials: 'include'
      });
      console.log(data);
      //成功后返回effects yield结果
      switch(parseInt(data.data.code)){
            case 200: return data;break;
            case 400: return false;break;
            default : return false;
        }
      },
};
export default {
  namespace: 'login',
  state: {
      token: "",
      tel: "",
      alert: 'none'
  },
  reducers: {
    loginOK(state,{token,tel}) {
      return {token:token,tel:tel};
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
        console.log('登录信息:',loginInfo);
        const data = yield call(LoginFetch.login,loginInfo);
        if(data){
           yield put({ type: 'loginOK',token:data.token,tel:data.tel});
           yield put(routerRedux.push('/'));
        }else{
           yield put({ type: 'loginFail'});
        }
    },
    *getAuth({},{put,call}){
        const auth = yield call(LoginFetch.check);
        if(!auth) yield put(routerRedux.push("/login"));
    },
    *checkAuthLogin({},{put,call,select}){
        const auth = yield call(LoginFetch.check);
        if(!auth) yield put(routerRedux.push("/"));
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
          dispatch({type:"getAuthLogin"});
        }
      });
    },
  }
};