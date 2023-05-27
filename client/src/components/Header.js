import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from '../contextApi.js/authContext';
import toast from "react-hot-toast"
import SearchInput from './SearchInput';
import { useCart } from '../contextApi.js/cart';
import { Badge } from 'antd';

const Header = () => {

  const [auth, setAuth] = useAuth();
  const [cart] = useCart()

  const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("logout successful")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><FaShoppingBag />&nbsp;Ecommerce App</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className='nav-item'>
              <SearchInput/>
              </li>
              
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>


              {
                !auth.user ? (
                  <>

                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                  </>

                ) : (

                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                       <li><NavLink to={`/dashboard/${auth?.user?.role===true ? "admin":"user"}`} className="nav-link">Dashboard</NavLink></li>
                       <li><NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink></li> 
                    </ul>
                  </li>


                )
              }
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>

            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header