import React, { useEffect, useState } from 'react'
import './commonsider.scss'
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import {useNavigate,useLocation} from 'react-router-dom'
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('仪表盘', 'sub1', <UserOutlined />, [
    getItem('首页', '/sandbox/home', <PieChartOutlined />),
  ]),
  getItem('商品', 'sub2', <UserOutlined />, [
    getItem('商品管理', '/sandbox/product', <PieChartOutlined />),
  ]),
  getItem('品类', 'sub3', <UserOutlined />, [
    getItem('品类管理', '/sandbox/category', <PieChartOutlined />),
  ]),
  getItem('订单', 'sub4', <PieChartOutlined />, [
    getItem('订单管理', '/sandbox/order', <PieChartOutlined />),
  ]),
  getItem('用户', 'sub5', <TeamOutlined />, [
    getItem('用户管理', '/sandbox/user', <PieChartOutlined />),
  ]),
];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
function CommonSider() {
  const navigate=useNavigate()
  const location=useLocation()
  // console.log(location.pathname)
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    // console.log(keys)
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);   
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {     
      setOpenKeys(keys);    
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(()=>{
    if(location.pathname==='/sandbox/home'){
      setOpenKeys(['sub1'])
    }else if (location.pathname==='/sandbox/product'){
      setOpenKeys(['sub2'])
    }else if (location.pathname==='/sandbox/category'){
      setOpenKeys(['sub3'])
    }else if (location.pathname==='/sandbox/order'){
      setOpenKeys(['sub4'])
    }else if (location.pathname==='/sandbox/user'){
      setOpenKeys(['sub5'])
    }
   
  },[location.pathname])
  const handleSelect=({key})=>{
    navigate(key)
  }
  return (
    <div>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo"></div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          onSelect={handleSelect}
          selectedKeys={location.pathname}
        />
      </Sider>
    </div>
  )
}
export default CommonSider
