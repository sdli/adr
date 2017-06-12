import { Icon,Button,Select,Cascader,Modal,Input,message } from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/city.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";


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
          <p>您要下载当前城市的统计报表？</p>
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
        this.props.dispatch({type:"data/download",downloadType:"byOrgId",id:this.props.id});    
    }
    componentDidMount(){
        this.props.dispatch({type:"data/getCountryList",orgId:this.props.id});
        this.props.dispatch({type:"data/getCountryReport",orgId:this.props.id});
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
        const {defaultValues,options,defaultInput,countryReport} = this.props;
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    <span style={{float: "left"}}>当前市/地区：</span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}
                    <div style={{float:"right"}}>
                        <Button type="primary" icon="download" onClick={this.handleExport}>
                            导出表格
                        </Button>
                    </div>
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="2">
                        <IndexTable data={countryReport} />
                    </div>
                </QueueAnim>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
           </div>
        );
    }
};

export default indexContent;