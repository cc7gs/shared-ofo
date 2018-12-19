import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import axios from '../../axios';
import './detail.less';
const initorderInfo: any = [];
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
          setOrderInfo(res.result);
          renderMap(res.result);
        }
      });
  };
  let map: any = {};
  const renderMap = (result: any) => {
    map = new (window as any).BMap.Map('orderDetailMap');
    map.centerAndZoom('上海', 11);
    // 开启鼠标滚轮缩放
    // map.enableScrollWheelZoom(true);
    addMapControl(result);
  };
  //添加地图控件
  const addMapControl = (result:any) => {
    const positionList =result.position_list;
    map.addControl(
      new (window as any).BMap.ScaleControl({
        anchor: (window as any).BMAP_ANCHOR_TOP_RIGHT
      })
    );
    map.addControl(
      new (window as any).BMap.NavigationControl({
        anchor: (window as any).BMAP_ANCHOR_TOP_LEFT
      })
    );
    drawBikeRoute(positionList);
  };
  const drawBikeRoute = (positionList: any) => {
    let startPoint = '';
    let endPoint = '';
    if (positionList.length > 0) {
      let arr = positionList[0];
      console.log(arr);
      startPoint = new (window as any).BMap.Point(arr.lon,arr.lat);
      let startIcon = new (window as any).BMap.Icon(
        'http://lbsyun.baidu.com/jsdemo/img/fox.gif',
        new (window as any).BMap.Size(300,160)
      );
      let startMarker = new (window as any).BMap.Marker(startPoint, {
        icon: startIcon
      });
      map.addOverlay(startMarker);
      let trackPoint:any=[];
      positionList.forEach((item:any)=>{
        trackPoint.push(new (window as any).BMap.Point(item.lon,item.lat));
      })
      let polyline=new (window as any).BMap.Polyline(trackPoint,{
        strokeColor:'blue',
        strokeWeight:2
      });
      map.addOverlay(polyline);
    }
  };
  return (
    <Card>
      <div id="orderDetailMap" className="order-map">
        {' '}
      </div>
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
            <div className="detail-form-content">{orderInfo.order_sn}</div>
          </li>
          <li>
            <div className="detail-form-left">车辆编号</div>
            <div className="detail-form-content">{orderInfo.bike_sn}</div>
          </li>
          <li>
            <div className="detail-form-left">用户姓名</div>
            <div className="detail-form-content">{orderInfo.user_name}</div>
          </li>
          <li>
            <div className="detail-form-left">手机号码</div>
            <div className="detail-form-content">{orderInfo.mobile}</div>
          </li>
        </ul>
      </div>
      <div className="detail-items">
        <div className="item-title">行驶轨迹</div>
        <ul className="detail-form">
          <li>
            <div className="detail-form-left">行程起点</div>
            <div className="detail-form-content">
              {orderInfo.start_location}
            </div>
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
    </Card>
  );
};
export default OrderDetail;
