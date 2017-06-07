import {Tooltip,Button} from "antd";
import { hashHistory } from 'react-router';

export default {
    filterWithClassName:function(arr,className,buttonOptions){
        return arr.map((val,index)=>{
            if(val.key!="code" && val.key!="funcs"){
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
                if(val.key=="funcs"){
                    val.className= className.func;
                    val.render = function(text,record,index){
                        let textChange = "";
                        let type="";
                        switch (record.funcs){
                            case "1": textChange = "待审核";type="primary";break;
                            case "2": textChange = "已通过";type="dashed";break;
                            case "3": textChange = "已驳回";type="danger";break;
                            default: textChange= "查看";type="default";break;
                        }
                        return (
                            <Button 
                                {...buttonOptions}
                                type={type}
                                onClick={
                                    function(){
                                        console.log(buttonOptions.href+"/"+record.id);
                                        hashHistory.push(buttonOptions.href+"/"+record.id);
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