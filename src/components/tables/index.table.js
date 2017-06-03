import { Table } from 'antd';
import tableUtils from "./lib";

const columns = [{
  title: '编号',
  dataIndex: 'code',
  key: 'code',
},
{
  title: '村名',
  dataIndex: 'name',
  key: 'name'
},  
{
  title: '孤儿',
  dataIndex: 'info1',
  key: 'info1'
},  
{
  title: '特困儿童',
  dataIndex: 'info2',
  key: 'info2',
},  
{
  title: '重病重残',
  dataIndex: 'info3',
  key: 'info3',
},  
{
  title: '其他困境',
  dataIndex: 'info4',
  key: 'info4',
},  
{
  title: '合计',
  dataIndex: 'info5',
  key: 'info5',
},  
{
  title: '基本生活保障',
  children: [{
    title: '已保',
    dataIndex: 'group11',
    key: 'group11'
  }, {
    title: '未保',
    dataIndex: "group12",
    key:"group12",
  }],
},
{
  title: '教育保障',
  children: [{
    title: '已保',
    dataIndex: 'group21',
    key: 'group21'
  }, {
    title: '未保',
    dataIndex: "group22",
    key:"group22",
  }],
},
{
  title: '基本医疗保障',
  children: [{
    title: '已保',
    dataIndex: 'group31',
    key: 'group31'
  }, {
    title: '未保',
    dataIndex: "group32",
    key:"group32",
  }],
},
{
  title: '落实监护责任',
  children: [{
    title: '已保',
    dataIndex: 'group41',
    key: 'group41'
  }, {
    title: '未保',
    dataIndex: "group42",
    key:"group42"
  }],
},
{
  title: '残疾儿童福利',
  children: [{
    title: '已保',
    dataIndex: 'group51',
    key: 'group51'
  }, {
    title: '未保',
    dataIndex: "group52",
    key:"group52"
  }],
},
{
  title: '状态/操作',
  dataIndex: 'funcs',
  key: 'funcs',
  width: 100
}
];

const buttonOptions = {
   href:"/country",
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
    info3: i + 1,
    info4: i + 1,
    info5: i + 1,
    group11: 'Lake Park',
    group12: 'Lake Park',
    group21: 'Lake Park',
    group22: 'Lake Park',
    group31: 'Lake Park',
    group32: 'Lake Park',
    group41: 'Lake Park',
    group42: 'Lake Park',
    group51: 'Lake Park',
    group52: 'Lake Park',
    funcs: '0',
    id:"E343534519195"
  });
}

const IndexTable = function(){
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

export default IndexTable;

