import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
    return (
        <div className='container-fluid m-3 p-3'>
              <div className="list-group text-center">
                <h1 style={{textDecoration:"underline"}}>Admin Panel</h1>
                
                <NavLink to="/dashboard/admin/create-category" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Create Category</NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Create Product</NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Products</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item" style={{fontSize:"25px",paddingBottom:"10px",border:"none"}}>Users</NavLink>

                </div>
        </div>
    )
}

export default AdminMenu