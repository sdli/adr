import { Icon,Button,Select,Cascader,Input } from 'antd';
import styles from "./content.less";
import CountryTable from "../tables/country.table";
import QueueAnim from 'rc-queue-anim';
import React from "react";


function onChange(value) {
  console.log(value);
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
    }
    componentDidMount(){
        this.props.dispatch({type:"data/getVillageList",orgId:this.props.id});
        this.props.dispatch({type:"data/getVillageReport",orgId:this.props.id});
    }
    render(){
        const {defaultValues,options,defaultInput,villageReport} = this.props;
        console.log(villageReport);
        return (
            <div>
                <div className={styles.aboveFunctions}>
                    <span style={{float:"left"}}>当前地区： </span>
                    {options && <CityPicker options={options} defaultValue={defaultValues} defaultAreaInput={defaultInput} />}                    <div style={{float:"right"}}>
                        <Button type="primary" icon="download">
                            导出表格
                        </Button>
                    </div>
                </div>
                <QueueAnim delay={200}>
                    <div style={{padding:"16px 0"}} key="1">
                        <CountryTable data={villageReport} />
                    </div>
                </QueueAnim>
            </div>
        );
    }

};

export default countryContent;