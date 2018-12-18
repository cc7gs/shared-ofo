import React from 'react';
import {
  Card,
  Form,
  Select,
  Button,
  Input,
  Radio,
  InputNumber,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  Checkbox
} from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
type IProps = Readonly<{
  form: any;
}>;
const Register = (props: IProps) => {
  const {
    getFieldDecorator,
    getFieldsValue,
    isFieldsTouched,
    getFieldsError
  } = props.form;
  //formItem 的样式
  const formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 4
    },
    wrapperCol: {
      xs: 24,
      sm: 12
    }
  };
  //注册 和阅读条款的样式
  const offsetLayout = {
    wrapperCol: {
      xs: 24,
      sm: {
        span: 12,
        offset: 4
      }
    }
  };
  //判读是否有错误信息 isFieldsTouched 用于判读用户是否触发过表单空间
  //当没有触发过表单控价时,将btn设置为disabled
  const hasErrors = (fieldsError: any) => {
    return (
      Object.keys(fieldsError).some(item => fieldsError[item]) ||
      !isFieldsTouched()
    );
  };
  //点击注册后,获取注册信息
  const handleSubmit = () => {
    const regInfo = getFieldsValue();
    console.log(JSON.stringify(regInfo));
  };
  return (
    <div>
      <Card title="注册表单">
        <Form>
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
          <FormItem label="性别" {...formItemLayout}>
            {getFieldDecorator('sex', {
              initialValue: 'man',
              rules: []
            })(
              <RadioGroup>
                <Radio value="man">男</Radio>
                <Radio value="woman">女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="年龄" {...formItemLayout}>
            {getFieldDecorator('age', {
              initialValue: '12',
              rules: []
            })(<InputNumber />)}
          </FormItem>
          <FormItem label="当前状态" {...formItemLayout}>
            {getFieldDecorator('state', {
              initialValue: '1',
              rules: []
            })(
              <Select>
                <Option value="1">北大才子</Option>
                <Option value="2">上海FE</Option>
                <Option value="3">风华正茂</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="爱好" {...formItemLayout}>
            {getFieldDecorator('hoppy', {
              initialValue: ['run'],
              rules: []
            })(
              <Select mode="multiple">
                <Option value="run">跑步</Option>
                <Option value="basketball">打篮球</Option>
                <Option value="song">唱歌</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="是否已婚" {...formItemLayout}>
            {getFieldDecorator('isMarried', {
              initialValue: true,
              valuePropName: 'checked'
            })(<Switch />)}
          </FormItem>
          <FormItem label="生日" {...formItemLayout}>
            {getFieldDecorator('birthday', {
              initialValue: moment('2018-12-4', 'YYYY-MM-DD')
            })(<DatePicker />)}
          </FormItem>
          <FormItem label="联系地址" {...formItemLayout}>
            {getFieldDecorator('address', {
              initialValue: '上海宜山路200号'
            })(
              <TextArea
                autosize={{
                  minRows: 2,
                  maxRows: 6
                }}
              />
            )}
          </FormItem>
          <FormItem label="早起时间" {...formItemLayout}>
            {getFieldDecorator('time', {
              initialValue: moment('12:09:23', 'HH:mm:ss')
            })(<TimePicker />)}
          </FormItem>
          <FormItem label="头像" {...formItemLayout}>
            {getFieldDecorator('userImg')(
              <Upload listType="picture-card">
                <Icon type="upload" />
              </Upload>
            )}
          </FormItem>
          <FormItem {...offsetLayout}>
            {getFieldDecorator('checkbox', {
              initialValue: true,
              valuePropName: 'checked'
            })(
              <Checkbox>
                <a href="javascript:void(0)">我已经阅读</a>
              </Checkbox>
            )}
          </FormItem>
          <FormItem {...offsetLayout}>
            <Button
              type="primary"
              disabled={hasErrors(getFieldsError())}
              onClick={handleSubmit}
            >
              注册
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};
export default Form.create()(Register);
