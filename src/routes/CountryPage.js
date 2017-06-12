import React from 'react';
import { connect } from 'dva';
import CountryDetails from "../components/content/country.content";

function CountryPage({dispatch,data,loading,params,login}) {
  return (
    <CountryDetails
      dispatch={dispatch}
      id={params.id}
      level={login.loginData.orgLevel}
      options={data.villageOptions || null}
      defaultValues={data.defaultVillageValues || null}
      defaultInput = {data.defaultVillageInput || null}
      villageReport = {data.villageReport || null}
      visible = {data.modelVisible}
    />
  );
}

CountryPage.propTypes = {};

export default connect(({data,loading,login})=>{return {login,data,loading};})(CountryPage);