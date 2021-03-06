import React,{Component} from "react";
import FullContentLayout from "./lib/full_content.js";
import LeftSiderLayout from "./lib/left_sider.js";
import RightSiderLayout from "./lib/right_sider.js";
import TopLeftSiderLayout from "./lib/top_left_sider.js" 
import { browserHistory } from 'react-router';

class MainLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {type,header,sider,content,footer,collapsed,onCollapse,mode,height,menuList,children,path} = this.props;
        const props = {header,sider,content,footer,menuList,children};
        const param = {collapsed,onCollapse,mode,height,path};
        switch (type){
            case "fullContent": return(
                <FullContentLayout components={{...props}} />
            );
            case "leftSider":
                return (
                    <LeftSiderLayout components={{...props}} param={{...param}}/>
                );
            case "RightSider":
                return (
                    <RightSiderLayout components={{...props}} />
                );
            case "TopLeftSider":
                return (
                    <TopLeftSiderLayout components={{...props}} />
                );
            default :
                return (
                    <FullContentLayout components={{...props}}/>
                );
        }
    }
}

export default MainLayout;