import React from 'react';
import { Card, Spin, Icon, Alert } from 'antd';
import './index.less';
const Loading = () => {
  const icon = <Icon type="loading" style={{ fontSize: 24 }} />;
  return (
    <div className="loading">
      <Card title="Spin用法">
        <Spin size="small" />
        <Spin style={{ margin: '0 10px' }} />
        <Spin size="large" />
        <Spin indicator={icon} style={{ margin: '0 10px' }} />
      </Card>
      <Card title="内容遮罩">
        <Alert message="title" description="confirm you message" type="info" />
        <Spin>
          <Alert
            message="title"
            description="confirm you message"
            type="error"
            style={{ margin: '10px 0' }}
          />
        </Spin>
        <Spin indicator={icon} tip="Loading...">
          <Alert
            message="title"
            description="confirm you message"
            type="warning"
          />
        </Spin>
      </Card>
    </div>
  );
};
export default Loading;
