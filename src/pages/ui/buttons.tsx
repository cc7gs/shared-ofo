import React, { useState } from 'react';
import { Card, Button, Icon, Radio } from 'antd';
import './index.less';
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
type ButtonSize = 'small' | 'default' | 'large';
const sm: ButtonSize = 'small';
const Buttons = () => {
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(sm);
  return (
    <div className="btns">
      <Card title="基础按钮">
        <Button type="primary">Imooc</Button>
        <Button>Imooc</Button>
        <Button type="dashed">Imooc</Button>
        <Button type="danger">Imooc</Button>
        <Button disabled>Imooc</Button>
      </Card>
      <Card title="图形按钮">
        <Button icon="plus">创建</Button>
        <Button icon="edit">编辑</Button>
        <Button icon="delete">删除</Button>
        <Button shape="circle" icon="search" />
        <Button type="primary" icon="search">
          搜索
        </Button>
        <Button type="primary" icon="download">
          下载{' '}
        </Button>
      </Card>
      <Card title="Loading按钮">
        <Button type="primary" loading={loading}>
          Imooc
        </Button>
        <Button type="primary" shape="circle" loading={loading} />
        <Button loading={loading}>点击加载</Button>
        <Button shape="circle" loading={loading} />
        <Button type="primary" onClick={() => setLoading(false)}>
          关闭
        </Button>
      </Card>
      <Card title="按钮组">
        <ButtonGroup>
          <Button icon="left" type="primary" style={{ marginRight: '0' }}>
            返回
          </Button>
          <Button icon="right" type="primary">
            前进
          </Button>
        </ButtonGroup>
      </Card>
      <Card title="按钮尺寸">
        <RadioGroup onChange={e => setSize(e.target.value)}>
          <Radio value="small">小</Radio>
          <Radio value="default">中</Radio>
          <Radio value="large">大</Radio>
          <Button type="primary" size={size}>
            imooc
          </Button>
          <Button size={size}>imooc</Button>
          <Button type="dashed" size={size}>
            imooc
          </Button>
          <Button type="danger" size={size}>
            imooc
          </Button>
        </RadioGroup>
      </Card>
    </div>
  );
};
export default Buttons;
