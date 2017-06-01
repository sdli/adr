import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/index.header";
import Sider from "../components/sider/index.sider";
import Content from "../components/content/index.content";
import Footer from "../components/footer";
import La from "../components/layout/test.layout";

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      collapsed: false,
      mode: "inline",
      height: 640
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount(){
    console.log( window.screen.availHeight,window.screen.height);
      const height = window.screen.availHeight?window.screen.availHeight:640;
      this.setState({
          height: height-300
      });
  }

  render(){
    return (
      <Layout
        type="leftSider"
        header={<Header />}
        sider={<Sider />}
        content={<Content />}
        footer={<Footer />}
        mode={this.state.mode}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        height={this.state.height}
      >
      </Layout>
    );
  }
}

IndexPage.propTypes = {};

export default connect(({login})=>{return {login};})(IndexPage);
