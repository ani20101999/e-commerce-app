import { useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/authStyles.css"
import { useAuth } from "../../contextApi.js/authContext";

const Login = () => {
  
 const navigate = useNavigate();
 const [auth,setAuth] = useAuth();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const submitData=async(e)=>{
 e.preventDefault();
//  console.log(name,email,password,phone,address)
try{
 const res = await axios.post(`${process.env.REACT_APP_PORT}/login`,{email,password});

 if(res.data.success){
    toast.success(res.data.message);
    setAuth({
      ...auth,
      user:res.data.user,
      token:res.data.token
    })
    localStorage.setItem("auth",JSON.stringify(res.data));
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
    <div className='register'>
     <form className='info form' onSubmit={submitData}>
     
     <div className="mb-3 heading">LOGIN FORM</div>
  
  <div className="mb-3">
    <input type="email" className="form-control"  placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div>

  <div className="mb-3">
    <input type="password" className="form-control"  placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>

  <span onClick={()=>navigate("/forgot-password")} style={{fontSize:"medium",cursor:"pointer"}}>Forgot Password?</span> 

 <div className="btn-container">
  <button type="submit" className="btn1 btn-primary">LOGIN</button>
  </div>
</form>
    </div>
  )
}

export default Login