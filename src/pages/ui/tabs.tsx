import React, { useState } from 'react';
import { Card, Icon, Tabs, message } from 'antd';

const TabPane = Tabs.TabPane;

type ITabs = Readonly<{
  title: string;
  content: string;
  key: string;
}>;
const tabsData: ITabs[] = [
  {
    title: 'tabs1',
    content: 'Tab Pane1',
    key: '1'
  },
  {
    title: 'tabs2',
    content: 'Tab Pane2',
    key: '2'
  },
  {
    title: 'tabs3',
    content: 'Tab Pane3',
    key: '3'
  }
];
const myTabs = () => {
  const [panes, setPanes] = useState(tabsData);
  const [activekey, setActiveKey] = useState(tabsData[0].key);
  const handleTabs = (key: string) => {
    message.info('你选择了 ' + key);
    setActiveKey(key);
  };
  const handleEdit = (targetKey: any, action: any) => {
    action(targetKey);
  };
  const add = () => {
    const newPanes = panes;
  };
  return (
    <div className="tabs">
      <Card title="Tabs标签">
        <Tabs defaultActiveKey="1" onChange={handleTabs}>
          <TabPane tab="Tab 1" key="1">
            Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
      <Card title="图标的Tabs标签" style={{ margin: '10px 0' }}>
        <Tabs defaultActiveKey="1" onChange={handleTabs}>
          <TabPane
            tab={
              <span>
                <Icon type="plus" />
                Tab 1
              </span>
            }
            key="1"
          >
            Tab Pane 1
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="edit" />
                Tab2
              </span>
            }
            key="2"
          >
            Tab Pane 2
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="delete" />
                Tab 3
              </span>
            }
            key="3"
          >
            Tab Pane 3
          </TabPane>
        </Tabs>
      </Card>
      <Card title="添加删除tabs标签">
        <Tabs
          defaultActiveKey={activekey}
          activeKey={activekey}
          type="editable-card"
          onEdit={handleEdit}
          onChange={handleTabs}
        >
          {panes.map(pane => {
            return (
              <TabPane tab={pane.title} key={pane.key}>
                {pane.content}
              </TabPane>
            );
          })}
        </Tabs>
      </Card>
    </div>
  );
};
export default myTabs;
