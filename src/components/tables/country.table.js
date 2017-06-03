import { Table } from 'antd';
import tableUtils from "./lib";

const columns = [{
  title: '编号',
  dataIndex: 'code',
  key: 'code'
},{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
},{
  title: '性别',
  dataIndex: 'info1',
  key: 'info1'
},{
  title: '出生年月',
  dataIndex: 'info2',
  key: 'info2',
},{
  title: '联系方式',
  dataIndex: 'info3',
  key: 'info3',
},{
  title: '住所',
  dataIndex: 'info4',
  key: 'info4',
},{
  title: '困境类型',
  dataIndex: 'info6',
  key: 'info6',
},{
  title: '生活保障',
  dataIndex: 'info7',
  key: 'info7',
},{
  title: '教育保障',
  dataIndex: 'info11',
  key: 'info11',
},{
  title: '医疗保障',
  dataIndex: 'info8',
  key: 'info8',
},{
  title: '监护保障',
  dataIndex: 'info9',
  key: 'info9',
},{
  title: '残疾儿童服务',
  dataIndex: 'info10',
  key: 'info10',
},{
  title: '操作',
  dataIndex: 'funcs',
  key: 'funcs',
}
];
const buttonOptions = {
   href:"/details",
   icon:"file",
   size: "small"
};
const classes = {
    column: "countryColumn",
    func: "functionColumn"
};
const FinalOptions = tableUtils.filterWithClassName(columns,classes,buttonOptions);
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    code: i,
    name: 'John Brown',
    info1: i + 1,
    info2: i + 1,
    info3: "深圳市福田区高新大道9897号12398区",
    info4: i + 1,
    info5: i + 1,
    info6: i + 1,
    info7: i + 1,
    info8: i + 1,
    info9: i + 1,
    info10: i + 1,
    info11: i + 1,
    funcs:(Math.random()*10>5)?"1":"2",
    id:"2391720ur"
  });
}

const CountryTable = function(){
  return (<Table
    columns={FinalOptions}
    dataSource={data}
    size="small"
    pagination={{
      total:data.length,
      pageSize:15,
      showTotal:(total,range) => `当前${range[0]-1}-${range[1]-1} , 共计 ${total} 条数据`,
      defaultCurrent:1
    }}
    />
  );
}

export default CountryTable;

