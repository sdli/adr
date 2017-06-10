import { Icon,Button,Select,Cascader,Input,Modal } from 'antd';
import styles from "./content.less";
import CountryTable from "../tables/country.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";


const ExportModal = function({handleOk,visible,handleCancel,confirmLoading}){
    return(
        <Modal
          title="导出表格"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={confirmLoading}
        >
          <p>确认导出当前地区的表格？</p>
        </Modal>
    );
};
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
};

class countryContent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            confirmLoading:false
        }
    }
    componentDidMount(){
        this.props.dispatch({type:"data/getVillageList",orgId:this.props.id});
        this.props.dispatch({type:"data/getVillageReport",orgId:this.props.id});
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
        this.props.dispatch({type:"data/download",downloadType:"byVillageId",id:this.props.id});
    }
    render(){
        const {defaultValues,options,defaultInput,villageReport,level} = this.props;
        return (
            <div>
                <div className={styles.aboveFunctions}>
                    <span style={{float:"left"}}>当前村/社区： </span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}                    <div style={{float:"right"}}>
                        <Button type="primary" icon="download" onClick={this.handleExport}>
                            导出表格
                        </Button>
                    </div>
                </div>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="1">
                        <CountryTable data={villageReport} level={level}/>
                    </div>
                </QueueAnim>
            </div>
        );
    }

};

export default countryContent;