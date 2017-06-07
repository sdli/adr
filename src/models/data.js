import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";

const dataFetch = {
  countryList: function*(organId){
        let data = yield request('/api/countryList', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:objToQuery(organId),
              credentials: 'include'
          });
          console.log(data);
        return data.data.code >0?true:false;   
  }
};
export default {
  namespace: 'data',
  state: {
      organId: "",
      organLevel: "",
      branchInfo : {}
    },
  reducers: {
    setOrganInfo(state,{organId,level}){
      return {organId: organId,organLevel:level};
    },
    updateBranchInfo(state,{data}){
      return {branchInfo:data};
    }
  },
  effects: {
    *getCountryList({},{put,call,select}){
        const organId = yield select((state)=>({organId:state.organId}));
        const data = yield call(dataFetch.countryList,organId);
        yield put({type:"updateBranchInfo",data});
    }
  }
};