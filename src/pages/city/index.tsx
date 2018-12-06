import React, { useState, useEffect,useRef } from 'react'
import { Card, Form, Table, Button, Select, message, Modal } from 'antd'
import axios from './../../axios'
import utils from '../../utils/utils'
const FormItem = Form.Item
const Option = Select.Option
//记录当前页数
const params={page:1};
const City = () => {
  
  //存储当前城市管理的数据
  const [cityData, setCityData] = useState([])
  const [pagination, setPagination] = useState({});
  //控制模态框是否显示
  const [isShowOpenCity, setIsShowOpenCity] = useState(false);
  // const cityForm = useRef(null) as any;
  let formRef:any=null;
  //表格列的数据定义
  const columns = [
    {
      title: '城市ID',
      dataIndex: 'id'
    },
    {
      title: '城市名称',
      dataIndex: 'name'
    },
    {
      title: '用车模式',
      dataIndex: 'modal',
      render: (modal: number) => (modal === 1 ? '停车点' : '禁停区')
    },
    {
      title: '营运模式',
      dataIndex: 'op_mode',
      render: (op_mode: number) => (op_mode === 1 ? '自营' : '加盟')
    },
    {
      title: '授权加盟商',
      dataIndex: 'franchisee_name'
    },
    {
      title: '城市管理员',
      dataIndex: 'city_admins',
      render(arr: any) {
        return arr.map((item: any) => item.user_name).join(',')
      }
    },
    {
      title: '城市开通时间',
      dataIndex: 'open_time'
    },
    {
      title: '操作时间',
      dataIndex: 'update_time',
      render: utils.formateDate
    },
    {
      title: '操作人',
      dataIndex: 'sys_user_name'
    }
  ]
  useEffect(() => {
    request()
  }, [])
  //获取数据
  const request = () => {
    axios
      .ajax({
        url: '/open_city',
        data: {
          params
        }
      })
      .then((res: any) => {
        let data = res.result.item_list
        //获取city数据
        setCityData(
          data.map((item: any, index: any) => {
            item.key = index
            return item
          })
        );
        //设置分页数据
        setPagination(utils.pagination(res,(current)=>{
            params.page=current;
            request();
        }));
      })
  }
  //城市开通提交事件
  const handleSubmit = () => {
    // const { getFieldsValue } = cityForm.current;
    let cityInfo = formRef;
    // let cityInfo=getFieldsValue();
    console.log(cityInfo);
  }
  return (
    <>
      <Card>
        <FilterForm />
      </Card>
      <Card style={{ margin: '10px 0 0 0' }}>
        <Button type='primary' onClick={() => setIsShowOpenCity(true)}>
          开通城市
        </Button>
      </Card>
      <div className='content-wrap'>
        <Table
          bordered
          columns={columns}
          dataSource={cityData}
          pagination={pagination}
          
        />
      </div>
      <Modal
        title='开通城市'
        visible={isShowOpenCity}
        onCancel={() => setIsShowOpenCity(false)}
        onOk={handleSubmit}>
        <OpenCityForm wrappedComponentRef={(inst:any) => formRef = inst}/>
      </Modal>
    </>
  )
}
export default City

type IProps = Readonly<{
  form: any;
  wrappedComponentRef?:any;
}>
const CreateForm = (props: IProps) => {
  const { getFieldDecorator } = props.form
  return (
    <Form layout='inline'>
      <FormItem label='城市'>
        {getFieldDecorator('city_id')(
          <Select style={{ width: 100 }} placeholder='全部'>
            <Option value=''>全部</Option>
            <Option value='1'>北京市</Option>
            <Option value='2'>天津市</Option>
            <Option value='3'>深圳市</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label='用车模式'>
        {getFieldDecorator('mode')(
          <Select style={{ width: 140 }} placeholder='全部'>
            <Option value=''>全部</Option>
            <Option value='1'>指定停车点模式</Option>
            <Option value='2'>禁停区模式</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label='营运模式'>
        {getFieldDecorator('op_mode')(
          <Select style={{ width: 80 }} placeholder='全部'>
            <Option value=''>全部</Option>
            <Option value='1'>自营</Option>
            <Option value='2'>加盟</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label='加盟商授权状态'>
        {getFieldDecorator('auth_status')(
          <Select style={{ width: 100 }} placeholder='全部'>
            <Option value=''>全部</Option>
            <Option value='1'>已授权</Option>
            <Option value='2'>未授权</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        <Button type='primary' style={{ margin: '0 10px' }}>
          查询
        </Button>
        <Button>重置</Button>
      </FormItem>
    </Form>
  )
}
const FilterForm = Form.create({})(CreateForm)

const CreateCityForm = (props: IProps) => {
  const formItemLayout = {
    labelCol: {
      span: 5
    },
    wrapperCol: {
      span: 19
    }
  }
  const { getFieldDecorator } = props.form
  return (
    <Form>
      <FormItem label='选择城市' {...formItemLayout}>
        {getFieldDecorator('city_id', {
          initialValue: '1'
        })(
          <Select style={{ width: 150 }}>
            <Option value=''>全部</Option>
            <Option value='1'>北京市</Option>
            <Option value='2'>天津市</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label='营运模式' {...formItemLayout}>
        {getFieldDecorator('op_mode', {
          initialValue: '1'
        })(
          <Select style={{ width: 150 }}>
            <Option value='1'>自营</Option>
            <Option value='2'>加盟</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label='用车模式' {...formItemLayout}>
        {getFieldDecorator('use_mode', {
          initialValue: '1'
        })(
          <Select style={{ width: 150 }}>
            <Option value='1'>指定停车点</Option>
            <Option value='2'>禁停区</Option>
          </Select>
        )}
      </FormItem>
    </Form>
  )
}
const OpenCityForm = Form.create<IProps>()(CreateCityForm)
