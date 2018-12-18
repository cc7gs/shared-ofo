import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import './detail.less';
const initorderInfo:any=[];
const OrderDetail = (props: any) => {
  const [orderInfo, setOrderInfo] = useState(initorderInfo);
  useEffect(() => {
    let orderId = props.match.params.orderId;
    if (orderId) {
      getDetailInfo(orderId);
    }
  }, []);
  const getDetailInfo = (orderId: number) => {
    axios
      .ajax({
        url: 'order/detail',
        data: {
          params: {
            orderId
          }
        }
      })
      .then((res: any) => {
        if (res.code === 0) {
          console.log(res);
          setOrderInfo(res.result);
        }
      });
  };
  return (
    <Card>
      <div id="orderDetailMap" className="order-map">
        <div className="detail-items">
          <div className="item-title">基础信息</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">用车模式</div>
              <div className="detail-form-content">
                {orderInfo.mode == 1 ? '服务区' : '停车点'}
              </div>
            </li>
            <li>
              <div className="detail-form-left">订单编号</div>
              <div className="detail-form-content">
                {orderInfo.order_sn}
              </div>
            </li>
            <li>
              <div className="detail-form-left">车辆编号</div>
              <div className="detail-form-content">
                {orderInfo.order_sn}
              </div>
            </li>
            <li>
              <div className="detail-form-left">用户姓名</div>
              <div className="detail-form-content">
                {orderInfo.order_sn}
              </div>
            </li>
            <li>
              <div className="detail-form-left">手机号码</div>
              <div className="detail-form-content">
                {orderInfo.order_sn}
              </div>
            </li>
          </ul>
        </div>
        <div className="detail-items">
          <div className="item-title">行驶轨迹</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">行程起点</div>
              <div className="detail-form-content">{orderInfo.start_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行程终点</div>
              <div className="detail-form-content">{orderInfo.end_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶里程</div>
              <div className="detail-form-content">
                {orderInfo.distance / 1000}公里
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
export default OrderDetail;
