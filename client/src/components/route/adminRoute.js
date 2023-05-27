import React, { useState,useEffect } from 'react'
import { useAuth } from '../../contextApi.js/authContext';
import axios from 'axios';
import { Outlet} from 'react-router-dom';

const AdminRoute = () => {
  

    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_PORT}/admin-route`,{
            headers:{
                Authorization:auth?.token
            }
        })
        if(res.data.ok){
            setOk(true);
            
        }
        else{
            setOk(false);
        }};
        if(auth?.token){
         authCheck()
        }
    },[auth?.token])
  return ok ? <Outlet/> : <span>please login</span>
}

export default AdminRoute