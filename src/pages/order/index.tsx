import React, { useState, useEffect } from 'react';
import {
  Card,
  Modal,
  Button,
  Form,
  Table,
  Select,
  DatePicker,
  Col
} from 'antd';
import { TableRowSelection } from 'antd/lib/table';
import axios from './../../axios';
import utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
//定义表格数据类型
const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_sn'
  },
  {
    title: '车辆编号',
    dataIndex: 'bike_sn'
  },
  {
    title: '用户名',
    dataIndex: 'user_name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '里程',
    dataIndex: 'distance',
    render: (d: number) => d / 1000 + 'km'
  },
  {
    title: '行程时长',
    dataIndex: 'total_time'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (status: number) => (status === 0 ? '进行中' : '结束行程')
  },
  {
    title: '开始时间',
    dataIndex: 'start_time'
  },
  {
    title: '结束时间',
    dataIndex: 'end_time'
  },
  {
    title: '订单金额',
    dataIndex: 'total_fee'
  },
  {
    title: '实付金额',
    dataIndex: 'user_pay'
  }
];
//记录当前页数
const params = { page: 1 };
//初始化选择行
const initalSelect: number[] = [];
const OrderManager = () => {
  //存储订单数据
  const [orderData, setOrderData] = useState([]);
  //存储分页信息
  const [pagination, setPagination] = useState({});
  //存储选中的行id
  const [selectKey, setSelectKey] = useState(initalSelect);
  //存储选中的行
  const [selectRow, setSelectRow] = useState(() => {});
  //表格选择的类型
  const rowSelection: TableRowSelection<object> = {
    type: 'radio',
    selectedRowKeys: selectKey
  };
  useEffect(() => {
    request();
  }, []);
  //请求数据
  const request = () => {
    axios
      .ajax({
        url: '/order/list',
        data: { params }
      })
      .then((res: any) => {
        const data = res.result.item_list;

        if (res.code === 0) {
          //将请求的数据放到table中
          setOrderData(
            data.map((item: any, index: any) => {
              item.key = index;
              return item;
            })
          );

          //设置分页信息
          setPagination(
            utils.pagination(res, current => {
              params.page = current;
              request();
            })
          );
        }
      });
  };
  const handleOrderDetails = () => {
    selectKey.length === 0
      ? Modal.info({ content: '请选择要查看的订单' })
      : window.open(
          `/#/common/order/detail/${(selectRow as any).order_sn}`,
          '_blank'
        );
  };
  //选择行元素
  const onRowClick = (record: any, index: any) => {
    let selectKey = [index];
    setSelectKey(selectKey);
    setSelectRow(record);
  };
  return (
    <>
      <Card>
        <FilterForm />
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Button
          onClick={handleOrderDetails}
          style={{ marginRight: 10 }}
          type="primary"
        >
          订单详情
        </Button>
        <Button type="primary">结束订单</Button>
      </Card>
      <div className="content-wrap">
        <Table
          onRow={(record, index) => {
            return {
              onClick: () => {
                onRowClick(record, index);
              }
            };
          }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={orderData}
          bordered
          pagination={pagination}
        />
      </div>
    </>
  );
};

export default OrderManager;

type IProps = Readonly<{
  form: any;
}>;
const CreateFilterForm = (props: IProps) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="城市">
        {getFieldDecorator('city_id')(
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="订单时间">
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
      <FormItem label="订单状态">
        {getFieldDecorator('order_status')(
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="1">进行中</Option>
            <Option value="2">行程结束</Option>
            <Option value="2">行程结束</Option>
            <Option value="2">行程结束</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" style={{ margin: '0 10px' }}>
          查询
        </Button>
        <Button>重置</Button>
      </FormItem>
    </Form>
  );
};
const FilterForm = Form.create()(CreateFilterForm);
