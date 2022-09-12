import React from 'react'
import {Breadcrumb} from 'antd'
import './categorylist.scss'
export default function CategoryList() {
  return (
    <div>
       <div className='header'>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/sandbox/home">首页</a>
          </Breadcrumb.Item>
         
          <Breadcrumb.Item>
          <a href="/sandbox/category">一级品类管理</a>            
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            二级品类管理
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>二级品类管理</h2>
      </div>
    </div>
  )
}
