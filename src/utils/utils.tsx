import React from 'react'
import {Select} from 'antd'
const Option = Select.Option;
export default {
  formateDate(time: number) {
    if (!time) return '';
    let date = new Date(time);
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      '  ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    );
  },
  pagination(data: any, callback: (cur: number) => void) {
    return {
      onChange: (current: number) => callback(current),
      current: data.result.page,
      total: data.result.total,
      pageSize: data.result.page_size,
      showQuickJumper: true,
      showTotal: () => {
        return `共${data.result.total}条`;
      }
    };
  },
  getOptionList(list:any){
    if(!list){
      return [];
    }
      let options:any=[];
      list.map((item:any) => {
        options.push(<Option value={item.id} key={item.id+'a'}>{item.name}</Option>)
      });
      return options;
  }
};
