import {Collapse,Col,Row,Checkbox} from "antd";
import React from "react";
import styles from "./well.less";
const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: '#f8f8f8',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
};
const selectOptions = {
    jianhu: [
        { label: '监护良好', value: '1' },
        { label: '监护一般', value: '2' },
        { label: '未监护', value: '3'},
    ],
    leibie:[
        { label: 'A. 孤儿', value: '1' },
        { label: 'B. 特困儿童', value: '2' },
        { label: 'C. 重病重残儿童', value: '3'},
        { label: 'D. 贫困家庭儿童', value: '4'},
        { label: 'E-1. 贫困家庭儿童', value: '5'},
        { label: 'E-2. 贫困家庭儿童', value: '6'},
        { label: 'E-3. 贫困家庭儿童', value: '7'},
        { label: 'E-4. 贫困家庭儿童', value: '8'},
        { label: 'E-5. 贫困家庭儿童', value: '9'},
    ],
    fuli:[
        { label: 'A. 纳入明天计划', value: '1' },
        { label: 'B. 免费配置康复工具', value: '2' },
        { label: 'C. 免费进行康复训练', value: '3'},
        { label: 'D. 接受福利机构代替照料、养育辅导、康复训练等服务', value: '4'},
    ],
    shenghuo:[
        { label: 'A. 孤儿保障', value: '1' },
        { label: 'B. 特困救助', value: '2' },
        { label: 'C. 低保救助', value: '3'},
        { label: 'D. 临时救助', value: '4'},
        { label: 'E. 残疾人两项补贴', value: '5'},
        { label: 'F. 其他形式保障', value: '6'},
        { label: 'G. 未保障', value: '7'},
    ],
    jiaoyu:[
        { label: 'A. 学前阶段保障', value: '1' },
        { label: 'B. 义务教育两免一补', value: '2' },
        { label: 'C. 高中、中职教育资助', value: '3'},
        { label: 'D. 辍学', value: '4'},
        { label: 'E. 未入学', value: '5'},
        { label: 'F. 未保障', value: '6'},
    ],
    yiliao:[
        { label: 'A. 居民医疗保险', value: '1' },
        { label: 'B. 大病医疗保险', value: '2' },
        { label: 'C. 大病补充医疗保险', value: '3'},
        { label: 'D. 大病医疗救助', value: '4'},
        { label: 'E. 慈善救助', value: '5'},
        { label: 'F. 未救助', value: '6'},
    ]

}
class CollapseInfos extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {name} = this.props;
        return (
            <Collapse bordered={false} defaultActiveKey={['1','2','3','4','5','6']} id="jianhu" >
                <Panel header="基本信息" key="1" style={customPanelStyle}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>姓名：</span>{name}</p>
                                </Col>
                                <Col span={12}>
                                    <p className={styles.detailsSpan}><span>身份证：</span>{name}</p>
                                </Col>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>性别：</span>{name}</p>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>民族：</span>{name}</p>
                                </Col>
                                <Col span={12}>
                                    <p className={styles.detailsSpan}><span>家庭人口：</span>{name}</p>
                                </Col>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>出生年月：</span>{name}</p>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={24}>
                                    <p className={styles.detailsSpan}><span>户籍地：</span>{name}</p>
                                </Col>
                            </Row>
                            <p style={{marginTop:16}}>致困原因</p>
                            <Row>
                                <Col span={24}>
                                    <p className={styles.detailsSpan}><span>姓名：</span>{name}</p>
                                </Col>
                                <Col span={24}>
                                    <p className={styles.detailsSpan}><span>姓名：</span>{name}</p>
                                </Col>
                                <Col span={24}>
                                    <p className={styles.detailsSpan}><span>姓名：</span>{name}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <div style={{padding:"8px 15%"}}>
                                <img src={require("../../assets/touxiang.jpg")} style={{maxWidth:"150px"}} />
                            </div>
                        </Col>
                    </Row>
                </Panel>
                <Panel header="户主信息" key="2" style={customPanelStyle}>
                        <Col span={24}>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>姓名：</span>{name}</p>
                                </Col>
                                <Col span={12}>
                                    <p className={styles.detailsSpan}><span>身份证：</span>{name}</p>
                                </Col>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>性别：</span>{name}</p>
                                </Col>
                            </Row>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>民族：</span>{name}</p>
                                </Col>
                                <Col span={12}>
                                    <p className={styles.detailsSpan}><span>家庭人口：</span>{name}</p>
                                </Col>
                                <Col span={6}>
                                    <p className={styles.detailsSpan}><span>出生年月：</span>{name}</p>
                                </Col>
                            </Row>
                            <p style={{marginTop:16}}>监护情况</p>
                            <CheckboxGroup options={selectOptions.jianhu} disabled defaultValue={['2']} />
                        </Col>
                </Panel>
                <Panel header="困境类别" key="3" style={customPanelStyle}>
                    <CheckboxGroup options={selectOptions.leibie} disabled defaultValue={['2']} />
                    <p style={{marginTop:16}}>监护情况</p>
                    <CheckboxGroup options={selectOptions.fuli} disabled defaultValue={['2']} />
                </Panel>
                <Panel header="生活保障" key="4" style={customPanelStyle}>
                    <CheckboxGroup options={selectOptions.shenghuo} disabled defaultValue={['2']} />
                </Panel>
                <Panel header="教育保障" key="5" style={customPanelStyle}>
                    <CheckboxGroup options={selectOptions.jiaoyu} disabled defaultValue={['2']} />
                </Panel>
                <Panel header="医疗保障" key="6" style={customPanelStyle}>
                    <CheckboxGroup options={selectOptions.yiliao} disabled defaultValue={['2']} />
                </Panel>
            </Collapse>
        );
    }
}

export default CollapseInfos;