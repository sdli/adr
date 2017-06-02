import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/login.header";
import Content from "../components/content/login.content";
import Footer from "../components/footer";
import {message} from "antd";

function IndexPage({dispatch,login,loading}) {

  console.log(login);
  const handleSubmit = (values) => {
    dispatch({type:"login/login",loginInfo:values});
  }

  return (
    <Layout
      type="fullContent"
      header={<Header />}
      content={<Content handleSubmit={handleSubmit} alert={login.alert} dispatch={dispatch} loading={loading.global} status={login.status} />}
      footer={<Footer />}
    />
  );
}

IndexPage.propTypes = {};

export default connect(({login,loading})=>{return {login,loading};})(IndexPage);