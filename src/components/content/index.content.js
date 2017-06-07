import { Icon,Button,Select,Cascader,Modal,Input } from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";


function onChange(value) {
  console.log(value);
}

function CityPicker({options,defaultValues,defaultAreaInput}){
    console.log(defaultAreaInput,"看到了这个");
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
          <p><span style={{lineHeight:"32px"}}>选择城市/地区进行下载</span><br/><CityPicker /></p>
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
        console.log("点击了下载按钮");
    }
    componentDidMount(){
        console.log(this.props);
        this.props.dispatch({type:"data/getCountryList",orgId:this.props.id});
        this.props.dispatch({type:"data/getCountryReport",orgId:this.props.id});
    }
    render(){
        const {defaultValues,options,defaultInput,countryReport} = this.props;
        console.log(options);
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    <span style={{float: "left"}}>当前地区：</span>
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