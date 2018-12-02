import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import NavList from './../../config/menuConfig'
import { Menu } from 'antd'
import './index.less'
import logo from '../../assets/images/logo.svg'
const SubMenu = Menu.SubMenu
const NavLeft = () => {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    const menuTreeNode = renderMenu(NavList)
    setMenu(menuTreeNode)
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
      return <Menu.Item key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
    })
  }

  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>playground</h1>
      </div>
      <Menu mode="vertical" theme="dark">
        {menu}
      </Menu>
    </>
  )
}
export default NavLeft
