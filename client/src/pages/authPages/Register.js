import { useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/authStyles.css"


const Register = () => {
const navigate = useNavigate();


const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [phone,setPhone] = useState("");
const [address,setAddress] = useState("");
const [answer,setAnswer] = useState("");

const submitData=async(e)=>{
 e.preventDefault();
//  console.log(name,email,password,phone,address)
try{
 const res = await axios.post(`${process.env.REACT_APP_PORT}/register`,{
    name,email,password,phone,address,answer});
 if(res.data.success){
    toast.success(res.data.message);
    navigate("/login")
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
    <div className='register'>
     <form className='info form' onSubmit={submitData}>
     
     <div className="mb-3 heading">REGISTRATION FORM</div>
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

  <div className="mb-3">
    <input type="text" className="form-control"  placeholder='enter your favourite sports' value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
  </div>
  

 <div className="btn-container">
  <button type="submit" className="btn1 btn-primary">REGISTER</button>
  </div>
</form>
    </div>
  )
}

export default Register