import { Table } from 'antd';

const columns = [{
  title: '编号',
  dataIndex: 'code',
  key: 'code'
},
{
  title: '区/县',
  dataIndex: 'name',
  key: 'name'
},  
{
  title: '地区信息1',
  dataIndex: 'info1',
  key: 'info1'
},  
{
  title: '地区信息2',
  dataIndex: 'info2',
  key: 'info2',
},  
{
  title: '地区信息3',
  dataIndex: 'info3',
  key: 'info3',
},  
{
  title: '地区信息4',
  dataIndex: 'info4',
  key: 'info4',
},  
{
  title: '地区信息5',
  dataIndex: 'info5',
  key: 'info5',
},  
{
  title: '综合1',
  children: [{
    title: '综合1-1',
    dataIndex: 'group11',
    key: 'group11'
  }, {
    title: '综合1-2',
    dataIndex: "group12",
    key:"group12",
  }],
},
{
  title: '综合2',
  children: [{
    title: '综合2-1',
    dataIndex: 'group21',
    key: 'group21'
  }, {
    title: '综合2-2',
    dataIndex: "group22",
    key:"group22",
  }],
},
{
  title: '综合3',
  children: [{
    title: '综合3-1',
    dataIndex: 'group31',
    key: 'group31'
  }, {
    title: '综合3-2',
    dataIndex: "group32",
    key:"group32",
  }],
},
{
  title: '综合4',
  children: [{
    title: '综合4-1',
    dataIndex: 'group41',
    key: 'group41'
  }, {
    title: '综合4-2',
    dataIndex: "group42",
    key:"group42"
  }],
},
{
  title: '综合5',
  children: [{
    title: '综合5-1',
    dataIndex: 'group51',
    key: 'group51'
  }, {
    title: '综合5-2',
    dataIndex: "group52",
    key:"group52"
  }],
},
{
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  width: 100
}
];

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
    status: 'C'
  });
}

const IndexTable = function(){
  return (<Table
    columns={columns}
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

