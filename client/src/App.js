import React from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Policy from './pages/policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/authPages/Register';
import Login from './pages/authPages/Login';
import Dashboard from './pages/user/userDashboard';
import PrivateRoute from './components/route/private';
import ForgotPassword from './pages/authPages/forgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/route/adminRoute';
import {Toaster} from "react-hot-toast"
import SelectCategory from './pages/admin/SelectCategory';
import SelectProduct from './pages/admin/SelectProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/updateProduct';
import Search from './pages/search';
import ProductDetails from './pages/ProductDetails';
import CartPages from './pages/CartPages';

function App() {
  return <>
    <Header/>
    <h1 title="my-app" style={{minHeight:"80vh"}}>
      <Toaster/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/product-details/:slug' element={<ProductDetails/>}/>
      <Route path='/cart' element={<CartPages/>}/>
      {/* private route using outlet */}
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}></Route>
      <Route path='user/orders' element={<Orders/>}></Route>
      <Route path='user/profile' element={<Profile/>}></Route>
      </Route>
      
      {/* admin route using outlet */}
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}></Route>
        <Route path='admin/create-category' element={<SelectCategory/>}></Route>
        <Route path='admin/create-product' element={<SelectProduct/>}></Route>
        <Route path='admin/products/:slug' element={<UpdateProduct/>}></Route>
        <Route path='admin/products' element={<Products/>}></Route>
        <Route path='admin/users' element={<Users/>}></Route>
      </Route>
      
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/policy' element={<Policy/>}></Route>
      <Route path='*' element={<Pagenotfound/>}></Route>
    </Routes>
    </h1>
    <Footer/>
  </>
}
export default App;
