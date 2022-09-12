import React from 'react'
import './commonheader.scss'
import { Dropdown, Menu, Space, Layout ,message} from 'antd';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const { Header } = Layout

export default function CommonHeader() {
    const navigate=useNavigate()
    const onClick=({ key }) => {
        axios({
            url:'/api/user/logout.do',
            method:'POST',
        }).then((res)=>{
            // console.log(res.data,res.status)
            if(res.status===200&&res.data.status===0){
                sessionStorage.removeItem('user')
                navigate('/login')
                message.success('退出成功')
            }
        })
    navigate(key)
};
const menu = (
    <Menu
        onClick={onClick}
        items={[
            {
                key: '/login',
                label: (
                    <span href='/login'>退出登录</span>
                ),
            }
        ]}
    />
);
    return (
        <Header
            className="site-layout-background"
        >
            <Dropdown overlay={menu} className='dropdown'>
                
                    <Space>
                       <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="" className='img'/>
                       <span>admin</span>
                    </Space>
            </Dropdown>
        </Header>

    )
}
