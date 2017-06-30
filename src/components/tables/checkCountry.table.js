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
  title: '生活保障落实',
  children:[
    {
      title:"类型",
      dataIndex: 'basicLifeHappeningTitle',
      key: 'basicLifeHappeningTitle',
    },
    {
      title:"落实情况",
      dataIndex: 'lifeHappeningDesc',
      key: 'lifeHappeningDesc', 
    }
  ]
},{
  title: '教育保障',
  children:[
    {
      title:"类型",
      dataIndex: 'educationHappeningTitle',
      key: 'educationHappeningTitle',
    },
    {
      title:"落实情况",
      dataIndex: 'educationHappeningDesc',
      key: 'educationHappeningDesc'
    }
  ]
},{
  title: '医疗保障',
  children:[
    {
      title:"类型",
      dataIndex: 'medicalHappeningTitle',
      key: 'medicalHappeningTitle',
    },
    {
      title:"落实情况",
      dataIndex: 'medicalHappeningDesc',
      key: 'medicalHappeningDesc',
    }
  ]
},{
  title: '监护保障',
    children:[
    {
      title:"类型",
      dataIndex: 'guaHappeningTitle',
      key: 'guaHappeningTitle',
    },
    {
      title:"落实情况",
      dataIndex: 'guardHappeningDesc',
      key: 'guardHappeningDesc'
    }
  ]
},{
  title: '残疾儿童福利落实',
  children:[
    {
      title:"类型",
      dataIndex: "welfareHappening",
      key:"welfareHappening"
    },
    {
      title:"落实情况",
      dataIndex: 'welfareHappeningDesc',
      key: 'welfareHappeningDesc',
    }
  ]
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
  title: '乡镇审核状态',
  dataIndex: 'townStatus',
  key: 'townStatus',
}
];
const buttonOptions = {
   href:"/checkDetails",
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
    locale={{
      emptyText: '暂无提交数据' 
    }}
    />
  );
}

export default CountryTable;

