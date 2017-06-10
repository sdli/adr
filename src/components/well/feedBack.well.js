import { Form, Input, Button,Row,Col } from 'antd';
const FormItem = Form.Item;
import React,{Component} from "react";

class FeedBack extends Component{
    constructor(props){
        super(props);
    }
    shenheController(func){
        let that = this;
        return function(){
            let remark = that.textInput.refs.input.value;
            func(remark);
        }
    }
    render(){
        const {shenheHandler} = this.props;
        return (
            <div style={{width:"100%",background:"#fff",borderTop:"1px solid #e3e3e3",padding:"32px 0"}} >
                <Row gutter={16}>
                    <Col span={4}>
                        <p style={{lineHeight:"98px",textAlign:"center",fontSize:"14px",color:"#4d4d4d"}}>评语：</p>
                    </Col>
                    <Col span={16}>
                        <Input 
                            placeholder="请输入评语" 
                            style={{height:"82px",width:"100%"}} 
                            ref={(input) => { this.textInput = input; }}
                        />
                    </Col>
                    <Col span={4}>
                        <div style={{textAlign:"center"}}>
                            <Button type="primary" style={{marginBottom:16}} onClick={this.shenheController(shenheHandler(1))}>通过申请</Button><br/>
                            <Button type="danger" onClick={this.shenheController(shenheHandler(2))}>驳回申请</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FeedBack;