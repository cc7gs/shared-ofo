import Jsonp from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
const Axios = {
  jsonp(options: any) {
    return new Promise((resolve: any, reject: any) => {
      Jsonp(
        options.url,
        {
          param: 'callback'
        },
        (error: any, response: any) => {
          if (response.status == 'success') {
            resolve(response)
          } else {
            reject(error.message)
          }
        }
      )
    })
  },
  ajax(options: any) {
    const baseApi =
      'https://www.easy-mock.com/mock/5c0645417b27ee7217ffeca9/mockapi'
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: options.url,
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      })
        .then(response => {
          let res = response.data;
          if (response.status === 200) {
           
            if (res.code === 0) {
              resolve(res)
            } else {
              Modal.info({
                title: '提示',
                content: res.message ? res.message : '数据加载失败,请从新加载'
              })
            }
          } else {
            reject(res);
          }
        })
        .catch(() => {
          console.log('数据请求地址有误')
        })
    })
  }
}
export default Axios
