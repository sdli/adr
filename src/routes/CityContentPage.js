import React from 'react';
import { connect } from 'dva';
import CountryList from "../components/content/city.content";

function IndexContentPage({dispatch,data,loading,params}) {
  return (
    <CountryList 
      dispatch={dispatch} 
      id={params.id} 
      options={data.areaOptions || null} 
      defaultValues={data.defaultAreaValues || null}
      defaultInput = {data.defaultAreaInput || null}
      countryReport = {data.countryReport || null}
      visible = {data.modelVisible}
    />
  );
}

IndexContentPage.propTypes = {};

export default connect(({data,loading})=>{return {data,loading};})(IndexContentPage);