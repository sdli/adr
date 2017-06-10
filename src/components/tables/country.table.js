import { Table } from 'antd';
import tableUtils from "./lib";

const columns = [{
  title: '姓名',
  dataIndex: 'childName',
  key: 'childName'
},{
  title: '性别',
  dataIndex: 'childSex',
  key: 'childSex'
},{
  title: '出生年月',
  dataIndex: 'childBornTime',
  key: 'childBornTime',
},{
  title: '联系方式',
  dataIndex: 'guaTelNum',
  key: 'guaTelNum',
},{
  title: '住所',
  dataIndex: 'address',
  key: 'address',
},{
  title: '困境类型',
  dataIndex: 'dilemmaCategoryTitle',
  key: 'dilemmaCategoryTitle',
},{
  title: '生活保障',
  dataIndex: 'basicLifeHappeningTitle',
  key: 'basicLifeHappeningTitle',
},{
  title: '教育保障',
  dataIndex: 'educationHappeningTitle',
  key: 'educationHappeningTitle',
},{
  title: '医疗保障',
  dataIndex: 'medicalHappeningTitle',
  key: 'medicalHappeningTitle',
},{
  title: '监护保障',
  dataIndex: 'guaHappeningTitle',
  key: 'guaHappeningTitle',
},{
  title: '残疾儿童服务',
  dataIndex: 'welfareHappeningTitle',
  key: 'welfareHappeningTitle',
},{
  title: '操作',
  dataIndex: 'status',
  key: 'status',
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
const FinalOptions = function(level){
  return tableUtils.filterWithClassName(columns,classes,buttonOptions,level);
}

const CountryTable = function({data,level}){
  return (<Table
    columns={FinalOptions(level)}
    dataSource={data}
    size="small"
    pagination={{
      total:data.length,
      pageSize:15,
      showTotal:(total,range) => `当前${range[0]}-${range[1]} , 共计 ${total} 条数据`,
      defaultCurrent:1
    }}
    />
  );
}

export default CountryTable;

