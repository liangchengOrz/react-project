import React from 'react'
import {Breadcrumb} from 'antd'
import './orderdetail.scss'
export default function OrderDetail() {
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
           <Breadcrumb.Item>
            <a href="/sandbox/order">订单管理</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>订单详情</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>订单详情</h2>
      </div>
    </div>
  )
}
