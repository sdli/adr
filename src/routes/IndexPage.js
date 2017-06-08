import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/index.header";
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
        {text:"地区（街道）列表",icon:"contacts",link:"/"},
        {text:"人员列表",icon:"flag",link:"/country/all"},
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

  onLogout=()=>{
    console.log("我要等出！");
    this.props.dispatch({type:'login/logout'});
  }

  componentDidMount(){
    console.log( window.screen.availHeight,window.screen.height);
      const height = window.screen.availHeight?window.screen.availHeight:640;
      this.setState({
          height: height-300
      });
  }

  render(){
    if(this.props.login.status === false) return null;
    const path = (typeof this.props.location.pathname !== "undefined")?this.props.location.pathname.split('\/'):["","/"];
    const {dispatch} = this.props;
    return (
      <Layout
        type="leftSider"
        header={<Header 
          navList={this.state.navList} 
          userInfo={this.props.login.loginData} 
          handleLogout={this.onLogout} 
          dispatch={dispatch}
          changePassword={this.props.data.changePassword}
          />
        }
        footer={<Footer />}
        menuList={<MenuList menuList={this.state.menuList} mode={this.state.mode} collapsed={this.state.collapsed} />}
        mode={this.state.mode}
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        height={this.state.height}
        path={path[1]}
      >
           {this.props.children}
      </Layout>
    );
  }
}

IndexPage.propTypes = {};

export default connect(({login,data,loading})=>{return {login,data,loading};})(IndexPage);
