import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";
import countryList from "./lib/countryList";
import {message} from "antd";
import getMonthTime from "./lib/getMonthTime";

const dataFetch = {
  countryList: function*(organId){
    console.log(organId);
        let data = yield request('/api/countryList', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"type=tableList&organId="+organId,
              credentials: 'include'
          });
        let list = countryList(data.data.data);
        return data.data.code == "200"?list:false;   
  },
  searchBarList: function*(organId){
    console.log(organId);
        let data = yield request('/api/countryList', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"type=tableList&organId="+organId,
              credentials: 'include'
          });
        return data.data.code == "200"?data.data.data:false;   
  },
  countryReport: function*({orgId,level}){
        let data = yield request('/api/countryReport', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"organId="+orgId +"&level="+level,
              credentials: 'include'
          });
        return data.data.code == "200"?data:false;   
  },
  countryCheckReport: function*({orgId,beginTime,endTime}){
        let data = yield request('/api/countryCheckReport', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"type=checkReport&organId="+orgId+"&beginTime="+beginTime+"&endTime="+endTime,
              credentials: 'include'
          });
        return data.data.code == "200"?data:false;   
  },
  villageReport: function*({orgId,level,id}){
        let data = yield request('/api/villageReport', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"organId="+orgId+"&currPage=1&pageSize=100&type=village&level="+level+"&loginUserId="+id,
              credentials: 'include'
          });
        return data.data.code == "200"?data:false;   
  },
  villageCheckReport: function*({orgId,beginTime,endTime}){
        let data = yield request('/api/villageCheckList', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"type=villageCheckList&organId="+orgId+"&beginTime="+beginTime+"&endTime="+endTime,
              credentials: 'include'
          });
        return data.data.code == "200"?data:false;   
  },
  getChildDetails: function*(childId){
        let data = yield request('/api/getChildDetails', {
              method: 'POST',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
              },
              body:"type=childDetails&childId="+childId,
              credentials: 'include'
          });
        return data.data.code == "200"?data:false;  
  },
  shenhe: function*({action,operatorId,applyId,remark,level}){
      console.log("action="+action+"&operatorId="+operatorId+"&applyId"+applyId+"&remark="+remark);
        let data = yield request('/api/shenhe', {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
            },
            body:"action="+action+"&operatorId="+operatorId+"&applyId="+applyId+"&remark="+remark+"&level="+level,
            credentials: 'include'
        });
        return data.data.code == "200"?true:false;  
  },
  changePassword: function*(pwdInfo){
        let data = yield request("/api/changePassword",{
          method: "POST",
          headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          body: objToQuery(pwdInfo),
          credentials: "include"
        });
        switch(parseInt(data.data.code)){
            case 200: return true;
            case 0: return false;
            default: return false;
        }
    },
  download: function*({downloadType,id,level}){
        console.log(downloadType,id);
        let data = yield request("/api/download",{
          method: "POST",
          headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          body: "type="+downloadType+"&id="+id+"&level="+level,
          credentials: "include"
        });
        switch(parseInt(data.data.code)){
            case 200: return data;
            case 0: return false;
            default: return false;
        }
    },
    downloadCheck: function*({downloadType,id,beginTime,endTime}){
        console.log(downloadType,id);
        let data = yield request("/api/download",{
          method: "POST",
          headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          body: "type="+downloadType+"&id="+id+"&beginTime="+beginTime+"&endTime="+endTime,
          credentials: "include"
        });
        switch(parseInt(data.data.code)){
            case 200: return data;
            case 0: return false;
            default: return false;
        }
    },
    searchChildren: function*({id,orgId,level}){
        let data = yield request("/api/searchChildren",{
          method: "POST",
          headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" 
          },
          body: "type=searchChildren&orgId="+orgId+"&id="+id+"&level="+level,
          credentials: "include"
        });
        switch(parseInt(data.data.code)){
            case 200: return data;
            case 0: return false;
            default: return false;
        }
    }
};

const messageHandler = function({type,msg}){
    switch(type){
        case "success": message.success(msg); break;
        case "error": message.error(msg);break;
        default: message.error(msg);break;
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
        villageReport: [],
        childDetails:{},
        changePassword: false,
        changePasswordMessageAlert:false,
        changePasswordMessageType: "",
        changePasswordMessageText: "",
        downloadUrl: "",
        searchBarOptions:{},
        countryCheckReport:[],
        modelVisible: true,
        selectedMonth: "",
        villageCheckList:[]
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
    updateSearchBar(state,{data}){
        return{
            ...state,
            searchBarOptions:data
        }
    },
    updateCountryReport(state,{data}){
      return {
          ...state,
          countryReport: data
      };
    },
    updateCountryCheckReport(state,{data,month}){
        return {
            ...state,
            countryCheckReport: data,
            selectedMonth: month
        }
    },
    updateVillageCheckReport(state,{data}){
        return {
            ...state,
            villageCheckList: data
        }
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
    },
    updateChildDetails(state,{data}){
        return{
            ...state,
            childDetails:data
        };
    },
    changePassword(state){
        return{
            ...state,
            changePassword: true
        };
    },
    closeChangePassword(state){
        return {
            ...state,
            changePassword: false
        }
    },
    giveMessage(state,{alertType,msgType,msgText}){
        switch (alertType){
            case "changePassword": 
                return{
                    ...state,
                    changePasswordMessageAlert:true,
                    changePasswordMessageType: msgType,
                    changePasswordMessageText: msgText
                };
            default:
                return{
                    ...state,
                    changePasswordMessageAlert:true,
                    changePasswordMessageType: msgType,
                    changePasswordMessageText: msgText
                };
        }
    },
    closeMessage(state,{alertType}){
        switch (alertType){
            case "changePassword":
                return{
                    ...state,
                    changePasswordMessageAlert:false
                }
            default:
                return{
                    ...state,
                    changePasswordMessageAlert:false
                }
        }
    },
    downloadExcel(state,{downloadUrl}){
        console.log(downloadUrl,"更新 state");
        return {
            ...state,
            downloadUrl: downloadUrl,
            modelVisible: false
        }
    },
    closeDownload(state){
        return {
            ...state,
            downloadUrl: ""
        }
    },
    setModelVisible(state){
        return {
            ...state,
            modelVisible:true
        };
    }
  },
  effects: {
    *getCountryList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        yield put({type:"updateCountryList",data:list});
    },
    *getSearchBar({},{put,call,select}){
        const orgId = yield select(state=>state.login.loginData.orgId);
        const list = yield call(dataFetch.searchBarList,orgId);
        yield put({type:"updateSearchBar",data:list});
    },
    *searchChildren({orgId},{put,call,select}){
        const id = yield select(state=>state.login.loginData.id);
        const level = yield select(state=>state.login.loginData.orgLevel);
        const list = yield call(dataFetch.searchChildren,{orgId,level,id});
        console.log(list);
    },
    *getCountryReport({orgId},{put,call,select}){
        const level = yield select(state=>state.login.loginData.orgLevel);
        const list = yield call(dataFetch.countryReport,{orgId,level});
        yield put({type:"updateCountryReport",data:list.data.data});
    },
    *getCountryCheckReport({orgId,month},{put,call,select}){
        const selectedMonth = yield select(state=>state.data.selectedMonth);
        const monthTime = getMonthTime(month || selectedMonth);
        const {beginTime,endTime,realMonth} = monthTime;
        const list = yield call(dataFetch.countryCheckReport,{orgId,beginTime,endTime});
        yield put({type:"updateCountryCheckReport",data:list.data.data,month:realMonth});
        console.log(list);
    },
    *getVillageCheckList({orgId},{put,call,select}){
        const selectedMonth = yield select(state=>state.data.selectedMonth);
        const monthTime = getMonthTime(selectedMonth);
        const {beginTime,endTime,realMonth} = monthTime;
        const list = yield call(dataFetch.villageCheckReport,{orgId,beginTime,endTime});
        yield put({type:"updateVillageCheckReport",data:list.data.data});
    },
    *getVillageList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        console.log(list,"村级别");
        yield put({type:"updateVillageList",data:list});
    },
    *getVillageReport({orgId},{put,call,select}){
        const level = yield select(state=>state.login.loginData.orgLevel);
        const id = yield select(state=>state.login.loginData.id);
        const list = yield call(dataFetch.villageReport,{orgId,level,id});
        yield put({type:"updateVillageReport",data:list.data.data});
    },
    *getVillageReportByUserId({},{put,call,select}){
        const level = yield select(state=>state.login.loginData.orgLevel);
        const id = yield select(state=>state.login.loginData.id);
        const orgId = yield select(state=>state.login.loginData.orgId);
        const list = yield call(dataFetch.villageReport,{orgId,level,id});
        yield put({type:"updateVillageReport",data:list.data.data});
    },
    *getChildDetails({childId},{put,call,select}){
        const info = yield call(dataFetch.getChildDetails,childId);
        yield put({type:"updateChildDetails",data:info.data.data});
    },
    *shenhe({action,remark,applyId},{put,call,select}){
        const operatorId = yield select(state=>state.login.loginData.id);
        const level = yield select(state=>state.login.loginData.orgLevel);
        const result = yield call(dataFetch.shenhe,{action,remark,applyId,operatorId,level});
        if(result){
            alert("审批成功！");
            window.location.reload();
        }else{
            alert("审核失败，请稍后再试！");
            window.location.reload();
        }
    },
    *changePasswordEffect({passwordold,passwordnew1,passwordnew2},{select,put,call}){
        const userId = yield select(state=>state.login.loginData.id);
        const pwdInfo = {passwordold,passwordnew1,passwordnew2,userId};
        const changeResult = yield call(dataFetch.changePassword,pwdInfo);
        if(changeResult){
            yield put({type:"giveMessage",alertType:"changePassword",msgType:"success",msgText:"修改成功,请重新登录"});
        }else{
            yield put({type:"giveMessage",alertType:"changePassword",msgType:"error",msgText:"修改失败，请检查密码！"});
        }
    },
    *download({downloadType,id},{select,put,call}){
        yield put({type:"setModelVisible"});
        const level = yield select(state=>state.login.loginData.orgLevel);
        const data = yield call(dataFetch.download,{downloadType,id,level});
        const url = data?"http://"+data.data.data.url:null;
        yield put({type:"downloadExcel",downloadUrl:url});
    },
    *downloadCheck({downloadType,id},{select,put,call}){
        yield put({type:"setModelVisible"});
        const selectedMonth = yield select(state=>state.data.selectedMonth);
        const monthTime = getMonthTime(selectedMonth);
        const {beginTime,endTime} = monthTime;
        const data = yield call(dataFetch.downloadCheck,{downloadType,id,beginTime,endTime});
        const url = data?"http://"+data.data.data.url:null;
        console.log("下载地址为："+url);
        yield put({type:"downloadExcel",downloadUrl:url});
    }
  }
};