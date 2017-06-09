import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React , {Component} from "react";
const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends Component {
  state = {
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('passwordnew1')) {
      callback('两次密码不一致！');
    } else {
      callback();
    }
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  componentWillReceiveProps(nextProps){
      console.log(nextProps,"检查props");
      if(typeof nextProps.changePassword !=="undefined" && nextProps.changePassword && nextProps.changePassword != this.props.changePassword ){
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.dispatch({type:"data/closeChangePassword"});
            console.log(values);
            this.props.dispatch({type:"data/changePasswordEffect",...values});
          }
        });
      }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { phone} = this.props;
    console.log(this.props);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入电话号码' }],
              initialValue: phone
            })(
              <Input addonBefore={prefixSelector} disabled />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              初始密码
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('passwordold', {
            rules: [
              { required: true, message: '请输入密码', whitespace: true },
              { max:16,message:"最大不超过16位",whitespace: true},
              { min:6,message:"最低不能少于8位"}            
            ],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              修改密码
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('passwordnew1', {
            rules: [
              { required: true, message: '请输入密码', whitespace: true },
              { max:16,message:"最大不超过16位",whitespace: true},
              { min:6,message:"最低不能少于8位"}
            ],
          })(
            <Input type={"password"} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              再次输入
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('passwordnew2', {
            rules: [
              { required: true, message: '请输入密码', whitespace: true },
              { max:16,message:"最大不超过16位",whitespace: true},
              { min:6,message:"最低不能少于8位"},
              {validator:this.checkPassword}
            ],
          })(
            <Input type={"password"}/>
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;