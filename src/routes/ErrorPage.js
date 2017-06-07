import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/login.header";
import Footer from "../components/footer";
import {Alert} from "antd";

const Content = function(){
    return (
        <div style={{padding:"64px 0",minHeight:"800px"}}>
                <div style={{maxWidth:"480px",margin:"16px auto"}}>
                    <Alert
                            message="错误 404"
                            description="发生了错误，暂时无法连接服务器，请稍后再试！"
                            type="error"
                            showIcon
                        />
                </div>

        </div>
    );
}

function ErrorPage({dispatch,login,loading}) {

  console.log(loading);
  const handleSubmit = (values) => {
    dispatch({type:"login/login",loginInfo:values});
  }

  return (
    <Layout
      type="fullContent"
      header={<Header />}
      content={<Content />}
      footer={<Footer />}
    />
  );
}

ErrorPage.propTypes = {};

export default connect(({loading})=>{return {loading};})(ErrorPage);