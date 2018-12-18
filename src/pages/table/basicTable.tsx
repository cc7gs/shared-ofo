import React, { useState, useEffect } from 'react';
import { Card, Table, Spin, Modal } from 'antd';
import { ColumnProps, TableRowSelection } from 'antd/lib/table';
import utils from '../../utils/utils';
import axios from '../../axios';
interface IUser {
  title: string;
  dataIndex: string;
  key?: string;
  render?: any;
}
const columns: ColumnProps<IUser>[] = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'username'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render(sex: number) {
      return sex === 1 ? '男' : '女';
    }
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
    }
  },
  {
    title: '出生日期',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address'
  }
];
const initalSelect: number[] = [];
const params = {
  page: 1
};
const baseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectKey, setSelectKey] = useState(initalSelect);
  const [paginations, setPagination] = useState({});
  const rowSelection: TableRowSelection<object> = {
    type: 'radio',
    selectedRowKeys: selectKey
  };
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
          console.log(res);
          setPagination(
            utils.pagination(res, current => {
              //to-do 当点击分页时，将当前页数传递给后台
              params.page = current;
              //重新请求数据
              request();
            })
          );
          setData(list);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onRowClick = (record: any, index: any) => {
    let selectKey = [index];
    setSelectKey(selectKey);
    Modal.info({
      content: `${record.username}喜欢${record.interest}`
    });
  };
  return (
    <div>
      <Card title="基础表格">
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data} />
        </Spin>
      </Card>
      <Card title="有选择按钮的">
        <Spin spinning={loading}>
          <Table
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={data}
            pagination={paginations}
          />
        </Spin>
      </Card>
    </div>
  );
};
export default baseTable;
