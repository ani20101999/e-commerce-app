import {useEffect, useState} from 'react'
import UserMenu from './UserMenu'
import {useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/authStyles.css"
import { useAuth } from "../../contextApi.js/authContext";

const Profile = () => {
  const navigate = useNavigate()
  const [auth] = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");

useEffect(()=>{
 setName(auth?.user.name);
 setEmail(auth?.user.email);
 setPassword(auth?.user.password)
 setPhone(auth?.user.phone);
 setAddress(auth?.user.address)
},[auth?.user])



  const submitData=async(e)=>{
    e.preventDefault();
    //  console.log(name,email,password,phone,address)
    try{
     const res = await axios.put(`${process.env.REACT_APP_PORT}/update`,{
        name,email,password,phone,address},
        {
          headers:{
            Authorization:auth?.token
          }
        });
     if(res.data.success){
        toast.success(res.data.message);
        navigate("/")
     }
     else{
        toast.error(res.data.message);
     }
    }
    catch(err){
        console.log(err);
        toast.error("something went wrong")
    }
    }
  

  return (
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
     <div className='col-md-3'>
       <UserMenu/>
     </div>
     <div className='col-md-9'>
     <div className='register'>
     <form className='info form' onSubmit={submitData}>
     
     <div className="mb-3 heading">USER PROFILE</div>
  <div className="mb-3">
    <input type="text" className="form-control"  placeholder='enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
  </div>

  <div className="mb-3">
    <input type="email" className="form-control"  placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div>

  <div className="mb-3">
    <input type="password" className="form-control"  placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>

  <div className="mb-3">
    <input type="number" className="form-control"  placeholder='enter your phone no.' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
  </div>

  <div className="mb-3">
    <input type="text" className="form-control"  placeholder='enter your address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
  </div>
  

 <div className="btn-container">
  <button type="submit" className="btn1 btn-primary">UPDATE</button>
  </div>
</form>
    </div>
       
      </div>
     </div>
    </div>
  )
}

export default Profile