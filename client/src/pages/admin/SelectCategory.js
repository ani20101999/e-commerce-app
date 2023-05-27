import { useState, useEffect } from 'react'
import AdminMenu from './AdminMenu'
import toast from "react-hot-toast"
import axios from "axios"
import "../styles/authStyles.css"
import CategoryForm from './categoryForm'
import { useAuth } from '../../contextApi.js/authContext'
import {Modal} from "antd"
const SelectCategory = () => {

  const [categories, setCategories] = useState([]);
  const [name,setName] = useState("")
  const [click,setClick] = useState(false)
  const [selected,setSelected] = useState(null);
  const [updatedName,setUpdatedName] =useState("");
  // const [updatedName,setUpdatedName] = useState("")
  const [auth] = useAuth()

  //handle submit

  const handleSubmit = async(e)=>{
   e.preventDefault();
    try{
     const res = await axios.post(`${process.env.REACT_APP_PORT}/create-category`,{name},
       {headers:{
        Authorization:`${auth?.token}`
       }}
     )
     if(res.data.success){
       toast.success("category created successfully");
       setName("")
       getAllCategories();
     }
     else{
      toast.error("couldnt create category")
     }
    }
    catch(err){
      console.log(err);
      toast.error("something went wrong")
    }
  }

//update categories:-

 const submitUpdateCategory = async(e)=>{
e.preventDefault();
 try{
const res = await axios.put(`${process.env.REACT_APP_PORT}/update-category/${selected}`, {name:updatedName},
{headers:{
  Authorization:`${auth?.token}`
 }})
 
 if(res.data.success){
     toast.success("category updated successfully");
     setClick(false);
     setSelected(null);
     setUpdatedName("");
     getAllCategories()
 }
}
 
 catch(err){
  toast.error("invalid request")
 }
 }

  //get all categories
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

  //delete categories:-

  const deleteCategory=async(id)=>{
   const res = await axios.delete(`${process.env.REACT_APP_PORT}/delete-category/${id}`,
   {headers:{
    Authorization:`${auth?.token}`
   }})

   if(res.data.success){
    toast.success("category removed succesfully");
    getAllCategories()
   }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
            <h1>Manage Categories</h1>
            <div className='w-75'>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
              </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                   {              
                    categories.map(cat=>(
                      <tr>
                         <td key={cat._id} className='tableFont'>{cat.name}</td>
                         <td><button className='btn btn-primary' onClick={()=>{setClick(true); setSelected(cat._id); setUpdatedName(cat.name)}}>Edit</button></td>
                         <td><button className='btn btn-danger' onClick={()=>deleteCategory(cat._id)}>Delete</button></td>
                      </tr> 
                    ))                    
                   }            
                </tbody>
              </table>

            </div>
            <Modal onCancel={()=>setClick(false)} footer={null} open={click}>
              <CategoryForm handleSubmit={submitUpdateCategory} value={updatedName} setValue={setUpdatedName}/>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectCategory