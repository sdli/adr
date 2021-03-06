import { Timeline,Icon,Button,Select,Cascader,Modal,Breadcrumb,Steps,Popover,Layout,message,Spin} from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";
import DetailWells from "../well/details.well";
import QueueAnim from 'rc-queue-anim';
import React from "react";
import {hashHistory} from "react-router";
import FixedBottom from "../well/feedBack.well";

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

const StepsDiv = function({current,descriptions}){
    return (
        <Steps current={current}>
            <Step title="村/社区" description={descriptions.step1.description} status={descriptions.step1.status} />
            <Step title="乡镇/街道" description={descriptions.step2.description} status={descriptions.step2.status} />
            <Step title="县/区" description={descriptions.step3.description} status={descriptions.step3.status} />
            <Step title="市" description={descriptions.step4.description} status={descriptions.step4.status} />
        </Steps>
    );
}

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
        this.props.dispatch({type:"data/download",downloadType:"byRosterId",id:this.props.id});
    }
    goCountryPage=()=>{
        hashHistory.goBack();
    }
    getCurrentStep=(arr)=>{
        let step = 1;
        for(let x=0;x<arr.length;x++){
            if(parseInt(arr[x]) == 3 || parseInt(arr[x])==4){
                return step++;
            }else{
                step++;
            }
        }
        return 4;
    }

    getCurrentStatus=(arr,level)=>{
        return arr[4-level];
    }

    getStepStatus=(childDetails)=>{
        return {
            step1:{
                description:childDetails.villageStatusTitle,
                status: this.getStatusFilter(childDetails.villageStatus)
            },
            step2:{
                description:childDetails.townStatusTitle,
                status: this.getStatusFilter(childDetails.townStatus) 
            },
            step3:{
                description:childDetails.countyStatusTitle,
                status: this.getStatusFilter(childDetails.countyStatus)
            },
            step4:{
                description:childDetails.cityStatusTitle,
                status: this.getStatusFilter(childDetails.cityStatus)
            }
        }
    }
    getStatusFilter=(status)=>{
        switch(status){
            case 1: return "wait";
            case 2: return "process";
            case 3: return "process";
            case 4: return "error";
            case 5: return "finish";
            default: return "process";
        }
    }

    componentDidMount(){
        this.props.dispatch({type:"data/getChildDetails",childId:this.props.id});
    }

    shenheHandler = (action)=>{
        const applyId = this.props.id;
        const dispatch = this.props.dispatch;
        return function(remark){
            if(action == 2 && remark == ""){
                alert("驳回信息时，必须填写评语！");
            }else{
                dispatch({type:"data/shenhe",action:action,applyId:applyId,remark:remark});
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible == false && this.state.visible == true){
            this.setState({
                visible: false
            });
            message.success("表格获取成功，请等待下载...");
        }
    }
    render(){
        const {childDetails,level,id,loading} = this.props;
        const {villageStatus,townStatus,countyStatus,cityStatus,auditRecords} = childDetails;
        const step = this.getCurrentStep([villageStatus,townStatus,countyStatus,cityStatus]);
        const currentStatus = this.getCurrentStatus([villageStatus,townStatus,countyStatus,cityStatus],level);
        const descriptions = this.getStepStatus(childDetails);
        return (
            <div>
                <Spin spinning={loading}>
                    <div className={styles.aboveFunctions} key="1">
                        <Breadcrumb style={{float:"left"}}>
                            <Breadcrumb.Item onClick={this.goCountryPage} style={{cursor:"pointer"}}>
                                    <Icon type="rollback" />
                                    <span>返回困境儿童列表</span>    
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Icon type="user" />
                                <span>当前儿童：{childDetails.childName}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{float:"right"}}>
                            <Button type="primary" icon="download" onClick={this.handleExport}>
                                导出信息
                            </Button>
                        </div>
                    </div>
                    <div style={{padding:"32px 20%"}}>
                        <StepsDiv current={step}  descriptions={descriptions}/>
                    </div>
                    <QueueAnim delay={200}>
                        <div style={{padding:"16px 15%"}} key="2">
                            <DetailWells 
                                {...childDetails}
                            />
                        </div>
                    </QueueAnim>
                    <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
                    {parseInt(currentStatus)==3 &&<Layout style={{width:"100%",marginTop:"36px",marginBottom:"64px",overflow:"hidden"}}>
                        <FixedBottom key="1" shenheHandler={this.shenheHandler}/>    
                    </Layout>}
                </Spin>
                <div style={{width:"70%",margin:"32px auto"}}>
                    <p style={{lineHeight:"44px"}}>操作记录：</p>
                    
                    <Timeline style={{border:"1px solid #f0f0f0",padding:"16px"}}>
                        {auditRecords && auditRecords.map((val,index)=>{
                            let dateTime = new Date(val.createTime);
                            let getDate = dateTime.getDate();
                            let year = dateTime.getFullYear();
                            let month = dateTime.getMonth();
                            return <Timeline.Item color={parseInt(val.type)==1?"green":"red"}>{year+"年"+month+"月"+getDate+"日"} {val.operatorName} 进行了：{parseInt(val.type)==1?"审核通过 ":"驳回 "}操作，备注：{val.description?val.description:"无"}</Timeline.Item>;
                        })}
                    </Timeline>
                </div>
           </div>
        );
    }
};

export default DetailsContent;