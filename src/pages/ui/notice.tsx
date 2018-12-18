import React from 'react';
import { Button, Card, notification } from 'antd';
import './index.less';

type INotice = 'success' | 'info' | 'warning' | 'error';

const Notice = () => {
  const handleNotification = (type: INotice, direction?: any) => {
    if (direction) {
      notification.config({
        placement: direction
      });
    }
    notification[type]({
      message: 'Notification message',
      description: 'this is a notice'
    });
  };
  return (
    <div className="notice">
      <Card title="通知提醒框">
        <Button type="primary" onClick={() => handleNotification('success')}>
          Success
        </Button>
        <Button type="primary" onClick={() => handleNotification('info')}>
          Info
        </Button>
        <Button type="primary" onClick={() => handleNotification('warning')}>
          Warning
        </Button>
        <Button type="primary" onClick={() => handleNotification('error')}>
          Error
        </Button>
      </Card>
      <Card title="通知提醒框位置" style={{ margin: '10px 0' }}>
        <Button
          type="primary"
          onClick={() => handleNotification('success', 'topLeft')}
        >
          Success
        </Button>
        <Button
          type="primary"
          onClick={() => handleNotification('info', 'topRight')}
        >
          Info
        </Button>
        <Button
          type="primary"
          onClick={() => handleNotification('warning', 'bottomLeft')}
        >
          Warning
        </Button>
        <Button
          type="primary"
          onClick={() => handleNotification('error', 'bottomRight')}
        >
          Error
        </Button>
      </Card>
    </div>
  );
};
export default Notice;
