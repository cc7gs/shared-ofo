import React, { useState, useEffect } from 'react';
import { Card, Table, Spin, Modal } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import axios from '../../axios';
interface IUser {
  title: string;
  dataIndex: string;
  key?: string;
  render?: any;
  sortOrder?: 'descend' | 'ascend';
}
//模拟横向数据，由于数据一样则key值存在相同则报错..
const columns1: ColumnProps<IUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 150,
    fixed: 'left'
  },
  {
    title: '姓名',
    dataIndex: 'username',
    width: 150,
    fixed: 'left'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render(sex: number) {
      return sex === 1 ? '男' : '女';
    },
    width: 100
  },
  {
    title: '兴趣',
    dataIndex: 'interest',

    render(state: string) {
      const config: any = {
        '1': '打篮球',
        '2': '跑步',
        '3': '踢足球',
        '4': '唱歌',
        '5': '打乒乓球'
      };
      return config[state];
    },
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    width: 150
  },
  {
    title: '地址',
    dataIndex: 'address',
    fixed: 'right',
    width: 300
  }
];

const params = {
  page: 1
};
const baseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setsortOrder] = useState('descend');
  const columns: ColumnProps<IUser>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: (a, b) => (a as any).id - (b as any).id,
      sortOrder: sortOrder as any,
      width: 150
    },
    {
      title: '姓名',
      dataIndex: 'username',
      width: 150
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render(sex: number) {
        return sex === 1 ? '男' : '女';
      },
      width: 100
    },
    {
      title: '兴趣',
      dataIndex: 'interest',

      render(state: string) {
        const config: any = {
          '1': '打篮球',
          '2': '跑步',
          '3': '踢足球',
          '4': '唱歌',
          '5': '打乒乓球'
        };
        return config[state];
      },
      width: 150
    },
    {
      title: '出生日期',
      dataIndex: 'birthday',
      width: 150
    },
    {
      title: '地址',
      dataIndex: 'address'
    }
  ];
  useEffect(() => {
    request();
  }, []);
  const request = () => {
    setLoading(true);
    axios
      .ajax({
        url: '/table/list',
        data: {
          param: params.page
        }
      })
      .then((res: any) => {
        let list = res.result.list;
        if (res.code === 0) {
          list.map((item: any, index: number) => {
            item.key = index;
          });
          setData(list);
        }
        //关闭loading
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Card title="头部固定">
        <Spin spinning={loading}>
          <Table
            bordered
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 240 }}
            onChange={(pagination, filters, sorter) => {
              setsortOrder(sorter.order);
            }}
          />
        </Spin>
      </Card>

      <Card title="左侧固定">
        <Spin spinning={loading}>
          <Table
            columns={columns1}
            dataSource={data}
            pagination={false}
            scroll={{ x: 1800 }}
          />
        </Spin>
      </Card>
    </div>
  );
};
export default baseTable;
