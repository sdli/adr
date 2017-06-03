import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React , {Component} from "react";
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: 'guangdong',
  label: "广东省",
  children: [{
    value: 'shenzhen',
    label: '深圳市',
    children: [{
      value: 'nanshan',
      label: '南山区',
    }],
  }],
}, {
  value: 'shandong',
  label: '山东省',
  children: [{
    value: 'dezhou',
    label: '德州市',
    children: [{
      value: 'pingyuan',
      label: '平原县',
    }],
  }],
}];

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
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value ) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
            })(
              <Input addonBefore={prefixSelector} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              初始密码：
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              修改密码：
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;