import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import { Link,useNavigate } from 'react-router-dom';
import { Checkbox,Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useCart } from '../contextApi.js/cart';

const Home = () => {

const navigate = useNavigate()
const [cart,setCart] = useCart()
const [products,setProducts] = useState([]);
const [categories,setCategories] = useState([]);
const [checked,setChecked] = useState([]);
const [radio,setRadio] = useState([]);

const getAllCategories = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_PORT}/get-category`);
    if (res.data.success) {
      setCategories(res.data.categories);
      // console.log(categories);
    }

  }
  catch (err) {
    console.log(err);
    toast.error("something went wrong");
  }
}

useEffect(()=>{
  getAllCategories()
},[])

const getAllProducts = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_PORT}/get-product`);
    if (res.data.success) {
      setProducts(res.data.products);
      // console.log(categories);
    }

  }
  catch (err) {
    console.log(err);
    toast.error("something went wrong");
  }
}

useEffect(()=>{
  if(checked.length===0 || !radio.length===0){
    getAllProducts()
  }
},[])

useEffect(()=>{
  if(checked.length>0 || radio.length>0){
    filterProduct()
  }
},[checked,radio])

const filterProduct = async()=>{
  const res = await axios.post(`${process.env.REACT_APP_PORT}/product-filters`,{checked,radio});
  if(res.data.success){
    setProducts(res.data?.products)
  }
}


const handleFilter = (value,id)=>{
  let all = [...checked];
  if(value){
    all.push(id);
  }
  else{
    all = all.filter(c => c!==id) //filter method creates a new array with all the elements that passes the criteria.
  }
  setChecked(all)
}


  return (
    <div className='row'>
      <div className='col-md-3' style={{marginTop:"90px"}}>
      <h4 className='text-center'>Filter By Category</h4>
      <div className='d-flex flex-column mt-3'>
      {
        categories?.map(c=>(
          <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
        ))
      }
      </div>
      <h4 className='text-center my-3'>Filter By Price</h4>
      <div className='d-flex flex-column m-3'>
        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
          {
            Prices?.map(p=>(
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))
          }
        </Radio.Group>
      </div>
      <div className='d-flex flex-column m-3'>
        <button className='btn btn-danger' onClick={()=>window.location.reload()}>Reset Filters</button>
      </div>
      </div>
      <div className='col-md-9 mt-2'>
        {/* {JSON.stringify(checked)} */}
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            
              {products?.map((p) => (
                
                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`${process.env.REACT_APP_PORT}/get-photo/${p._id}`} className="card-img-top" alt={p.name} style={{maxWidth:"150px",maxHeight:"200px",margin:"auto"}}/>
                  <div className="card-body">
                    <h5 className="card-title" style={{fontSize:"30px",fontFamily:"sans-serif"}}>{p.name}</h5>
                    <p className="card-text" style={{fontSize:"small"}}>{p.description.substring(0,30)}</p>
                    <p className="card-text" style={{fontSize:"large"}}>₹{p.price}</p>
                    
                    <button type='button' className="btn btn-primary m-2" onClick={() => navigate(`/product-details/${p.slug}`)}>More Details</button>
                    <button type='button' className="btn btn-secondary ms-1" 
                    onClick={()=>{setCart([...cart,p]);
                      localStorage.setItem("cart",JSON.stringify([...cart,p]));
                      toast.success("item added to cart successfully")
                    }}>Add To Cart</button>
                  </div>
                  </div>
               
              ))}
            
          </div>
      </div>
    </div>
  )
}

export default Home