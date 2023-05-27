import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className='container-fluid m-3 p-3'>
    <div className="list-group text-center">
      <h1 style={{textDecoration:"underline"}}>User Panel</h1>
      
      <NavLink to="/dashboard/user/profile" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Profile</NavLink>
      <NavLink to="/dashboard/user/orders" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Orders</NavLink>
      

      </div>
</div>
  )
}

export default UserMenu