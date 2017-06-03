import React from 'react';
import { connect } from 'dva';
import CountryDetails from "../components/content/country.content";

function CountryPage({dispatch,login,loading}) {
  return (
    <CountryDetails loginInfo={login}/>
  );
}

CountryPage.propTypes = {};

export default connect(({login,loading})=>{return {login,loading};})(CountryPage);