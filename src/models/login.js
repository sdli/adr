import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";

const fetchData = function*(loginInfo){
    let data = yield request('/api/login', {
      method: 'POST',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
      },
      body: objToQuery(loginInfo),
      credentials: 'include'
    });

    //成功后返回effects yield结果
    if(parseInt(data.code) >=1){
        return data.data;
    }else{
        return false;
    }
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
        const data = yield call(fetchData,loginInfo);
        if(data){
           yield put({ type: 'loginOK',token:data.token,tel:data.tel});
           yield put(routerRedux.push('/'));
        }else{
           yield put({ type: 'loginFail'});
        }
    },
    *checkAuth({},{put,call,select}){
        const token = yield select(state=>state.token);
        if(!token) yield put(routerRedux.push("/login"));
    },
    *checkAuthLogin({},{put,call,select}){
        const token = yield select(state=>state.token);
        if(!token) yield put(routerRedux.push("/"))
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