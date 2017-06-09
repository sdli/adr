import {Tooltip,Button} from "antd";
import { hashHistory } from 'react-router';

const getButtonType=function(status){
    switch(status){
        case "1":return "dash";
        case "2":return "default";
        case "3":return "primary";
        case "4":return "danger";
        case "5":return "default";
        default: return "default";
    }
}
export default {
    filterWithClassName:function(arr,className,buttonOptions,level=null){
        return arr.map((val,index)=>{
            if(val.key!="code" && val.key!="status"){
                val.className = className.column;
                if(typeof val.children !== "undefined"){
                    this.filterWithClassName(val.children,className.column);
                }else{
                    val.render = function(text, record, index) {
                        return (
                            <Tooltip title={text} placement="topLeft">
                                <span>{text}</span>
                            </Tooltip>
                        );
                    };
                }
            }else{
                if(val.key=="status"){
                    val.className= className.func;
                    val.render = function(text,record,index){
                        let textChange = "";
                        let type="";
                        switch (level){
                            case 1: textChange = record.cityStatusTitle;type=getButtonType(record.cityStatus);break;
                            case 2: textChange = record.countyStatusTitle;type=getButtonType(record.countyStatus);break;
                            case 3: textChange = record.townStatusTitle;type=getButtonType(record.townStatus);break;
                            default: textChange= "查看";type="default";break;
                        }
                        return (
                            <Button 
                                {...buttonOptions}
                                type={type}
                                onClick={
                                    function(){
                                        const link = (typeof record.orgId !== "undefined")?record.orgId:record.childId;
                                        const bindLink = buttonOptions.href+"/"+link;
                                        hashHistory.push(bindLink);
                                    }
                            }>
                                {textChange}
                            </Button>
                        );
                    }
                }
            }
            return val;
        });
    }
}