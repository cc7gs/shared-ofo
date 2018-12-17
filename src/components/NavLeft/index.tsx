import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import NavList from './../../config/menuConfig'
import { Menu } from 'antd'
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action'
import './index.less'
import logo from '../../assets/images/logo.svg'
const SubMenu = Menu.SubMenu
const NavLeft = (props:any) => {
  const [menu, setMenu] = useState([]);
  const [selectedkeys,setSelectedkeys]=useState(['/home']);
  useEffect(() => {
    const menuTreeNode = renderMenu(NavList)
    setMenu(menuTreeNode)
    //获取当前路由
    setSelectedkeys([window.location.hash.replace(/#|\?.*$/g,'')]);
  }, [])
  const renderMenu = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key} title={item.title}><Link to={item.key}>{item.title}</Link></Menu.Item>
    })
  }
  const handleMenuClick=(obj:any)=>{
    const {item}=obj
    const {dispatch}=props;
    //派发
    dispatch(switchMenu(item.props.title));
    //获取路由
    setSelectedkeys([obj.key]);
  }
  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>playground</h1>
      </div>
      <Menu
      onClick={(item)=>handleMenuClick(item)}
      selectedKeys={selectedkeys}
      mode="vertical" theme="dark">
        {menu}
      </Menu>
    </>
  )
}
export default connect()(NavLeft);
