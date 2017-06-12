import React from 'react';
import { connect } from 'dva';
import ChildDetails from "../components/content/details.content";

function DetailsPage({dispatch,data,loading,params,login}) {
  return (
    <ChildDetails
      dispatch={dispatch}
      id={params.id}
      level={login.loginData.orgLevel}
      childDetails={data.childDetails || null}
      visible = {data.modelVisible}
    />
  );
}

DetailsPage.propTypes = {};

export default connect(({data,login,loading})=>{return {data,login,loading};})(DetailsPage);