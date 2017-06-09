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
        { label: '监护良好', value: 'A' },
        { label: '监护一般', value: 'B' },
        { label: '未监护', value: '0'},
    ],
    leibie:[
        { label: 'A. 孤儿', value: 'A' },
        { label: 'B. 特困儿童', value: 'B' },
        { label: 'C. 重病重残儿童', value: 'C'},
        { label: 'D. 贫困家庭儿童', value: 'D'},
        { label: 'E-1. 其他-打拐解救儿童', value: 'E-1'},
        { label: 'E-2. 其他-服刑人员子女', value: 'E-2'},
        { label: 'E-3. 其他-强制隔离戒毒人员子女', value: 'E-3'},
        { label: 'E-4. 其他-受虐待儿童', value: 'E-4'},
        { label: 'E-5. 其他-被恶意弃养儿童', value: 'E-5'},
        { label: 'E-6. 其他情况', value: 'E-6'}
    ],
    fuli:[
        { label: 'A. 纳入明天计划', value: 'A' },
        { label: 'B. 免费配置康复工具', value: 'B' },
        { label: 'C. 免费进行康复训练', value: 'C'},
        { label: 'D. 接受福利机构代替照料、养育辅导、康复训练等服务', value: 'D'},
    ],
    shenghuo:[
        { label: 'A. 孤儿保障', value: 'A' },
        { label: 'B. 特困救助', value: 'B' },
        { label: 'C. 低保救助', value: 'C'},
        { label: 'D. 临时救助', value: 'D'},
        { label: 'E. 残疾人两项补贴', value: 'E'},
        { label: 'F. 其他形式保障', value: 'F'},
        { label: 'G. 未保障', value: '0'},
    ],
    jiaoyu:[
        { label: 'A. 学前阶段保障', value: 'A' },
        { label: 'B. 义务教育两免一补', value: 'B' },
        { label: 'C. 高中、中职教育资助', value: 'C'},
        { label: 'D. 辍学', value: 'D'},
        { label: 'E. 未入学', value: 'E'},
        { label: 'F. 未保障', value: '0'},
    ],
    yiliao:[
        { label: 'A. 居民医疗保险', value: 'A' },
        { label: 'B. 大病医疗保险', value: 'B' },
        { label: 'C. 大病补充医疗保险', value: 'C'},
        { label: 'D. 大病医疗救助', value: 'D'},
        { label: 'E. 慈善救助', value: 'E'},
        { label: 'F. 未救助', value: '0'},
    ]

}
const CollapseInfos = function(props){
    const data = {...props};
    if(typeof data.dilemmaCategory === "undefined") return null;
    
    return (
        <Collapse bordered={false} defaultActiveKey={['1','2','3','4','5','6']} id="jianhu" >
            <Panel header="基本信息" key="1" style={customPanelStyle}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Row gutter={8}>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>姓名：</span>{data.childName}</p>
                            </Col>
                            <Col span={12}>
                                <p className={styles.detailsSpan}><span>身份证：</span>{data.childIdCard || "暂无"}</p>
                            </Col>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>性别：</span>{data.childSex || "暂无"}</p>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>民族：</span>{data.nation || "暂无"}</p>
                            </Col>
                            <Col span={12}>
                                <p className={styles.detailsSpan}><span>家庭人口：</span>{data.familyPopulation || "暂无"}</p>
                            </Col>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>出生年月：</span>{data.childBornTime || "暂无"}</p>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={24}>
                                <p className={styles.detailsSpan}><span>户籍地：</span>{data.cityName + data.countyName }</p>
                            </Col>
                        </Row>
                        <p style={{marginTop:16}}>致困原因</p>
                        <Row>
                            <Col span={24}>
                                <p className={styles.detailsSpan}><span>儿童自身原因：</span>{data.itselfReason || "无"}</p>
                            </Col>
                            <Col span={24}>
                                <p className={styles.detailsSpan}><span>家庭原因：</span>{data.familyReason || "无"}</p>
                            </Col>
                            <Col span={24}>
                                <p className={styles.detailsSpan}><span>监护缺少：</span>{data.guaHappening || "无"}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{padding:"8px 15%"}}>
                            <img src={data.headImg } style={{maxWidth:"150px"}} />
                        </div>
                    </Col>
                </Row>
            </Panel>
            <Panel header="户主信息/监护人信息" key="2" style={customPanelStyle}>
                    <Col span={24}>
                        <Row gutter={8}>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>姓名：</span>{data.guaName || "无"}</p>
                            </Col>
                            <Col span={12}>
                                <p className={styles.detailsSpan}><span>身份证：</span>{data.guaIdCard  || "无"}</p>
                            </Col>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>联系电话：</span>{data.guaTelNum  || "无"}</p>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>性别：</span>{data.guaSex  || "无"}</p>
                            </Col>
                            <Col span={12}>
                                <p className={styles.detailsSpan}><span>出生年月:</span>{data.guaBornTime || "无"}</p>
                            </Col>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>与儿童关系：</span>{data.guaChildRela || "无"}</p>
                            </Col>
                        </Row>
                        <p style={{marginTop:16}}>监护情况</p>
                        {data.guaHappening && <CheckboxGroup options={selectOptions.jianhu} disabled value={data.guaHappening.split(",")} />}
                    </Col>
            </Panel>
            <Panel header="困境类别" key="3" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.leibie} disabled value={data.dilemmaCategory.split(",")} />
                {data.welfareHappening && 
                    <div>
                        <p style={{marginTop:16}}>残疾儿童监护情况</p>
                        <CheckboxGroup options={selectOptions.fuli} disabled value={data.welfareHappening.split(",") || null} />
                    </div>
                }
            </Panel>
            <Panel header="生活保障" key="4" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.shenghuo} disabled value={data.basicLifeHappening.split(",")} />
            </Panel>
            <Panel header="教育保障" key="5" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.jiaoyu} disabled value={data.educationHappening.split(",")} />
            </Panel>
            <Panel header="医疗保障" key="6" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.yiliao} disabled value={data.medicalHappening.split(",")} />
            </Panel>
        </Collapse>
    );
}

export default CollapseInfos;