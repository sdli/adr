import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/login.header";
import Content from "../components/content/login.content";
import Footer from "../components/footer";

function IndexPage({dispatch,login}) {

  const handleSubmit = (values) => {
    dispatch({type:"login/login",loginInfo:values});
  }

  return (
    <Layout
      type="fullContent"
      header={<Header />}
      content={<Content handleSubmit={handleSubmit} />}
      footer={<Footer />}
    />
  );
}

IndexPage.propTypes = {};

export default connect(({login})=>{return {login};})(IndexPage);