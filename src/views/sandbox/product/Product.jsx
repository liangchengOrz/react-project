import React, { useEffect, useState } from 'react'
import './product.scss'
import { Breadcrumb, Row, Form, Input, Col, Button, Space, Table, message, Pagination } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Product() {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      // width: 170,
    },
    {
      title: '标题',
      dataIndex: 'subtitle',
      key: 'subtitle',
      // width: 170,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      width: 170,
      render: (item, record) => (
        <Space className='changeStatus'>
          <span>{item === 1 ? '在售' : '已下架'}</span>
          <Button onClick={() => setStatus(record)}>{item === 1 ? '设置下架' : '设置上架'}</Button>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space>
          <a onClick={() => toDetail(record)}>查看详情</a>|
          <a onClick={() => toEditor(record)}>编辑</a>
        </Space>
      ),
    },
  ];
  // 切换状态
  const setStatus = (record) => {
    let id = record.key
    let status = record.status === 1 ? 2 : 1
    let data=new FormData()
    data.append('productId',id)
    data.append('status',status)
    axios({
      url:'/api/manage/product/set_sale_status.do',
      method:'POST',
      data
    }).then(res=>{
      axios({
        url:'/api/manage/product/list.do?pageSize=10&pageNum='+current,
      }).then(res=>{
        const list = res.data.data.list.map((i) => {
            return {
              key: i.id,
              name: i.name,
              subtitle: i.subtitle,
              price: i.price,
              status: i.status
            }
          })
          setTotal(res.data.data.total)
          setData(list)
      })
    })
  }
  const toDetail = (record) => {
    // console.log(record)
    let id = record.key
    navigate(`/sandbox/product/detail/${id}`)
  }
  const toEditor = (record) => {
    let id = record.key
    navigate(`/sandbox/product/editor/${id}`)
  }
  // 数据列表
  const [data, setData] = useState([])
  // 总数
  const [total, setTotal] = useState(0)
  // 分页器页数
  const [current, setCurrent] = useState(1)
  // keyword
  const [name, setName] = useState('')
  // 表单
  const [form] = Form.useForm()
  const navigate = useNavigate()
  // to editor
  const handleClick = () => {
    navigate('/sandbox/product/editor')
  }
  // 初始化数据
  useEffect(() => {
    axios({
      url: '/api/manage/product/list.do?pageSize=10&pageNum=1',
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.status === 10) {
          message.error(res.data.msg)
        } else {
          const list = res.data.data.list.map((i) => {
            return {
              key: i.id,
              name: i.name,
              subtitle: i.subtitle,
              price: i.price,
              status: i.status
            }
          })
          setTotal(res.data.data.total)
          setData(list)
        }
      }
    })
  }, [])
  // 分页器变化
  const showSizeChange = (num) => {
    setCurrent(num)
    if (name) {
      axios({
        url: `/api/manage/product/search.do?pageSize=10&pageNum=${num}&productName=${name}`,
        method: "GET"
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 10) {
            message.error(res.data.msg)
          } else {
            const list = res.data.data.list.map((i) => {
              return {
                key: i.id,
                name: i.name,
                subtitle: i.subtitle,
                price: i.price,
                status: i.status
              }
            })
            setData(list)
          }
        }
      })
    } else {
      axios({
        url: `/api/manage/product/list.do?pageSize=10&pageNum=${num}`,
        method: "GET"
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 10) {
            message.error(res.data.msg)
          } else {
            const list = res.data.data.list.map((i) => {
              return {
                key: i.id,
                name: i.name,
                subtitle: i.subtitle,
                price: i.price,
                status: i.status
              }
            })
            setData(list)
          }
        }
      })
    }
  }
  // 搜索
  const onFinish = (values) => {
    // setCurrent(1)
    setName(values.productName)
    if (values.productName) {
      axios({
        url: `/api/manage/product/search.do?pageSize=10&pageNum=${current}&productName=${values.productName}`,
        method: 'GET'
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 10) {
            message.error(res.data.msg)
          } else {
            const list = res.data.data.list.map((i) => {
              return {
                key: i.id,
                name: i.name,
                subtitle: i.subtitle,
                price: i.price,
                status: i.status
              }
            })
            setData(list)
            setTotal(res.data.data.total)
          }
        }
      })
    } else {
      axios({
        url: `/api/manage/product/search.do?pageSize=10&pageNum=${current}`,
        method: 'GET'
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.status === 10) {
            message.error(res.data.msg)
          } else {
            const list = res.data.data.list.map((i) => {
              return {
                key: i.id,
                name: i.name,
                subtitle: i.subtitle,
                price: i.price,
                status: i.status
              }
            })
            setData(list)
            setTotal(res.data.data.total)
          }
        }
      })
    }


  }
  // 清空
  const clearName = () => {
    form.setFieldsValue({
      productName: ''
    })
    form.getFieldValue('productName')
    setName('')
  }
  return (
    <div>
      <div className='header'>
        <Breadcrumb>

          <Breadcrumb.Item>
            <a href="/sandbox/home">首页</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            商品
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            商品列表
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>商品列表</h2>
      </div>
      <div className='main'>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          form={form}
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="关键词"
                name="productName"
              // initialValue={name}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8} offset={8}>
              <Button
                type="button"
                style={{ float: 'right', marginLeft: '5px' }}
                onClick={clearName
                }
              >
                清空
              </Button>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                搜索
              </Button>

            </Col>
          </Row>
        </Form>
        <div style={{ marginBottom: '30px' }}>
          <Button type='primary' onClick={handleClick}>新增</Button>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className='pagination'>
          <Pagination current={current} total={total} onChange={showSizeChange} showSizeChanger={false} />
        </div>

      </div>
    </div>
  )
}
