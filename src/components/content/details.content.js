import { Icon,Button,Select,Cascader,Modal,Breadcrumb,Steps,Popover,Layout} from 'antd';
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
        console.log("点击了下载按钮");
    }
    goCountryPage=()=>{
        hashHistory.goBack();
    }
    getCurrentStep=(arr)=>{
        console.log(arr,'检查一下这个object');
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
            dispatch({type:"data/shenhe",action:action,applyId:applyId,remark:remark});
        }
    }
    render(){
        const {childDetails,level} = this.props;
        const {villageStatus,townStatus,countyStatus,cityStatus} = childDetails;
        const step = this.getCurrentStep([villageStatus,townStatus,countyStatus,cityStatus]);
        const descriptions = this.getStepStatus(childDetails);
        console.log(step,level,"等级和步骤");
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
                {(5-parseInt(step))==parseInt(level) &&<Layout style={{width:"100%",marginTop:"36px",marginBottom:"64px",overflow:"hidden"}}>
                    <FixedBottom key="1" shenheHandler={this.shenheHandler}/>    
                </Layout>}
           </div>
        );
    }
};

export default DetailsContent;