import React, { Component } from 'react';

import {
  Form as AntDForm,
  Input,
  Card,
  DatePicker,
  Select,
  Button
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  }
};

const options = {
  INBOUND: 0,
  OUTBOUND: 1
};

const { Item } = AntDForm;
const { Option } = Select;

const initialValues = {
  callerNumber: null,
  calleeNumber: null,
  start: null,
  end: null,
  type: 'INBOUND'
};

class Form extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(
          { ...values, value: options[values.type] },
          this.props.form.resetFields
        );
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <AntDForm {...formItemLayout} onSubmit={this.handleSubmit}>
        <Item label='Caller'>
          {getFieldDecorator('callerNumber', {
            initialValue: initialValues.callerNumber,
            rules: [
              {
                required: true,
                message: 'Please input the caller number!'
              }
            ]
          })(<Input />)}
        </Item>

        <Item label='Callee'>
          {getFieldDecorator('calleeNumber', {
            initialValue: initialValues.calleeNumber,
            rules: [
              {
                required: true,
                message: 'Please input the callee number!'
              }
            ]
          })(<Input />)}
        </Item>

        <Item label='Start'>
          {getFieldDecorator('start', {
            initialValue: initialValues.caller,
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please input the start!'
              }
            ]
          })(<DatePicker showTime format='DD/MM/YYYY HH:mm:ss' />)}
        </Item>

        <Item label='End'>
          {getFieldDecorator('end', {
            initialValue: initialValues.caller,
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please input the end!'
              }
            ]
          })(<DatePicker showTime format='DD/MM/YYYY HH:mm:ss' />)}
        </Item>

        <Item label='Type'>
          {getFieldDecorator('type', {
            initialValue: initialValues.type,
            rules: [
              {
                required: true,
                message: 'Please input the callee!'
              }
            ]
          })(
            <Select>
              <Option value='INBOUND'>Inbound</Option>
              <Option value='OUTBOUND'>Outbound</Option>
            </Select>
          )}
        </Item>

        <Item wrapperCol={{ span: 12, offset: 1 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button
            type='default'
            onClick={this.handleReset}
            style={{ marginLeft: 8 }}
          >
            Clear
          </Button>
        </Item>
      </AntDForm>
    );
  }

  render() {
    return (
      <div
        style={{
          paddingRight: '30px',
          paddingBottom: '30px',
          paddingLeft: '30px'
        }}
      >
        <Card title='Form'>{this.renderForm()}</Card>
      </div>
    );
  }
}

export default AntDForm.create({ name: 'registerCalls' })(Form);
