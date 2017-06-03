import { Icon,Button,Select,Cascader,Modal } from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";

const options = [{
  value: 'henan',
  label: '河南省',
  children: [{
    value: 'luohe',
    label: '漯河市',
    children: [
        {
            value: 'all',
            label: '全部'
        },{
            value: 'huiyuanqu',
            label: '源汇区',
            children:[
                {
                    value:"all",
                    label: '全部'    
                },
                {
                    value:"fenghuang",
                    label: '凤凰镇'    
                },
                {
                    value:"fenghuang",
                    label: '凤凰镇'    
                },
                {
                    value:"fenghuang",
                    label: '凤凰镇'    
                }
            ]
        },{
            value: 'shaolingqu',
            label: '万县'
        }],
  }],
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [{
    value: 'nanjing',
    label: '南京',
    children: [{
      value: 'zhonghuamen',
      label: '中华门',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

const CityPicker= function(){
    return(
        <Cascader defaultValue={['henan', 'luohe', 'huiyuanqu',"all"]} options={options} onChange={onChange} size="small" style={{width:"300px"}} />
    );
};

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
    render(){
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    <span>当前地区：</span>
                    <CityPicker />
                    <div style={{float:"right"}}>
                        <Button type="primary" icon="download" onClick={this.handleExport}>
                            导出表格
                        </Button>
                    </div>
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="2">
                        <IndexTable />
                    </div>
                </QueueAnim>
                <ExportModal  handleOk={this.handleOk} visible={this.state.visible} handleCancel={this.handleCancel}/>
           </div>
        );
    }
};

export default indexContent;