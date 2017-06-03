import { Icon,Button,Select,Cascader,Modal,Breadcrumb,Steps,Popover} from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";
import DetailWells from "../well/details.well";
import QueueAnim from 'rc-queue-anim';
import React from "react";
import {hashHistory} from "react-router";
const Step = Steps.Step;

const ExportModal = function({handleOk,visible,handleCancel,confirmLoading}){
    return(
        <Modal
          title="导出表格"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          <p>确认导出表格？</p>
        </Modal>
    );
};

const StepsDiv = function(){
    const customDot = (dot, { status, index }) => (
        <Popover content={<span>step {index} status: {status}</span>}>
            {dot}
        </Popover>);

    return (
        <Steps current={1} status="success">
            <Step title="村/社区" description="采集完成" />
            <Step title="乡镇/街道" description="审核通过" />
            <Step title="县/区" description="待审核" />
            <Step title="市" description="待审核" />
        </Steps>
    );
}

const UserData = {
    name:"王小贱",
    id:"12398179709797234"
};

class DetailsContent extends React.Component{
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
        console.log("点击了下载按钮");
    }
    goCountryPage=()=>{
        hashHistory.goBack();
    }
    render(){
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    <span>当前地区：</span>
                      <Breadcrumb style={{float:"left"}}>
                        <Breadcrumb.Item onClick={this.goCountryPage} style={{cursor:"pointer"}}>
                                <Icon type="home" />
                                <span>困境儿童列表</span>    
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Icon type="user" />
                            <span>人员详情</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{float:"right"}}>
                        <Button type="primary" icon="download" onClick={this.handleExport}>
                            导出信息
                        </Button>
                    </div>
                </div>
                <div style={{padding:"32px 20%"}}>
                    <StepsDiv />
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 15%"}} key="2">
                        <DetailWells 
                            {...UserData}
                        />
                    </div>
                </QueueAnim>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
           </div>
        );
    }
};

export default DetailsContent;