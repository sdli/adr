import { Icon,Button,Select,Cascader,Modal,Input,message,Breadcrumb } from 'antd';
import styles from "./content.less";
import CheckDataTable from "../tables/checkData.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";
import {hashHistory} from "react-router";

function onChange(value) {
}

function CityPicker({options,defaultValues,defaultAreaInput}){
    return(
        <Cascader options={options} onChange={onChange} size="small" style={{width:"300px"}} >
            <Input
                prefix={<Icon type="environment" />} 
                value={defaultAreaInput} 
                size="small"
                style={{
                    float: "left",
                    width: "300px",
                    cursor:"pointer"
                }} 
            />
        </Cascader>
    );
}

class indexContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            confirmLoading:false
        }
    }

    componentDidMount(){
        this.props.dispatch({type:"data/getCountryList",orgId:this.props.id});
        this.props.dispatch({type:"data/getCountryCheckReport",orgId:this.props.id});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible == false && this.state.visible == true){
            this.setState({
                visible: false
            });
            message.success("表格获取成功，请等待下载...");
        }
    }
    goBack=()=>{
        hashHistory.goBack();
    }
    render(){
        const {defaultValues,options,defaultInput,countryCheckReport,level} = this.props;
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    {level<=2 && 
                        <Breadcrumb style={{float:"left"}}>
                            <Breadcrumb.Item onClick={this.goBack} style={{cursor:"pointer"}}>
                                    <Icon type="left" />
                                    <span>返回县/区列表 / </span>    
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    <span style={{float: "left"}}>当前乡镇/街道：</span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="2">
                        <CheckDataTable data={countryCheckReport} />
                    </div>
                </QueueAnim>
           </div>
        );
    }
};

export default indexContent;