import React, { useEffect, useState } from 'react'
import './productdetail.scss'
import { Breadcrumb } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export default function ProductDetail() {
  const [data, setData] = useState([])
  const [cate1,setCate1]=useState('')
  const [cate2,setCate2]=useState('')
  const { id } = useParams()
  //  初始请求数据
  useEffect(() => {
    axios({
      url: '/api/manage/product/detail.do?productId=' + id,
      method: 'GET'
    }).then(res => {
      setData(res.data.data)
      let parentCategoryId=res.data.data.parentCategoryId
      let parentId=res.data.data.categoryId
      console.log(parentCategoryId,parentId)
       axios({
        url:'/api/manage/category/get_category.do?categoryId=0',
        method:"GET"
      }).then(res=>{
        res.data.data.forEach(i=>{
          if(i.id===parentCategoryId){
            let cate1=i.name
            setCate1(cate1)    
          }
        })
      })
      if(parentCategoryId){
        
      axios({
        url:`/api/manage/category/get_category.do?categoryId=${parentCategoryId}`,
        method:"GET"
      }).then(res=>{
        // console.log(res.data.data)
        res.data.data.forEach(i=>{
          if(i.id===parentId){
            // console.log(i)
            let cate2=i.name
            // console.log(cate2)
            setCate2(cate2)
          }
        })
      })
      }else{
         axios({
        url:'/api/manage/category/get_category.do?categoryId=0',
        method:"GET"
      }).then(res=>{
        res.data.data.forEach(i=>{
          if(i.id===parentId){
            let cate1=i.name
            setCate1(cate1)    
          }
        })
      })
      }
     

    
    })

  }, [])
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
            <a href="/sandbox/product">商品列表</a>

          </Breadcrumb.Item>
          <Breadcrumb.Item>
            商品详情
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>商品详情</h2>
      </div>
      <div className='main'>
        <div className='top'>
          <div style={{ fontSize: '16px', marginBottom: '15px' }}>商品基本信息</div>
          <div className='info'>
          {/* {console.log(data)} */}
            <div>名称：{data.name}</div>
            <div>标题：{data.subtitle}</div>
            <div>商品分类：{cate1?cate1:'无'}-{cate2?cate2:'无'}</div>
            <div>价格：¥ {data.price}</div>
            <div>上架状态：{data.status === 1 ? '上架' : '下架'}</div>
            <div>库存：{data.stock}</div>
          </div>
        </div>

        <div className='bottom'>
          <div style={{ fontSize: '16px', marginBottom: '15px' }}>商品基本信息</div>
          <div className='content' dangerouslySetInnerHTML={{ __html: data.detail }}></div>

        </div>
      </div>
    </div>
  )
}
