import React, { useState,useEffect } from 'react'
import { Breadcrumb, Form, Row, Col, Button, Input, Table, Pagination, Space } from 'antd'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Order() {
    const navigate=useNavigate()
  const [total,setTotal]=useState(0)
  const [current,setCurrent]=useState(1)
  useEffect(()=>{
    document.title='订单列表'
    axios({
      url:'/api/manage/order/list.do?pageSize=10&pageNum=1',
      method:"GET"
    }).then(res=>{
      if(res.status===200){
        // console.log(res.data.data.list)
        let list=res.data.data.list.map(i=>{
          return {
            key:i.orderNo,
            orderNo:i.orderNo,
            receiverName:i.receiverName,
            status:i.status,
            payment:i.payment,
            createTime:i.createTime
          }
        })
        setData(list)
        setTotal(res.data.data.total)
      }
      
    })
  },[])
  const toDetail=(a)=>{
    let id=a.key
    // console.log(a)
    navigate(`/sandbox/order/detail/${id}`)
    
  }
  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '收件人',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '订单总价',
      dataIndex: 'payment',
      key: 'payment',
      render:(a)=>{
        return '¥ '+a
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
      
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_,a) => (
        <Space>
          <a onClick={()=>toDetail(a)}>查看详情</a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([])
  const handleChange = (num) => {
    setCurrent(num)
    axios({
      url:`/api/manage/order/list.do?pageSize=10&pageNum=${num}`,
      method:"GET"
    }).then(res=>{
      if(res.status===200){
        let list=res.data.data.list.map(i=>{
          return {
            key:i.orderNo,
            orderNo:i.orderNo,
            receiverName:i.receiverName,
            status:i.status,
            payment:i.payment,
            createTime:i.createTime
          }
        })
        setData(list)
      }
    })
  }
  return (
    <div>
      <div className='header'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/sandbox/home">首页</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            订单
          </Breadcrumb.Item>
          <Breadcrumb.Item>订单管理</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>订单管理</h2>
      </div>
      <div className='main'>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="关键词"
                name="keyword"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8} offset={8}>
              <Button type="button" style={{ float: 'right', marginLeft: '5px' }}>
                清空
              </Button>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                搜索
              </Button>

            </Col>
          </Row>
        </Form>
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
