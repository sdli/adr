import React from 'react';
import { connect } from 'dva';
import CountryList from "../components/content/checkData.content";

function IndexContentPage({dispatch,data,loading,params,login}) {
  return (
    <CountryList 
      dispatch={dispatch} 
      id={params.id} 
      options={data.areaOptions || null} 
      defaultValues={data.defaultAreaValues || null}
      defaultInput = {data.defaultAreaInput || null}
      countryCheckReport = {data.countryCheckReport || null}
      visible = {data.modelVisible}
      level={login.loginData.orgLevel}
    />
  );
}

IndexContentPage.propTypes = {};

export default connect(({data,loading,login})=>{return {login,data,loading};})(IndexContentPage);