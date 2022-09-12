import React from 'react'
import './sandbox.scss'
import CommonSider from '../../components/commonsider/CommonSider'
import {Outlet} from 'react-router-dom'
import {  Layout, } from 'antd';
import CommonHeader from '../../components/commonheader/CommonHeader';
const {  Content, Footer } = Layout;
export default function SandBox() {
  return (
    <div>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <CommonSider />
        <Layout className="site-layout">
          <CommonHeader/>
          <Content
            
          >
            
            <div>
             <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}
