import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";
import countryList from "./lib/countryList";

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
  },
  countryReport: function*(organId){
    console.log(organId);
        let data = yield request('/api/countryReport', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"organId="+organId,
              credentials: 'include'
          });
        console.log(data,"获得村镇列表");
        return data.data.code == "200"?data:false;   
  },
  villageReport: function*(organId){
        let data = yield request('/api/villageReport', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"organId="+organId,
              credentials: 'include'
          });
        console.log(data,"获得村镇列表");
        return data.data.code == "200"?data:false;   
  }
};

export default {
  namespace: 'data',
  state: {
      organId: "",
      organLevel: "",
      areaOptions : {},
      defaultAreaValues: {},
      defaultAreaInput: "",
      countryReport: [],
      villageOptions: {},
      defaultVillageValues: {},
      defaultVillageInput: "",
      villageReport: []
    },
  reducers: {
    updateCountryList(state,{data}){
      return {
          ...state,
          areaOptions:data.options,
          defaultAreaValues:data.defaultValues,
          defaultAreaInput:data.defaultInput
      };
    },
    updateCountryReport(state,{data}){
      return {
          ...state,
          countryReport: data
      };
    },
    updateVillageList(state,{data}){
      return{
          ...state,
          villageOptions: data.options,
          defaultVillageValues: data.defaultValues,
          defaultVillageInput: data.defaultInput
      };
    },
    updateVillageReport(state,{data}){
      return{
          ...state,
          villageReport: data
      }
    }

  },
  effects: {
    *getCountryList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        console.log(list);
        yield put({type:"updateCountryList",data:list});
    },
    *getCountryReport({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryReport,orgId);
        console.log(list);
        yield put({type:"updateCountryReport",data:list.data.data});
    },
    *getVillageList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        console.log(list);
        yield put({type:"updateCountryList",data:list});
    },
    *getVillageReport({orgId},{put,call,select}){
        const list = yield call(dataFetch.villageReport,orgId);
        console.log(list);
        yield put({type:"updateCountryReport",data:list.data.data})
    }
  }
};