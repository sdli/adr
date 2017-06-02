import { Icon,Button,Select,Cascader } from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";

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



const indexContent = function(){
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
            <div style={{padding:"16px 0"}}>
                <IndexTable />
            </div>
        </div>
    );
};

export default indexContent;