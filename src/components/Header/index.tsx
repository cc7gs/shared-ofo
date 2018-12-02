import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'
const Header = () => {
  const [userInfo, setUserInfo] = useState('')
  const [time, setTime] = useState('')
  const [weather, setWeather] = useState('')
  const [dayPictureUrl, setDayPictureUrl] = useState('')
  useEffect(() => {
    setUserInfo('cc')
    setInterval(() => {
      let systime = Util.formateDate(new Date().getTime())
      setTime(systime)
    }, 1000)
    getWeatherAPIData()
  }, [])
  const getWeatherAPIData = () => {
    let city = '上海'
    axios
      .jsonp({
        url:
          'http://api.map.baidu.com/telematics/v3/weather?location=' +
          encodeURIComponent(city) +
          '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
      })
      .then((res: any) => {
        if (res.status == 'success') {
          let data = res.results[0].weather_data[0]
          setWeather(data.weather)
          setDayPictureUrl(data.dayPictureUrl)
        }
      })
  }
  return (
    <div className="header">
      <Row className="header-top">
        <span>欢迎,{userInfo}</span>
        <a href="javascript:void(0)">退出</a>
      </Row>
      <Row className="breadCrumb">
        <Col span={4} className="breadCrumb-title">
          首页
        </Col>
        <Col span={20} className="weather">
          <span className="date">{time}</span>
          <span className="weather-img">
            <img src={dayPictureUrl} alt="加载中..." />
          </span>
          <span className="weather-detail">{weather}</span>
        </Col>
      </Row>
    </div>
  )
}
export default Header
