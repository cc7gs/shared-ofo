import React from 'react';
import { Button, Card, message } from 'antd';
import './index.less';
type IMessage = 'success' | 'info' | 'warning' | 'error' | 'loading';

const messages = () => {
  const handleMessages = (type: IMessage) => {
    message[type]('玩转 react');
  };
  return (
    <div className="message">
      <Card>
        <Button type="primary" onClick={() => handleMessages('success')}>
          Success
        </Button>
        <Button type="primary" onClick={() => handleMessages('info')}>
          Info
        </Button>
        <Button type="primary" onClick={() => handleMessages('warning')}>
          Warning
        </Button>
        <Button type="primary" onClick={() => handleMessages('error')}>
          Error
        </Button>
        <Button type="primary" onClick={() => handleMessages('loading')}>
          Loading
        </Button>
      </Card>
    </div>
  );
};
export default messages;
