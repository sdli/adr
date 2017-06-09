import { routerRedux } from 'dva/router';
import request from "../utils/request";
import objToQuery from '../utils/objToQuery';
import configs from "../utils/configs";
import countryList from "./lib/countryList";
import {message} from "antd";

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
              body:"organId="+organId+"&currPage=1&pageSize=100&type=village",
              credentials: 'include'
          });
        console.log(data,"获得村镇列表");
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
        console.log(data,"获取儿童信息");
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
        console.log(data,"获取审核信息");
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
        console.log(data);
        switch(parseInt(data.data.code)){
            case 200: return true;
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
        changePasswordMessageText: ""
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
    }
  },
  effects: {
    *getCountryList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        yield put({type:"updateCountryList",data:list});
    },
    *getCountryReport({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryReport,orgId);
        yield put({type:"updateCountryReport",data:list.data.data});
    },
    *getVillageList({orgId},{put,call,select}){
        const list = yield call(dataFetch.countryList,orgId);
        console.log(list,"村级别");
        yield put({type:"updateVillageList",data:list});
    },
    *getVillageReport({orgId},{put,call,select}){
        const list = yield call(dataFetch.villageReport,orgId);
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
        console.log(pwdInfo,"修改密码");
        const changeResult = yield call(dataFetch.changePassword,pwdInfo);
        if(changeResult){
            yield put({type:"giveMessage",alertType:"changePassword",msgType:"success",msgText:"修改成功,请重新登录"});
        }else{
            yield put({type:"giveMessage",alertType:"changePassword",msgType:"error",msgText:"修改失败，请检查密码！"});
        }
    }
  }
};