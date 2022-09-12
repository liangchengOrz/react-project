import React, { useEffect, useState } from 'react'
import { Table, Pagination,Breadcrumb} from 'antd'
import axios from 'axios'
export default function User() {
  const [total,setTotal]=useState(0)
  const [data,setData]=useState([])
  const [current,setCurrent]=useState(1)
  const columns = [
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'Action',
      key: '',
      dataIndex: '',

    }
  ];
  const handleChange = (num) => {
    setCurrent(num)
    axios({
      url:`/api/manage/user/list.do?pageSize=10&pageNum=${num}`,
      method:'GET'
    }).then(res=>{
      const list=res.data.data.list.map(i=>{
        return {
          key:i.id,
          username:i.username,
          phone:i.phone,
          email:i.email,
          createTime:i.createTime,
        }
      })
      setData(list)
    })

  }
  useEffect(()=>{
    axios({
      url:'/api/manage/user/list.do?pageSize=10&pageNum=1',
      method:'GET'
    }).then(res=>{
      // console.log(res.data.data.list)
      setTotal(res.data.data.total)
      const list=res.data.data.list.map(i=>{
        return {
          key:i.id,
          username:i.username,
          phone:i.phone,
          email:i.email,
          createTime:i.createTime,
        }
      })
      setData(list)
    })
  },[])
  return (
    <div>


     <div className='header'>
        <Breadcrumb>
         
          <Breadcrumb.Item>
            <a href="/sandbox/home">首页</a>
          </Breadcrumb.Item>
          
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>用户列表</h2>
      </div>
      <div className='main'>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className='pagination'>
          <Pagination
            current={current}
            total={total}
            onChange={handleChange}
            showSizeChanger={false} />
        </div>
      </div>
    </div>
  )
}
