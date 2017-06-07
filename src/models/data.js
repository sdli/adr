import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";
import countryList from "./lib/";

const dataFetch = {
  countryList: function*(organId){
    console.log(organId);
        let data = yield request('/api/countryList', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"organId="+organId,
              credentials: 'include'
          });
        console.log(data,"拿到了城市列表");
        let list = countryList(data.data.data);
        return data.data.code == "200"?list:false;   
  }
};
export default {
  namespace: 'data',
  state: {
      organId: "",
      organLevel: "",
      areaOptions : {},
      defaultAreaValues: {},
      defaultAreaInput: ""
    },
  reducers: {
    setOrganInfo(state,{organId,level}){
      console.log(organId,level);
      return {organId: organId,organLevel:level};
    },
    tryRefreshOrgan(state,{orgId,orgLevel}){
      console.log(orgId,orgLevel);
      if(state.organId == "" || state.organLevel == ""){
        return {organId:orgId,organLevel:orgLevel};
      }else{
        return {};
      }
    },
    updateCountryList(state,{data}){
      return {areaOptions:data.options,defaultAreaValues:data.defaultValues,defaultAreaInput:data.defaultInput};
    }
  },
  effects: {
    *getCountryList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        console.log(list);
        yield put({type:"updateCountryList",data:list});
    }
  }
};