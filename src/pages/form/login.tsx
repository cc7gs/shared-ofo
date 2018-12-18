import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Checkbox } from 'antd';

const FormItem = Form.Item;
type Iprops = Readonly<{
  form: any;
}>;

const Login = (props: Iprops) => {
  const {
    getFieldDecorator,
    getFieldsError,
    validateFields,
    isFieldTouched
  } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: 24,
      md: 6
    },
    wrapperCol: {
      xs: 24,
      md: 18
    }
  };
  //判读是否有错误信息 isFieldsTouched 用于判读用户是否触发过表单空间
  //当没有触发过表单控价时,将btn设置为disabled
  const hasErrors = (fieldsError: any) => {
    let flag = isFieldTouched('userName') && isFieldTouched('userPwd');
    return Object.keys(fieldsError).some(item => fieldsError[item]) || !flag;
  };
  //处理登录逻辑
  const handleLogin = (e: any) => {
    validateFields((error: any, values: any) => {
      if (!error) {
        message.success(`欢迎 ${values.userName} 登录 XXX`);
      }
    });
  };
  return (
    <div>
      <Card title="水平登录栏">
        <Form layout="inline">
          <FormItem>
            <Input placeholder="请输入用户名" />
          </FormItem>
          <FormItem>
            <Input type="password" placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </Card>
      <Card title="有验证的登录栏" style={{ margin: '10px 0' }}>
        <Form style={{ width: 300 }}>
          <FormItem label="用户名" {...formItemLayout}>
            {getFieldDecorator('userName', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '用户名不能为空'
                }
              ]
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem label="密码" {...formItemLayout}>
            {getFieldDecorator('userPwd', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空'
                },
                {
                  min: 5,
                  max: 10,
                  message: '密码长度应该在5-10位之间'
                }
              ]
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>记住密码</Checkbox>)}
            <a href="javascript:void(0)" style={{ float: 'right' }}>
              忘记了
            </a>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              onClick={handleLogin}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </Card>
  
    </div>
  );
};
export default Form.create()(Login);
