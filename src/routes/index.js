import Login from '../views/login/Login'
import SandBox from '../views/sandbox/SandBox'
import {Navigate} from 'react-router-dom'
import Home from '../views/sandbox/home/Home'
import Product from '../views/sandbox/product/Product'
import Category from '../views/sandbox/category/Category'
import Order from '../views/sandbox/order/Order'
import User from '../views/sandbox/user/User'
import ProductEditor from '../views/sandbox/product/producteditor/ProductEditor'
import ProductDetail from '../views/sandbox/product/productdetail/ProductDetail'
import CategoryList from '../views/sandbox/category/categorylist/CategoryList'
import OrderDetail from '../views/sandbox/order/orderdetail/OrderDetail'
import NotFound from '../views/sandbox/notfound/NotFound'
const routes=[
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/sandbox',
        element:<SandBox/>,
        children:[
            {
                path:'/sandbox/home',
                element:<Home/>
            },
            {
                path:'/sandbox/product',
                element:<Product/>
            },
            {
                path:'/sandbox/product/editor/:id',
                element:<ProductEditor/>
            },
            {
                path:'/sandbox/product/editor',
                element:<ProductEditor/>
            },
            {
                path:'/sandbox/product/detail/:id',
                element:<ProductDetail/>
            },
            {
                path:'/sandbox/category',
                element:<Category/>
            },
            {
                path:'/sandbox/category/list/:id',
                element:<CategoryList/>
            },
            {
                path:'/sandbox/order',
                element:<Order/>
            },
            {
                path:'/sandbox/order/detail/:id',
                element:<OrderDetail/>
            },
            {
                path:'/sandbox/user',
                element:<User/>
            },
            {
                path:'/sandbox/*',
                element:<NotFound/>
            },
            {
                path:'/sandbox/',
                element:<Navigate to='home'/>
            }
        ]
    },
    {
        path:'/*',
        element:<Navigate to='login'/>
    }
]
export default routes