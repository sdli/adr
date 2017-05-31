import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../componets/header/";
import Sider from "../components/sider/";
import Content from "../components/content";
import Footer from "../components/footer";

function IndexPage({dispatch,login}) {
  if(!login.token) return null;
  return (
    <Layout
      type="fullContent"
      header={<Header />}
      content={<Content />}
      footer={<Footer />}
    />
  );
}

IndexPage.propTypes = {};

export default connect(({login})=>{return {login};})(IndexPage);
