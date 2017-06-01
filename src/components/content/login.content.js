import { Form, Icon, Input, Button, Checkbox,Row, Col,Collapse,Alert } from 'antd';
import React from "react";
import styles from "./content.less";
import configs from "../../utils/configs";

const Panel = Collapse.Panel;

const Instruction = function(){
  return (
      <div className={styles.loginCollapse}>
          <div className={styles.loginDeviceAlert}>
                <DeviceAlert />
          </div>
        <Collapse bordered={true} defaultActiveKey={['1']} >
            <Panel header="使用说明：" key="1">
            <p>1. 使用前请确保已经拥有账户密码；</p>
            <p>2. 遗忘密码请联系管理员；</p>
            <p>3. 为保障体验，请使用chrome、safari、firefox或IE 9+ 以上版本。</p>
            </Panel>
        </Collapse>
      </div>
  )
};

const DeviceAlert = function(){
    return(
        <Alert
            message="请在电脑端操作"
            description="为保证您的体验，请至电脑端进行体验此网站！感谢您的使用。"
            type="info"
            showIcon
        />
    );
}
const FormItem = Form.Item;
class NormalLoginForm extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          code: Math.random()*10000,
          height: 640
      };
  }

  submit = (handleSubmit) =>{
    return (e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
                handleSubmit(values);         
            }
        });
    }
  }

  changeImg = ()=>{
    this.setState({
        code: Math.random()*10000
    });
  }

  componentDidMount(){
        const height = window.screen.height?window.screen.height:640;
        this.setState({
            height: height-300
        });
  }

  formItemLayout = {
        labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        },
        wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        },
    };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {handleSubmit} = this.props;
    return (
        <div className={styles.loginContent} style={{minHeight: this.state.height+"px"}}>
            <h2 className="center">登录{configs.logoTitle}</h2>
            <div className={styles.loginFormDiv}>
                <Form onSubmit={this.submit(handleSubmit)}>
                    <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    <FormItem
                        extra="点击图片可刷新验证码"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '请输入右侧验证码!' }],
                            })(
                                <Input prefix={<Icon type="message" fontSize={13} />} type="text" placeholder="验证码" />
                            )}
                            </Col>
                            <Col span={12}>
                                <img src={"/api/img?code="+ this.state.code} className={styles.validateCode} onClick={this.changeImg} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className={styles.loginFormForgot} href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className={styles.loginFormButton} >
                       提交
                    </Button>
                    或 <a href="">提交信息注册</a>
                    </FormItem>
                </Form>
            </div>
            <Instruction />
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;