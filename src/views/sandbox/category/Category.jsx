import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Table, Pagination, Space } from 'antd'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Category() {
  const navigate =useNavigate()
  const handleClick = () => {

  }
  const handleOnChange = (a) => {
    setCurrent(a)
    // console.log(lists.slice(10*(a-1),10*(a-1)+10))
    setData(lists.slice(10*(a-1),10*(a-1)+10))
  }
  
  const [lists, setLists] = useState([])
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  useEffect(() => {
    document.title='分类列表'
    axios({
      url: '/api/manage/category/get_category.do?categoryId=0',
      method: 'GET'
    }).then(res => {
      if (res.status === 200) {
        // console.log(res.data)
        const list = res.data.data.map(i => {
          return {
            key: i.id,
            name: i.name
          }
        })
        setLists(list)
        setTotal(list.length)
        // console.log(lists.slice(0,10))
        setData(list.slice(0,10))
        
      }

    })
  }, [])
  const toList=(a)=>{
    // console.log(a) 
    let id=a.key
    navigate(`/sandbox/category/list/${id}`)
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'subtitle',
      key: 'subtitle',
      render: (_,a) => (
        <Space>
          <a >修改</a>|
          <a onClick={()=>toList(a)}>查看子分类</a>
        </Space>
      ),
      width: 170,
    }
  ]
  return (
    <div>
      <div className='header'>
        <Breadcrumb>
          
          <Breadcrumb.Item>
            <a href="/sandbox/home">首页</a>
          </Breadcrumb.Item>
          
          <Breadcrumb.Item>一级品类管理</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>一级品类管理</h2>
      </div>
      <div className='main'>
        <div style={{ marginBottom: '30px' }}>
          <Button type='primary' onClick={handleClick}>新增</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className='pagination'>
          <Pagination
           current={current}
            total={total}
            onChange={handleOnChange}
            showSizeChanger={false}
            pageSize={10}
          />

        </div>
      </div>
    </div>
  )
}
