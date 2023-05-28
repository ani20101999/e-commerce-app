import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contextApi.js/authContext';

const ProductDetails = () => {
const [id,setId] = useAuth()

 return (
   <>
   {/* <div>{JSON.stringify(product._id)}</div> */}
   <div className='row container'>
     <div className='col-md-5 mt-5'>
     <img  src={`${process.env.REACT_APP_PORT}/get-photo/${id._id}`}
      className="card-img-top"
       alt={id.name}
       height="300"
       width={"350px"}/>
     </div>
     <div className='col-md-4 mt-5'>
      <h1 className="text-center">Product Details</h1>
     <hr />
          <h6>Name : {id.name}</h6>
          <h6>Description : {id.description}</h6>
          <h6>
            Price :
            ₹{id?.price}
          </h6>
          <h6>Category : {id?.category}</h6>
          <button className="btn btn-secondary ms-1" >ADD TO CART</button>
      <hr />
      </div>
        </div>
 </>)
}

export default ProductDetails