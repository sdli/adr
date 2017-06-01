import React,{Component} from "react";
import FullContentLayout from "./lib/full_content.js";
import LeftSiderLayout from "./lib/left_sider.js";
import RightSiderLayout from "./lib/right_sider.js";
import TopLeftSiderLayout from "./lib/top_left_sider.js" 

class MainLayout extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {type,header,sider,content,footer,collapsed,onCollapse,mode,height} = this.props;
        const props = {header,sider,content,footer};
        const param = {collapsed,onCollapse,mode,height};
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