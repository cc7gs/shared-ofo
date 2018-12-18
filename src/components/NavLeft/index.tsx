import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavList from './../../config/menuConfig';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { switchMenu } from './../../redux/action';
import './index.less';
import logo from '../../assets/images/logo.svg';
const SubMenu = Menu.SubMenu;
const NavLeft = (props: any) => {
  const [menu, setMenu] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState('home');
  useEffect(() => {
    const menuTreeNode = renderMenu(NavList);
    setMenu(menuTreeNode);
    //更新时获取导航菜单地址将其菜单标记为选中
    setSelectedKeys(location.hash.replace(/#|\?.*$/g, ''));
  }, []);
  const renderMenu = (data: any) => {
    return data.map((item: any) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };
  //点击菜单时处理函数
  const handleMenuClick = (obj: any) => {
    const { dispatch } = props;
    const { item } = obj;
    //派发选中的菜单
    dispatch(switchMenu(item.props.title));
    //将当前点击菜单标记为选择状态
    setSelectedKeys(obj.key);
  };
  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1>playground</h1>
      </div>
      <Menu
        selectedKeys={[selectedKeys]}
        onClick={obj => handleMenuClick(obj)}
        mode="vertical"
        theme="dark"
      >
        {menu}
      </Menu>
    </>
  );
};
export default connect()(NavLeft);
