import { Icon,Button,Select,Cascader } from 'antd';
import styles from "./content.less";
import IndexTable from "../tables/index.table";

const options = [{
  value: 'henan',
  label: '河南',
  children: [{
    value: 'luohe',
    label: '漯河市',
    children: [{
      value: 'huiyuanqu',
      label: '源汇区',
    },{
      value: 'shaolingqu',
      label: '召陵区',
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
        <Cascader defaultValue={['henan', 'luohe', 'shaolingqu']} options={options} onChange={onChange} size="small" />
    );
};



const indexContent = function(){
    return (
        <div>
            <div className={styles.aboveFunctions}>
                <CityPicker />
                <div style={{float:"right"}}>
                    <Button type="primary" icon="download">
                        导出表格
                    </Button>
                </div>
            </div>
            <div>
                <IndexTable />
            </div>
        </div>
    );
};

export default indexContent;