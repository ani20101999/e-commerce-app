import {useState,useEffect} from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../../contextApi.js/authContext'
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const {Option} = Select;

const SelectProduct = () => {
const navigate = useNavigate()

const [categories,setCategories] = useState([]);
const [photo,setPhoto] = useState("")
const [name,setName] =useState("");
const [description,setDescription] =useState("");
const [price,setPrice] =useState("");
const [category,setCategory] = useState("")
const [quantity,setQuantity] =useState("");
const [shipping,setShipping] =useState("");

const [auth] =useAuth()


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

useEffect(() => {
  getAllCategories();
}, [])


const handleCreate = async(e)=>{
  e.preventDefault();
  try{
    const productData = new FormData()
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("category",category);
      productData.append("photo",photo);
      
  const res = await axios.post(`${process.env.REACT_APP_PORT}/create-product` ,productData,
  {headers:{
    Authorization:`${auth?.token}`
  }})

  if(res.data.success){
    toast.success("product created successfully");
    navigate("/dashboard/admin/products");
  }
  else{
    toast.error(res.data?.message)
  }
  }
  catch(err){
    console.log(err)
    toast.error("something went wrong");
  }
}

  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
     <div className='col-md-3'>
       <AdminMenu/>
     </div>
     <div className='col-md-9'>
      <div className='card w-75 p-3'>
        <h1 className='text-center'>Create Product</h1>
      <Select bordered={false}
      placeholder="select a category"
      showSearch
      className='form-select mb-3'
      onChange={(value)=>setCategory(value)}>
        {
          categories?.map(cat=>(
            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
          ))
        }
      </Select>
      <div className='mb-3'>
       <label className='btn btn-dark'>
       {photo?photo.name:"upload photo"}
       <input type="file" name='photo' accept="image/*"
        onChange={(e)=>setPhoto(e.target.files[0])}
        hidden />
       </label>
      </div>
       <div className='mb-3'>
        {photo && (
          <div className='text-center'>
            <img src={URL.createObjectURL(photo)} 
            alt='product-img'
             height={"200px"} 
             className='img img-responsive'/>
          </div>
        )}
       </div>

       <div className='mb-3'>
        <input className='form-control'
        type="text"
        name='name'
        placeholder='Enter your product name'
        value={name}
        onChange={(e)=>setName(e.target.value)}/>
       </div>

       <div className='mb-3'>
       <textarea className='form-control'
        rows={4} cols={50} 
        placeholder='enter product description'
        value={description}
         onChange={(e)=>setDescription(e.target.value)}
         />
       </div>

       <div className='mb-3'>
        <input className='form-control'
        type="number"
        name='price'
        placeholder='Enter your product price'
        value={price}
        onChange={(e)=>setPrice(e.target.value)}/>
       </div>
        
       <div className='mb-3'>
        <input className='form-control'
        type="number"
        name='quantity'
        placeholder='Enter your product quantity'
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}/>
       </div>

       <div className='mb-3'>
       <Select bordered={false}
      placeholder="shipping availability"
      showSearch
      className='form-select mb-3'
      onChange={(value)=>setShipping(value)}>
       <Option value={1}>Yes</Option>
       <Option value={0}>No</Option>
      </Select>
       </div>

       <div className='mb-3'>
        <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>

       </div>
      </div>
     </div>
    </div>
   </div>
  )
}

export default SelectProduct