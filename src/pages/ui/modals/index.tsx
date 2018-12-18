import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd';
import './index.less';
type IModal = 'confirm' | 'info' | 'success' | 'warning';
const Modals = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);

  const handleOpenModal = (type: any) => {
    console.log(typeof type);
    switch (type) {
      case 'modal1':
        setModal1(true);
        break;
      case 'modal2':
        setModal2(true);
        break;
      case 'modal3':
        setModal3(true);
        break;
      case 'modal4':
        setModal4(true);
    }
  };
  const handleConfirm = (type: IModal) => {
    Modal[type]({
      title: '确定?',
      content: '你确定你学会了React了吗?',
      onOk() {},
      onCancel() {}
    });
  };
  const handleOk = () => {};
  return (
    <div className="myModal">
      <Card title="基础模态框">
        <Button onClick={() => handleOpenModal('modal1')}>Open</Button>
        <Button onClick={() => handleOpenModal('modal2')}>自定义页脚</Button>
        <Button onClick={() => handleOpenModal('modal3')}>顶部显示</Button>
        <Button onClick={() => handleOpenModal('modal4')}>垂直水平居中</Button>
      </Card>
      <Card title="信息确认框">
        <Button onClick={() => handleConfirm('confirm')}>Confirm</Button>
        <Button onClick={() => handleConfirm('info')}>info</Button>
        <Button onClick={() => handleConfirm('success')}>Success</Button>
        <Button onClick={() => handleConfirm('warning')}>Warning</Button>
      </Card>
      <Modal
        title="React"
        visible={modal1}
        onOk={handleOk}
        onCancel={() => setModal1(false)}
      >
        this is React playground
      </Modal>
      <Modal
        title="React2"
        visible={modal2}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={() => setModal2(false)}
      >
        this is React playground
      </Modal>
      <Modal
        title="React3"
        style={{ top: 20 }}
        visible={modal3}
        onOk={handleOk}
        onCancel={() => setModal3(false)}
      >
        this is React playground
      </Modal>
      <Modal
        title="React4"
        centered
        visible={modal4}
        onOk={handleOk}
        onCancel={() => setModal4(false)}
      >
        this is React playground
      </Modal>
    </div>
  );
};
export default Modals;
