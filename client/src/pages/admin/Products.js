import React, { useState, useEffect } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {

  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PORT}/get-product`);
      setProducts(res.data.products)
    }
    catch (err) {
      console.log(err);
      toast.error("something went wrong")
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Products List</h1>
          <div className='d-flex flex-wrap'>
            {products?.map(p => (
              <Link to={`/dashboard/admin/products/${p.slug}`} key={p._id} className='product-link'>
              <div className="card m-2" style={{ width: '13rem' }} key={p._id}>
                <img src={`${process.env.REACT_APP_PORT}/get-photo/${p._id}`} className="card-img-top" alt={p.name} style={{maxWidth:"200px",maxHeight:"230px"}}/>
                <div className="card-body">
                  <h5 className="card-title" style={{fontSize:"30px"}}>{p.name}</h5>
                  <p className="card-text" style={{fontSize:"small"}}>{p.description}</p>
                  <p className="card-text" style={{fontSize:"large"}}>₹{p.price}</p>
                </div>
              </div>
              </Link>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Products