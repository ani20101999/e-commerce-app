import { useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contextApi.js/authContext";
import "../styles/authStyles.css"

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
   
   const [email,setEmail] = useState("");
   const [newPassword,setNewPassword] = useState("");
   const [answer,setAnswer] = useState("");
   
   const submitData=async(e)=>{
    e.preventDefault();
   //  console.log(name,email,password,phone,address)
   try{
    const res = await axios.post(`${process.env.REACT_APP_PORT}/forgot-password`,{email,newPassword,answer});
   
    if(res.data.success){
       toast.success(res.data.message);
       setAuth({
         ...auth,
         user:res.data.user,
         token:res.data.token
       })
       localStorage.setItem("auth",JSON.stringify(res.data));
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
    
    <div className="mb-3 heading">RESET PASSWORD</div>
 
 <div className="mb-3">
   <input type="email" className="form-control"  placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
 </div>

 <div className="mb-3">
   <input type="text" className="form-control"  placeholder='enter your answer' value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
 </div>

 <div className="mb-3">
   <input type="password" className="form-control"  placeholder='enter your new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
 </div>

 <span onClick={()=>navigate("/forgot-password")} style={{fontSize:"medium",cursor:"pointer"}}>Forgot Password?</span> 

<div className="btn-container">
 <button type="submit" className="btn1 btn-primary">RESET</button>
 </div>
</form>
   </div>
  )
}

export default ForgotPassword