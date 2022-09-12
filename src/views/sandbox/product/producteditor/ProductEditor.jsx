import React, { useEffect, useState } from 'react'
import './producteditor.scss'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Form, Input, Select, InputNumber, Switch, Upload, Button, Modal, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const { Option } = Select;
export default function ProductEditor() {
  const navigate=useNavigate()
  // 表单数据域进行交互
  const [form] = Form.useForm()
  // 一级分类数据
  const [cate1, setCate1] = useState([])
  const [cate1list, setCate1list] = useState([])
  // 二级分类数据
  const [cate2, setCate2] = useState([])
  const [cate2list, setCate2list] = useState([])
  // 一级分类id
  const [cateid1, setCateid1] = useState('')
  // 二级分类id
  const [cateid2, setCateid2] = useState('')
  // 初始化数据
  useEffect(() => {
    axios({
      url: '/api/manage/category/get_category.do?categoryId=0',
      method: 'GET'
    }).then(res => {
      // 一级分类数据list
      let list = res.data.data.map(i => {
        return {
          id: i.id,
          name: i.name
        }
      })
      setCate1(list)
      let list1 = []
      res.data.data.forEach(i => {
        list1.push(<Option key={i.id} value={i.name}>{i.name}</Option>)
      })
      setCate1list(list1)
      // 有id就是编辑
      if (id) {
        axios({
          url: "/api/manage/product/detail.do?productId=" + id
        }).then(res => {
          let listArr = res.data.data
          form.setFieldsValue({
            name: listArr.name,
            subtitle: listArr.subtitle,
            price: listArr.price,
            stock: listArr.stock,
            status: listArr.status === 1 ? true : false,
            detail: listArr.detail,
          });
          setStatus(listArr.status)
          // 设置图片————————————————————————————————————————————
          if (listArr.subImages) {
            let images = listArr.subImages.split(',')
            // console.log(images)
            let subImages = []
            images.forEach(i => {
              subImages.push(
                {
                  uid: Math.random(),
                  name: 'image.png',
                  status: 'done',
                  url: listArr.imageHost + i,
                }
              )
            })
            setFileList(subImages)
          }
          // 商品id
          let categoryId = res.data.data.categoryId
          // 一级分类id
          let parentCategoryId = res.data.data.parentCategoryId
          if (parentCategoryId) {
            setIsshow(true)
            list.forEach(i => {
              if (i.id === parentCategoryId) {
                // console.log(parentCategoryId)
                setCateid1(i.id)
                form.setFieldsValue({
                  cate1: i.name
                })
              }
            })
            axios({
              url: '/api/manage/category/get_category.do?categoryId=' + parentCategoryId,
            }).then(res => {
              let list = res.data.data.map(i => {
                return {
                  id: i.id,
                  name: i.name
                }
              })
              setCate2(list)
              let list1 = []
              res.data.data.forEach(i => {
                list1.push(<Option key={i.id} value={i.name}>{i.name}</Option>)
              })
              setCate2list(list1)
              list.forEach(i => {
                // console.log(i)
                if (i.id === categoryId) {
                  setCateid2(i.id)
                  form.setFieldsValue({
                    cate2: i.name
                  })
                }
              })
            })
          } else {
            list.forEach(i => {
              if (i.id === categoryId) {
                setCateid1(i.id)
                form.setFieldsValue({
                  cate1: i.name
                })
              }
            })
          }
        })
      }
    })
  }, [])
  // 控制二级分类显示与隐藏
  const [isshow, setIsshow] = useState(false)
  // 一级分类处理事件
  const handleSelectChange = (value, obj) => {
    console.log(value, obj)
    setCateid1(obj.key)
    form.setFieldsValue({
      cate2: ''
    })
    setIsshow(true)
    axios({
      url: `/api/manage/category/get_category.do?categoryId=${obj.key}`,
      method: 'GET'
    }).then(res => {
      // console.log(res.data.data)
      let list = res.data.data.map(i => {
        return {
          id: i.id,
          name: i.name
        }
      })
      // console.log(list)
      setCate2(list)
      let list1 = []
      res.data.data.forEach(i => {
        list1.push(<Option key={i.id}>{i.name}</Option>)
      })
      // console.log(list1)
      setCate2list(list1)
    })
  }
  // 二级分类处理事件
  const handleCate2 = (_, a) => {
    console.log(a)
    setCateid2(a.key)
  }
  // 表单提交事件
  const handleFormFinish = (values) => {
    if (id) {
      let arr=[]
      fileList.forEach(i=>{       
        if(i.url){
          arr.push(i.url.slice(26,))
        }
        if(i.response){
          arr.push(i.response.data.uri)
          // console.log(i.response.data.uri)
        }       
      })      
      const str=arr.toString()
      const data=new FormData()
      data.append('name',values.name)
      data.append('subtitle',values.subtitle)
      data.append('price',values.price)
      data.append('stock',values.stock)
      data.append('status',values.status?1:2)
      data.append('detail',values.detail)
      data.append('levelOneCategoryId',cateid1)
        data.append('levelTwoCategoryId',cateid2)
      data.append('subImages',str)
      data.append('categoryId',cateid2)
      data.append('id',id)
      fetch('/api/manage/product/save.do',{body:data,method:'POST'}).then(res=>res.json()).then(res=>{
        console.log(res.data)
        message.success(res.data)
        navigate('/sandbox/product')
      })     
    }else{
       let arr=[]
      fileList.forEach(i=>{       
        if(i.url){
          arr.push(i.url.slice(26,))
        }
        if(i.response){
          arr.push(i.response.data.uri)
          // console.log(i.response.data.uri)
        }       
      })      
      const str=arr.toString()
      const data=new FormData()
      data.append('name',values.name)
      data.append('subtitle',values.subtitle)
      data.append('price',values.price)
      data.append('stock',values.stock)
      data.append('status',values.status?1:2)
      data.append('detail',values.detail)
      data.append('levelOneCategoryId',cateid1)
        data.append('levelTwoCategoryId',cateid2)
        data.append('levelTwoCategoryId','')
      data.append('subImages',str)
      data.append('categoryId',cateid2)
      fetch('/api/manage/product/save.do',{body:data,method:'POST'}).then(res=>res.json()).then(res=>{
        console.log(res.data)
        message.success(res.data)
        navigate('/sandbox/product')
      })     
    }
  }
  const [value, setValue] = useState('');
  const { id } = useParams()
  // switchStatus
  const [status, setStatus] = useState(true)
  const switchStatus = (b) => {
    console.log(b)
    setStatus(b ? 1 : 2)
  }

  // 图片上传-------------------------------
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([


  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (<div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
  );
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
            {id ? '修改商品' : '新增商品'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <h2 className='title'>{id ? '修改商品' : '新增商品'}</h2>
      </div>
      <div className='main'>
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 10,
          }}
          form={form}
          onFinish={handleFormFinish}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="subtitle"
            rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 一级分类 */}
          <Form.Item
            label="商品一级分类"
            name="cate1"
            rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
          >
            <Select
              placeholder='请选择商品一级分类'
              onChange={handleSelectChange}
            >
              {cate1list}
            </Select>
          </Form.Item>
          {/* 二级分类 */}
          {
            isshow ? <Form.Item
              label="商品二级分类"
              name="cate2"
              rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
            >

              <Select
                onChange={handleCate2}
                placeholder='请选择商品二级分类'
              >
                {cate2list}
              </Select>
            </Form.Item> : ''
          }
          <Form.Item
            label="价格"
            name="price"
            rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="库存"
            name="stock"
            rules={[
              {
                required: true,
                message: '此项为必填项',
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label="上架状态"
            name="status"
          >
            <Switch
              checkedChildren="上架"
              unCheckedChildren="下架"
              checked={status === 1 ? true : false}
              onClick={switchStatus}
            />
          </Form.Item>
          {/* 上传----------------------------------- */}
          <Form.Item
            label="图片上传"
            name="subImages"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload
              action="/api/manage/product/upload.do"
              name='upload_file'
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>

          </Form.Item>
          <Form.Item
            label="详情"
            name="detail"
            rules={[
              {
                required: true,
                message: '此项为必填项'
              },
            ]}
          >
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 7,
              span: 10,
            }}
          >
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}
