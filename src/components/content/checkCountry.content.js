import { Icon,Button,Select,Cascader,Modal,Input,message,Breadcrumb } from 'antd';
import styles from "./content.less";
import CheckCountryTable from "../tables/checkCountry.table";
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

const ExportModal = function({handleOk,visible,handleCancel,confirmLoading}){
    return(
        <Modal
          title="导出表格"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          <p>您要下载当前村/社区的保障评估报表？</p>
        </Modal>
    );
};
class indexContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            confirmLoading:false
        }
    }
    handleExport= ()=>{
        this.setState({
            visible:true
        });
    }
    handleCancel=()=>{
        this.setState(
            {visible:false}
        );
    }
    handleOk=()=>{
        this.props.dispatch({type:"data/downloadCheck",downloadType:"byVillageIdForCheck",id:this.props.id});    
    }
    componentDidMount(){
        this.props.dispatch({type:"data/getCountryList",orgId:this.props.id});
        this.props.dispatch({type:"data/getVillageCheckList",orgId:this.props.id});
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
    getReport(reports){
        return reports.map((val,index)=>{
            return {
                ...val.childRoster,
                ...val
            }
        });
    }
    render(){
        const {defaultValues,options,defaultInput,countryCheckReport,level,selectedMonth} = this.props;
        const getReport = this.getReport(countryCheckReport);
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    {level<=3 && 
                        <Breadcrumb style={{float:"left"}}>
                            <Breadcrumb.Item onClick={this.goBack} style={{cursor:"pointer"}}>
                                    <Icon type="left" />
                                    <span>返回乡镇/街道列表 / </span>    
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                    <span style={{float: "left"}}>当前村/社区：</span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}
                    <div style={{float:"right",padding:"0 16px"}}>
                        <Button type="primary" icon="download" onClick={this.handleExport} size="small">
                            导出表格
                        </Button>
                    </div>
                    <div style={{float:"right",paddingRight:"16px"}}>
                        <span>当前月份：</span>
                        <span>{selectedMonth}</span>
                    </div>
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="2">
                        <CheckCountryTable data={getReport} />
                    </div>
                </QueueAnim>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
           </div>
        );
    }
};

export default indexContent;