import {Tooltip,Button,Icon} from "antd";
import { hashHistory } from 'react-router';

const getButtonType=function(status){
    switch(status){
        case 1:return "dash";
        case 2:return "default";
        case 3:return "primary";
        case 4:return "danger";
        case 5:return "default";
        default: return "default";
    }
}
export default {
    filterWithClassName:function(arr,className,buttonOptions,level=null){
        let tempArr = ["guardHappening","medicalHappening","educationHappening","lifeHappening","welfareHappening"];
        return arr.map((val,index)=>{
            if(val.key!="code" && val.key!="status"&&val.key!="townStatus"){
                val.className = className.column;
                if(typeof val.children !== "undefined"){
                    this.filterWithClassName(val.children,className);
                }else{
                    if(tempArr.some(function(value,index){
                        if(value == val.key){
                            return true;
                        }else{
                            return false;
                        }
                    })){
                        val.render = function(text, record, index) {
                            return (
                                <span className={val.className}>{parseInt(text)==1?"已落实":"未落实"}</span>
                            );
                        };
                    }else{
                        val.render = function(text, record, index) {
                            return (
                                <Tooltip title={text||"暂无"} placement="topLeft">
                                    <span className={val.className}>{text===0?0:text || "—"}</span>
                                </Tooltip>
                            );
                        };
                    }

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
                if(val.key=="townStatus"){
                    val.className= className.func;
                    const succ = <span><Icon type="check-circle" style={{color:"green"}}/> 评估已核查！</span>;
                    const fail = <span><Icon type="frown-o" style={{color:"red"}} /> 未核查！</span>;
                    val.render = function(text,record,index){
                        return parseInt(text)==1?succ:fail;
                    }
                }
            }
            return val;
        });
    }
}