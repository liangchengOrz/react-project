import React from 'react'
import './login.scss'
import {useNavigate} from 'react-router-dom'

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input,message } from 'antd';
import axios from 'axios'
export default function Login() {
  const navigate=useNavigate()
  const onFinish = (values) => {
    const formdata=new FormData()
    formdata.append('username',values.username)
    formdata.append('password',values.password)
    // console.log(values)
    axios({
      url:'/api/manage/user/login.do',
      method:'POST',
      data:formdata
    }).then((res)=>{
      console.log(res.data)
      const {data}=res
      if(data.status===0){
         message.success(data.msg)
         sessionStorage.setItem('user',JSON.stringify(res.data.data))
         navigate('/sandbox')
      }else{
        message.error('登录失败:'+data.msg)
      }
    })
  }
  return (
    <div className='container'>
       <div className='login'>
      <Form
        name="normal_login"
        className="login-form"

        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入账号!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号为admin" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码为admin"
          />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>

        </Form.Item>
      </Form>
    </div>
    </div>
   
  )
}
