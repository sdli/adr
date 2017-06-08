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

const StepsDiv = function({current,status,descriptions}){
    const customDot = (dot, { status, index }) => (
        <Popover content={<span>step {index} status: {status}</span>}>
            {dot}
        </Popover>);

    return (
        <Steps current={current} status={status}>
            <Step title="村/社区" description={descriptions.villageStatus.text} />
            <Step title="乡镇/街道" description={descriptions.townStatus.text} />
            <Step title="县/区" description={descriptions.countyStatus.text} />
            <Step title="市" description={descriptions.cityStatus.text} />
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
    getCurrentStep=(obj)=>{
        let step = 0;
        let status = "";
        let text = "";
        let tempStatus = "";
        let descriptions={};
        for(let x in obj){
            switch (obj.x){
                case 1: status = "wait"; text="待审核";break;
                case 2: status = "process"; text="已提交";break;
                case 3: status = "process"; text="审核中";break;
                case 4: status = "error"; text="被驳回";break;
                case 5: status = "finish"; text="已通过";break;
                default: status = "error"; text="被驳回";
            }
            descriptions[x] = {status:status,text:text};
            if(obj.x != 1){step++;}else{tempStatus=status;}
        }
        return {
            step: step,
            status: tempStatus,
            descriptions: descriptions
        };
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
        const {childDetails} = this.props;
        const {villageStatus,townStatus,countyStatus,cityStatus} = childDetails;
        const status = this.getCurrentStep({villageStatus,townStatus,countyStatus,cityStatus});
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
                    <StepsDiv current={status.step} status={status.status} descriptions={status.descriptions}/>
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 15%"}} key="2">
                        <DetailWells 
                            {...childDetails}
                        />
                    </div>
                </QueueAnim>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
                <Layout style={{width:"100%",marginTop:"36px",marginBottom:"64px",overflow:"hidden"}}>
                    <FixedBottom key="1" shenheHandler={this.shenheHandler}/>    
                </Layout>
           </div>
        );
    }
};

export default DetailsContent;