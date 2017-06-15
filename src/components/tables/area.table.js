import { Table } from 'antd';
import tableUtils from "./lib";

const columns = [
{
  title: '乡镇名称',
  dataIndex: 'orgName',
  key: 'orgName'
},  
{
  title: '孤儿',
  dataIndex: 'orphanCount',
  key: 'orphanCount'
},  
{
  title: '特困儿童',
  dataIndex: 'provertyCount',
  key: 'provertyCount',
},  
{
  title: '重病重残',
  dataIndex: 'disabilityCount',
  key: 'disabilityCount',
},  
{
  title: '其他困境',
  dataIndex: 'otherDifficultCount',
  key: 'otherDifficultCount',
},  
{
  title: '合计',
  dataIndex: 'total',
  key: 'total',
},  
{
  title: '基本生活保障',
  children: [{
    title: '已保',
    dataIndex: 'baseProtectCount',
    key: 'baseProtectCount'
  }, {
    title: '未保',
    dataIndex: "baseNotProtectCount",
    key:"baseNotProtectCount",
  }],
},
{
  title: '教育保障',
  children: [{
    title: '已保',
    dataIndex: 'eduProtectCount',
    key: 'eduProtectCount'
  }, {
    title: '未保',
    dataIndex: "eduNotProtectCount",
    key:"eduNotProtectCount",
  }],
},
{
  title: '基本医疗保障',
  children: [{
    title: '已保',
    dataIndex: 'medicalProtectCount',
    key: 'medicalProtectCount'
  }, {
    title: '未保',
    dataIndex: "medicalNotProtectCount",
    key:"medicalNotProtectCount",
  }],
},
{
  title: '落实监护责任',
  children: [{
    title: '已保',
    dataIndex: 'custodyCount',
    key: 'custodyCount'
  }, {
    title: '未保',
    dataIndex: "custodyNotCount",
    key:"custodyNotCount"
  }],
},
{
  title: '残疾儿童福利',
  children: [{
    title: '已保',
    dataIndex: 'disabilityWelfareCount',
    key: 'disabilityWelfareCount'
  }, {
    title: '未保',
    dataIndex: "disabilityNotWelfareCount",
    key:"disabilityNotWelfareCount"
  }],
},
{
  title: '状态/操作',
  dataIndex: 'status',
  key: 'status',
  width: 100
}
];

const buttonOptions = {
   href:"/data",
   icon:"file",
   size: "small"
};
const classes = {
    column: "countryColumn",
    func: "functionColumn"
};
const FinalOptions = tableUtils.filterWithClassName(columns,classes,buttonOptions);

const IndexTable = function({data}){
  return (<Table
    columns={FinalOptions}
    dataSource={data}
    size="small"
    pagination={{
      total:data?data.length:0,
      pageSize:15,
      showTotal:(total,range) => `当前${range[0]}-${range[1]} , 共计 ${total} 条数据`,
      defaultCurrent:1
    }}
    locale={{
      emptyText: '暂无提交数据' 
    }}
    />
  );
}

export default IndexTable;

