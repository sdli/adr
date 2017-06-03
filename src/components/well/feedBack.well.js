import { Form, Input, Button,Row,Col } from 'antd';
const FormItem = Form.Item;


const FeedBack = function(){
    return (
        <div style={{height:98,width:"100%",background:"#fff",borderTop:"2px solid #e3e3e3",padding:"8px 0"}} >
            <Row gutter={16}>
                <Col span={4}>
                    <p style={{lineHeight:"98px",textAlign:"center",fontSize:"14px",color:"#4d4d4d"}}>评语：</p>
                </Col>
                <Col span={16}>
                    <Input placeholder="请输入评语" style={{height:"82px",width:"100%"}} />
                </Col>
                <Col span={4}>
                    <div style={{textAlign:"center"}}>
                        <Button type="primary" style={{marginBottom:16}}>通过申请</Button><br/>
                        <Button type="danger" >驳回申请</Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default FeedBack;