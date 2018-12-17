import React, { useState, useEffect, useRef } from 'react'
import {
  Card,
  Form,
  Table,
  Button,
  Select,
  message,
  Modal,
  DatePicker
} from 'antd'
import axios from './../../axios'
import utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
//记录当前页数
const params = { page: 1 }
const initalSelect: any[] = []
const Order = () => {
  //存储当前城市管理的数据
  const [orderData, setorderData] = useState([])
  const [pagination, setPagination] = useState({})
  //记录选择的行
  const [selectKey, setSelectKey] = useState(initalSelect)
  //记录选择的行信息
  const [selectItem, setSelectItem] = useState({})
  //控制模态框是否显示
  const [orderConfirmVisble, setOrderConfirmVisble] = useState(false)
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
      render(distance: any) {
        return distance / 1000 + 'Km'
      }
    },
    {
      title: '行驶时长',
      dataIndex: 'total_time'
    },
    {
      title: '状态',
      dataIndex: 'status'
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
  ]
  const rowSelection: any = {
    type: 'radio',
    selectedRowKeys: selectKey
  }
  useEffect(() => {
    requestList()
  }, [])
  //获取数据
  const requestList = () => {
    axios
      .ajax({
        url: 'order/list',
        params: {
          page: 1
        }
      })
      .then((res: any) => {
        let list = res.result.item_list.map((item: any, index: any) => {
          item.key = index
          return item
        })
        setorderData(list)
        setPagination(
          utils.pagination(res, current => {
            params.page = current
            requestList()
          })
        )
      })
  }
  //单选按钮触发时
  const onRowClick = (record: any, index: any) => {
    setSelectKey([index])
    setSelectItem(record)
  }
  //结束订单
  const handleFinishOrder=()=>{
    
  }
  //模态框中表单的样式
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }
  return (
    <>
      <Card>
        <FilterForm />
      </Card>
      <Card style={{ margin: '10px 0 0 0' }}>
        <Button type="primary">订单详情</Button>
        <Button type="primary" style={{ marginLeft: 10 }}>
          结束订单
        </Button>
      </Card>
      <div className="content-wrap">
        <Table
          bordered
          columns={columns}
          dataSource={orderData}
          pagination={pagination}
          rowSelection={rowSelection}
          onRow={(record, index) => {
            return {
              onClick: () => {
                onRowClick(record, index)
              }
            }
          }}
        />
      </div>
      <Modal
        title="结束订单"
        visible={orderConfirmVisble}
        onCancel={() => setOrderConfirmVisble(false)}
        onOk={handleFinishOrder}
        width={600}
      >
        <Form layout="horizontal">
          <FormItem label="车辆编号" {...formItemLayout} />
          <FormItem label="剩余电量" {...formItemLayout} />
          <FormItem label="行程开始时间" {...formItemLayout} />
          <FormItem label="当前位置" {...formItemLayout} />
        </Form>
      </Modal>
    </>
  )
}
export default Order

type IProps = Readonly<{
  form: any
  wrappedComponentRef?: any
}>
const CreateForm = (props: IProps) => {
  const { getFieldDecorator } = props.form
  return (
    <Form layout="inline">
      <FormItem label="城市">
        {getFieldDecorator('city_id')(
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="订单时间">
        {getFieldDecorator('time_start')(<DatePicker />)}
      </FormItem>
      <FormItem>{getFieldDecorator('time_end')(<DatePicker />)}</FormItem>
      <FormItem label="订单状态">
        {getFieldDecorator('order_status')(
          <Select style={{ width: 100 }} placeholder="全部">
            <Option value="">全部</Option>
            <Option value="1">已授权</Option>
            <Option value="2">未授权</Option>
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
  )
}
const FilterForm = Form.create({})(CreateForm)
