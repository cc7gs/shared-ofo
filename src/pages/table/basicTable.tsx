import React, { useState, useEffect } from 'react'
import { Card, Table } from 'antd'
import axios from 'axios'
const colums = [
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
    dataIndex: 'sex'
  },
  {
    title: '兴趣',
    dataIndex: 'interest'
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

const baseTable = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    request();
  }, []);
  const request=()=>{
    const baseUrl ='https://www.easy-mock.com/mock/5c0645417b27ee7217ffeca9/mockapi'
    axios.get(baseUrl + '/table/list').then(({data:{result:data},...res}) => {
        if(res.status==200){
          setData(data);
        }
    })
  }
  return (
    <Card title='基础表格'>
      <Table columns={colums} dataSource={data} />
    </Card>
  )
}
export default baseTable
