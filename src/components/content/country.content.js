import { Icon,Button,Select,Cascader } from 'antd';
import styles from "./content.less";
import CountryTable from "../tables/country.table";
import QueueAnim from 'rc-queue-anim';

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
                    value:"fenghuang1",
                    label: '凤凰镇',
                    children:[
                        {
                            value:"xianhe",
                            label:"县河村"
                        }
                    ]   
                },
                {
                    value:"fenghuang2",
                    label: '凤凰镇'  
                },
                {
                    value:"fenghuang3",
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
        <Cascader defaultValue={['henan', 'luohe', 'huiyuanqu',"fenghuang1","xianhe"]} options={options} onChange={onChange} size="small" style={{width:"300px"}} />
    );
};

const countryContent = function({loginInfo}){
    console.log(loginInfo,'from country table');
    return (
        <div>
            <div className={styles.aboveFunctions}>
                <span>当前地区：</span>
                <CityPicker />
                <div style={{float:"right"}}>
                    <Button type="primary" icon="download">
                        导出表格
                    </Button>
                </div>
            </div>
            <QueueAnim delay={200}>
                <div style={{padding:"16px 0"}} key="1">
                    <CountryTable />
                </div>
            </QueueAnim>
        </div>
    );
};

export default countryContent;