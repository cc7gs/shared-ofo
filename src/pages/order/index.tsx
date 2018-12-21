import React, { useState, useEffect } from 'react';
import { Card, Modal, Button, Table } from 'antd';
import { TableRowSelection } from 'antd/lib/table';
import FilterForm from './../../components/BasicForm';
import axios from './../../axios';
import utils from '../../utils/utils';
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
const initalSelect: string[] = [];
//订单表单格式
const FormList = [
  {
    type: 'SELECT',
    label: '城市',
    field: 'city_id',
    width: 100,
    placeholder: '全部',
    list: [
      {
        id: 1,
        name: '北京市'
      },
      {
        id: 2,
        name: '天津市'
      },
      {
        id: 3,
        name: '深圳市'
      }
    ]
  },
  {
    type: 'date',
    label: '订单时间'
  },
  {
    type: 'SELECT',
    label: '订单状态',
    field: 'order_status',
    width: 100,
    placeholder: '全部',
    list: [
      {
        id: 1,
        name: '进行中'
      },
      {
        id: 2,
        name: '行程结束'
      }
    ]
  }
];
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
    type: 'checkbox',
    selectedRowKeys: selectKey,
    onChange:(selectKey,selectRowKeys)=>{
      console.log(selectRowKeys);
        setSelectKey(selectKey as any);
    }
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
    //@todo
    let oldSelectKey:any=selectKey;
      //该行还没有被点击,则点击 若已经点击过则取消check
    if(oldSelectKey.includes(index)){
      oldSelectKey.splice(oldSelectKey.indexOf(index),1);

    }else{
      oldSelectKey=[...oldSelectKey,index];    
    }
    let keys=rowSelection.type==='radio'?[index]:oldSelectKey
    setSelectKey(keys);
    setSelectRow(record);
  };
  //处理查询事件
  const handleFilterForm = (fieldsValue: any) => {
    console.log(fieldsValue);
  };
  return (
    <>
      <Card>
        <FilterForm
          formList={FormList}
          onFilterSubmit={(fieldsValue: any) => handleFilterForm(fieldsValue)}
        />
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
