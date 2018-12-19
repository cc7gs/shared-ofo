import React from 'react';
import { Form, Select, Button, Col, DatePicker } from 'antd';
import utils from '../../utils/utils';
const FormItem = Form.Item;
type IProps = Readonly<{
  form: any;
  formList: any;
  onFilterSubmit: (field: any) => void;
}>;
// 封装公共form表单
const BaseForm = (props: IProps) => {
  const { getFieldDecorator, getFieldsValue } = props.form;
  const initFormList = () => {
    const { formList } = props;
    const formItemList: any = [];
    if (formList && formList.length > 0) {
      formList.forEach((item: any) => {
        const { label, field, initialValue, width, placeholder, list } = item;
        if (item.type === 'SELECT') {
          let SELECT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue: initialValue || undefined
              })(
                <Select style={{ width: width }} key={field} placeholder={placeholder}>
                  {/* {utils.getOptionList(list)} */}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type === 'date') {
          let DATE = (
            <FormItem label={label} key="date">
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('start_time')(
                    <DatePicker showTime format="YYYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  ~
                </span>
              </Col>
              <Col span={11}>
                <FormItem>
                  {getFieldDecorator('start_time')(
                    <DatePicker showTime format="YYYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
              </Col>
            </FormItem>
          );
          formItemList.push(DATE);
        }
      });
    }
    return formItemList;
  };
  return (
    <Form layout="inline">
      {initFormList()}
      <FormItem>
        <Button
          type="primary"
          style={{ margin: '0 10px' }}
          onClick={() => {props.onFilterSubmit(getFieldsValue())}}
        >
          查询
        </Button>
        <Button onClick={() => {}}>重置</Button>
      </FormItem>
    </Form>
  );
};
export default Form.create()(BaseForm);
