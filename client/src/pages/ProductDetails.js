import {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
 const params = useParams()
 const [product,setProduct] = useState({});



 const getProductDetails = async()=>{
   try{
    const res = await axios.get(`${process.env.REACT_APP_PORT}/get-product/${params.slug}`);
    setProduct(res.data.singleProduct)
   }
   catch(err){
      console.log(err)
   }
 }

 useEffect(()=>{
   if(params?.slug){getProductDetails()}
 },[params?.slug])


 return (
   <>
   {/* <div>{JSON.stringify(product._id)}</div> */}
   <div className='row container'>
     <div className='col-md-5 mt-5'>
     <img  src={``}
      className="card-img-top"
       alt={product.name}
       height="300"
       width={"350px"}/>
     </div>
     <div className='col-md-4 mt-5'>
      <h1 className="text-center">Product Details</h1>
     <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            ₹{product?.price}
          </h6>
          <h6>Category : {product?.category}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
      <hr />
      </div>
        </div>
 </>)
}

export default ProductDetails