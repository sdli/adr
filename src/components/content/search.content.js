import React from 'react';
import {Spin, Radio, Row, Col,Button } from 'antd';
import CountryTable from "../tables/country.table";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SearchContent extends React.Component{
    componentDidMount(){
        this.props.dispatch({type:"data/getSearchBar"});
        this.props.dispatch({type:"data/getVillageReportByUserId"});
    }
    state={
        selected: 9999,
        height: "40px",
        text:"展开",
        orgId: 0,
        freeze: true
    }
    handleAreaChange=(obj)=>{
        if(parseInt(obj.target.value) != 9999){
            this.setState({
                selected: obj.target.value,
                orgId: this.props.data.searchBarOptions.childOrganList[obj.target.value].orgId || this.props.data.searchBarOptions.orgId,
                freeze: !this.state.freeze
            });
        }else{
            this.setState({
                selected: 9999,
                orgId: this.props.login.loginData.orgId
            });
        }
    }
    handleTownChange=(obj)=>{
        this.setState({
            orgId: obj.target.value
        });
    }
    handleOpen=()=>{
        this.setState({
            height:this.state.height=="auto"?"40px":"auto",
            text: this.state.text=="展开"?"收起":"展开"
        });
    }
    handleSearch=()=>{
        this.props.dispatch({type:"data/getVillageReport",orgId:this.state.orgId});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.data.searchBarOptions.hasOwnProperty("orgId")){
            this.setState({
                orgId:nextProps.data.searchBarOptions.orgId
            });
        }
    }
    render(){
        const {dispatch,data,loading,params,login} = this.props;
        const villageReport = data.villageReport || null;
        return (
            <div>
                <Row gutter={8}>
                    <Col span={22} >
                        {
                            login.loginData.orgLevel ==1 
                            && 
                            data.searchBarOptions.hasOwnProperty("orgId")
                            &&
                            <Row gutter={16} style={{padding:"4px 0",borderBottom:"1px solid #f0f0f0"}}>
                                <Col span={2}>
                                    <p style={{backgroundColor:"#f0f0f0",textAlign:"center",lineHeight:"32px"}}>市</p>
                                </Col>
                                <Col span={22} style={{lineHeight:"32px"}}>
                                    <RadioGroup defaultValue={data.searchBarOptions.orgId} size="small">
                                        <Radio value={data.searchBarOptions.orgId}>{data.searchBarOptions.orgName}</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        }
                        {
                            login.loginData.orgLevel ==1
                            &&
                            data.searchBarOptions.hasOwnProperty("orgId")
                            &&
                            <Row gutter={16} style={{padding:"4px 0",borderBottom:"1px solid #f0f0f0"}}>
                                <Col span={2}>
                                    <p style={{backgroundColor:"#f0f0f0",textAlign:"center",lineHeight:"32px"}}>县/区域</p>
                                </Col>
                                <Col span={22} style={{lineHeight:"32px"}}>
                                    <RadioGroup defaultValue="9999" size="small" onChange={this.handleAreaChange}>
                                        <Radio value="9999">全部</Radio>
                                        {data.searchBarOptions.childOrganList.map((val,index)=>{
                                            return (
                                                <Radio value={index} key={index}>{val.orgName}</Radio>
                                            );
                                        })}
                                    </RadioGroup>
                                </Col>
                            </Row>
                        }
                        {
                            login.loginData.orgLevel ==1
                            &&
                            data.searchBarOptions.hasOwnProperty("orgId")
                            &&
                            <Row gutter={16} style={{padding:"4px 0",borderBottom:"1px solid #f0f0f0",height:this.state.height,overflow:"hidden",textOverflow:"ellipsis"}}>
                                <Col span={2}>
                                    <p style={{backgroundColor:"#f0f0f0",textAlign:"center",lineHeight:"32px"}}>乡镇/街道</p>
                                </Col>
                                <Col span={20}  style={{lineHeight:"32px"}}>
                                
                                        {this.state.selected == 9999
                                        &&
                                        (
                                            <RadioGroup size="small" onChange={this.handleTownChange} defaultValue={data.searchBarOptions.orgId}>
                                                <Radio  value={data.searchBarOptions.orgId}>全部</Radio>
                                                { data.searchBarOptions.childOrganList.map((val,index)=>{
                                                    return val.childOrganList.map((value,ind)=>{
                                                        return <Radio value={value.orgId} key={ind}>{value.orgName}</Radio>
                                                    });
                                                })}
                                            </RadioGroup>
                                        )
                                        }
                                        {this.state.selected != 9999
                                        &&
                                        this.state.freeze
                                        &&
                                        (
                                            <RadioGroup size="small" onChange={this.handleTownChange} defaultValue={data.searchBarOptions.childOrganList[this.state.selected].orgId}>
                                                <Radio value={data.searchBarOptions.childOrganList[this.state.selected].orgId} >全部</Radio>
                                                {
                                                    data.searchBarOptions.childOrganList[this.state.selected].childOrganList.map((val,index)=>{
                                                        return <Radio value={val.orgId} key={index}>{val.orgName}</Radio>;
                                                    })
                                                }
                                            </RadioGroup>
                                        )}
                                        {this.state.selected != 9999
                                        &&
                                        !this.state.freeze
                                        &&
                                        (
                                            <RadioGroup size="small" onChange={this.handleTownChange} defaultValue={data.searchBarOptions.childOrganList[this.state.selected].orgId}>
                                                <Radio value={data.searchBarOptions.childOrganList[this.state.selected].orgId} >全部</Radio>
                                                {
                                                    data.searchBarOptions.childOrganList[this.state.selected].childOrganList.map((val,index)=>{
                                                        return <Radio value={val.orgId} key={index}>{val.orgName}</Radio>;
                                                    })
                                                }
                                            </RadioGroup>
                                        )}
                                </Col>
                                <Col span={2} style={{padding:"4px 8px",textAlign:"right"}}>
                                    <Button type="default" icon="down-square-o" size="small" onClick={this.handleOpen}>{this.state.text}</Button>
                                </Col>
                            </Row>
                        }
                        {
                            login.loginData.orgLevel ==2
                            &&
                            data.searchBarOptions.hasOwnProperty("orgId")
                            &&
                            <Row gutter={16} style={{padding:"4px 0",borderBottom:"1px solid #f0f0f0"}}>
                                <Col span={2}>
                                    <p style={{backgroundColor:"#f0f0f0",textAlign:"center",lineHeight:"32px"}}>县/区域</p>
                                </Col>
                                <Col span={22} style={{lineHeight:"32px"}}>
                                    <RadioGroup defaultValue="9999" size="small" onChange={this.handleAreaChange}>
                                        <Radio value="9999">全部</Radio>
                                        <Radio value="0">{data.searchBarOptions.orgName}</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        }
                        {
                            login.loginData.orgLevel ==2
                            &&
                            data.searchBarOptions.hasOwnProperty("orgId")
                            &&
                            <Row gutter={16} style={{padding:"4px 0",borderBottom:"1px solid #f0f0f0",height:this.state.height,overflow:"hidden",textOverflow:"ellipsis"}}>
                                <Col span={2}>
                                    <p style={{backgroundColor:"#f0f0f0",textAlign:"center",lineHeight:"32px"}}>乡镇/街道</p>
                                </Col>
                                <Col span={20}  style={{lineHeight:"32px"}}>
                                    {
                                        !this.state.freeze
                                        &&
                                        <RadioGroup size="small" onChange={this.handleTownChange} defaultValue={data.searchBarOptions.orgId}>
                                            <Radio  value={data.searchBarOptions.orgId}>全部</Radio>
                                            { data.searchBarOptions.childOrganList.map((val,index)=>{
                                                return <Radio value={val.orgId} key={index}>{val.orgName}</Radio>
                                            })}
                                        </RadioGroup>
                                    }
                                    {
                                        this.state.freeze
                                        &&
                                        <RadioGroup size="small" onChange={this.handleTownChange} defaultValue={data.searchBarOptions.orgId}>
                                            <Radio  value={data.searchBarOptions.orgId}>全部</Radio>
                                            { data.searchBarOptions.childOrganList.map((val,index)=>{
                                                return <Radio value={val.orgId} key={index}>{val.orgName}</Radio>
                                            })}
                                        </RadioGroup>
                                    }
                                </Col>
                                <Col span={2} style={{padding:"4px 8px",textAlign:"right"}}>
                                    <Button type="default" icon="down-square-o" size="small" onClick={this.handleOpen}>{this.state.text}</Button>
                                </Col>
                            </Row>
                        }
                    </Col>
                    <Col span={2} style={{padding:"4px 0",textAlign:"center"}}>
                        <Button type="primary" icon="reload" onClick={this.handleSearch}>查询</Button>
                    </Col>
                </Row>
                <Spin spinning={loading.models.data}>
                <div style={{padding:"16px 0"}} key="1">
                    <CountryTable data={villageReport} level={login.loginData.orgLevel}/>
                </div>
                </Spin>
            </div>
        );
    }
}

export default SearchContent;