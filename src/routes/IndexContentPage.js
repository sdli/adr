import React from 'react';
import { connect } from 'dva';
import CountryList from "../components/content/index.content";

function IndexContentPage({dispatch,data,loading,params,login}) {
  return (
    <CountryList 
      dispatch={dispatch} 
      id={params.id} 
      options={data.areaOptions || null} 
      defaultValues={data.defaultAreaValues || null}
      defaultInput = {data.defaultAreaInput || null}
      countryReport = {data.countryReport || null}
      visible = {data.modelVisible}
      level={login.loginData.orgLevel}
    />
  );
}

IndexContentPage.propTypes = {};

export default connect(({data,login,loading})=>{return {login,data,loading};})(IndexContentPage);