import { Icon,Button,Select,Cascader,Modal,Input,message,DatePicker,Spin } from 'antd';
import styles from "./content.less";
import moment from 'moment';
import CheckCityTable from "../tables/checkCity.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";

const { MonthPicker } = DatePicker;

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
    disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }
    getMonth(){
        let date = new Date();
        let Month = date.getMonth()+1;
        let Year = date.getFullYear();
        return Year+"/"+Month;
    }
    monthChange(id){
        const dispatch = this.props.dispatch;
        return function(moment,values){
            dispatch({type:"data/getCountryCheckReport",orgId:id,month:values});
        }
    }
    render(){
        const {defaultValues,options,defaultInput,countryCheckReport,level,loading} = this.props;
        console.log(countryCheckReport,"检查是否为array");
        const month = this.getMonth();
        return (
            <div>
                <div className={styles.aboveFunctions} key="1">
                    <span style={{float: "left"}}>当前市/地区：</span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}
                    <div style={{float:"right",paddingRight:"16px"}}>
                        <span>当前月份：</span>
                        <MonthPicker
                            size="small"
                            defaultValue={moment(month, 'YYYY/MM')} placeholder="选择月份"
                            disabledDate={this.disabledDate}
                            onChange={this.monthChange(this.props.id)}
                        />
                    </div>
                </div>
                <Spin spinning={loading}>
                    <QueueAnim delay={200}>
                        <div style={{padding:"16px 0"}} key="2">
                            <CheckCityTable data={countryCheckReport} />
                        </div>
                    </QueueAnim>
                </Spin>
           </div>
        );
    }
};

export default indexContent;