import React, { useState, useEffect } from 'react'
import { Card, Table, Spin, Modal } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import axios from '../../axios'
interface IUser {
  title: string
  dataIndex: string
  key?: string
  render?: any
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
      return sex === 1 ? '男' : '女'
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
      }
      return config[state]
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
]
const params = {
  page: 1
}
const baseTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request()
  }, [])
  const request = () => {
    setLoading(true)
    axios
      .ajax({
        url: '/table/list',
        data: {
          param: params.page
        }
      })
      .then((res: any) => {
        let list = res.result.list
        if (res.code === 0) {
          list.map((item: any, index: number) => {
            item.key = index
          })
          setData(list)
        }
        //关闭loading
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <Card title='头部固定'>
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Spin>
      </Card>
      <Card title='左侧固定'>
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data} pagination={false} />
        </Spin>
      </Card>
    </div>
  )
}
export default baseTable
