import React, { useEffect, useState } from "react";
import "./home.scss";
import { Row, Col, Card } from "antd";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function Home() {
  const [list, setList] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("/api/manage/statistic/base_count.do").then((res) => {
      if (res.status === 200) {
        const obj = res.data.data;
        const arr = []
        for (let i in obj) {
          var item = { title: i, num: obj[i] };
          arr.push(item)
        }
        setList(arr)

      }
    })
  }, []);
  const navigateTo=(title)=>{
    navigate(title==='userCount'?'/sandbox/user':title==='productCount'?'/sandbox/product':'/sandbox/order')
  }


  return (
    <div className="home">
      <Row className="row">
        {
          list.map((item) => {
            return (
              <Col span={8} key={item.title} onClick={()=>navigateTo(item.title)}>
                <Card
                  title={item.title==='userCount'?'用户总数':item.title==='productCount'?'商品总数':'订单数'}
                  bordered={false}
                  hoverable='true'
                >
                  <p className="num">{item.num.toLocaleString()}</p>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  );
}
