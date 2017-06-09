import React from 'react';
import { connect } from 'dva';
import Layout from "../components/layout/main.layout";
import Header from "../components/header/index.header";
import Content from "../components/content/index.content";
import Footer from "../components/footer";
import MenuList from "../components/menu/index.menu";
import {message} from "antd";

class IndexPage extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      collapsed: false,
      mode: "inline",
      height: 640,
      navList:["资料审核"]
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
    this.props.dispatch({type:'login/logout'});
  }

  componentDidMount(){
      const height = window.screen.availHeight?window.screen.availHeight:640;
      this.setState({
          height: height-300
      });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.data.changePasswordMessageAlert,"检查data");
    if(nextProps.data.changePasswordMessageAlert && nextProps.data.changePasswordMessageAlert != this.props.data.changePasswordMessageAlert){
        switch(nextProps.data.changePasswordMessageType){
          case "success":
            message.success(nextProps.data.changePasswordMessageText);
            const logout = this.onLogout;
            setTimeout(function(){logout();},1000);
            break;
          case "error":
            message.error(nextProps.data.changePasswordMessageText);
            break;
          default:
            return true;
        }
        this.props.dispatch({type:"data/closeMessage",alertType:"changePassword"});
    }
    return true;
  }

  getMenuLink = (loginData)=>{
    switch(loginData.orgLevel){
      case 1: return "/city/"+loginData.orgId;
      case 2: return "/area/"+loginData.orgId;
      case 3: return "/data/"+loginData.orgId;
      default: return "/";
    }
  }
  
  render(){
    if(this.props.login.status === false) return null;
    const path = (typeof this.props.location.pathname !== "undefined")?this.props.location.pathname.split('\/'):["","/"];
    const {dispatch} = this.props;
    const menuList=[
        {text:"总列表",icon:"contacts",link:this.getMenuLink(this.props.login.loginData)}
    ];
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
        menuList={<MenuList menuList={menuList} mode={this.state.mode} collapsed={this.state.collapsed} />}
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
