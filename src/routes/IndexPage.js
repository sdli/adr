import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/index.header";
import Sider from "../components/sider/index.sider";
import Content from "../components/content/index.content";
import Footer from "../components/footer";
import MenuList from "../components/menu/index.menu";

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      collapsed: false,
      mode: "inline",
      height: 640,
      menuList:[
        {text:"地区（街道）列表",icon:"contacts"},
        {text:"人员列表",icon:"flag"},
      ],
      navList:["资料审核","资料审核","账户信息"]
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
    if(typeof this.props.loading.models.login === "undefined") return null;
    return (
      <Layout
        type="leftSider"
        header={<Header navList={this.state.navList} userInfo={1} />}
        sider={<Sider />}
        content={<Content />}
        footer={<Footer />}
        menuList={<MenuList menuList={this.state.menuList} mode={this.state.mode} collapsed={this.state.collapsed} />}
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

export default connect(({login,loading})=>{return {login,loading};})(IndexPage);
