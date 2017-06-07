import React from 'react';
import { connect } from 'dva';
import CountryDetails from "../components/content/country.content";

function CountryPage({dispatch,data,loading,params}) {
  return (
    <CountryDetails
      dispatch={dispatch}
      id={params.id}
      options={data.villageOptions || null}
      defaultValues={data.defaultVillageValues || null}
      defaultInput = {data.defaultVillageInput || null}
      villageReport = {data.villageReport || null}
    />
  );
}

CountryPage.propTypes = {};

export default connect(({data,loading})=>{return {data,loading};})(CountryPage);