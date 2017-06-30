import {Collapse,Col,Row,Checkbox,Alert} from "antd";
import React from "react";
import styles from "./well.less";
import selectOptions from "../../utils/options";

const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: '#f8f8f8',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
};

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
                            <Col span={10}>
                                <p className={styles.detailsSpan}><span>身份证：</span>{data.childIdCard || "暂无"}</p>
                            </Col>
                            <Col span={8}>
                                <p className={styles.detailsSpan}><span>性别：</span>{data.childSex || "暂无"}</p>
                            </Col>
                        </Row>
                        <Row gutter={8}>
                            <Col span={6}>
                                <p className={styles.detailsSpan}><span>民族：</span>{data.nation || "暂无"}</p>
                            </Col>
                            <Col span={10}>
                                <p className={styles.detailsSpan}><span>家庭人口：</span>{data.familyPopulation || "暂无"}</p>
                            </Col>
                            <Col span={8}>
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
                                <p className={styles.detailsSpan}><span>监护缺少：</span>{data.guaHappeningDesc || "无"}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{padding:"8px 15%"}}>
                            <img src={data.headImgPath+data.headImg} style={{maxWidth:"150px"}} />
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
                        {parseInt(data.guaHappening.split(",")[0]) == 0 &&
                            <div className={styles.alertSet}>
                                <Alert
                                    message={"未保障或其他情况说明:"+data.otherDilCatDesc}
                                    type="warning"
                                />       
                            </div>
                        }
                    </Col>
            </Panel>
            <Panel header="困境类别" key="3" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.leibie} disabled value={data.dilemmaCategory.split(",")} />
                {data.welfareHappening && 
                    <div>
                        <p style={{marginTop:16}}>残疾儿童监护情况</p>
                        <CheckboxGroup options={selectOptions.fuli} disabled value={data.welfareHappening.split(",") || null} />
                        {parseInt(data.welfareHappening.split(",")[0]) == 0 &&
                            <div className={styles.alertSet}>
                              <Alert
                                    message={"未保障或其他情况说明："+data.otherWelfare}
                                    type="warning"
                                />
                            </div>
                        }
                    </div>
                }
            </Panel>
            <Panel header="生活保障" key="4" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.shenghuo} disabled value={data.basicLifeHappening.split(",")} />
                {parseInt(data.basicLifeHappening.split(",")[0]) == 0 &&
                    <div className={styles.alertSet}>
                        <Alert
                            message={"未保障或其他情况说明："+data.otherBasicLife}
                            type="warning"
                        />
                    </div>
                }
            </Panel>
            <Panel header="教育保障" key="5" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.jiaoyu} disabled value={data.educationHappening.split(",")} />
                {parseInt(data.educationHappening.split(",")[0]) == 0 &&
                    <div className={styles.alertSet}>
                        <Alert
                            message={"未保障或其他情况说明："+data.otherEducation}
                            type="warning"
                        />     
                    </div>
                }
            </Panel>
            <Panel header="医疗保障" key="6" style={customPanelStyle}>
                <CheckboxGroup options={selectOptions.yiliao} disabled value={data.medicalHappening.split(",")} />
                {parseInt(data.medicalHappening.split(",")[0]) == 0 &&
                    <div className={styles.alertSet}>
                        <Alert
                            message={"未保障或其他情况说明："+data.otherMedical}
                            type="warning"
                        />
                    </div>
                }
            </Panel>
        </Collapse>
    );
}

export default CollapseInfos;