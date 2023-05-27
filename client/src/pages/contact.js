import React from 'react'
import {MdOutlineMarkEmailRead,MdPhoneCallback,MdSupportAgent} from "react-icons/md"
const Contact = () => {
  return (
    <div className='row contact-us'>
      <div className='col-md-6'>
        <img src='\images\images (1).jfif' alt='contact-us' style={{width:"80%",margin:"80px"}}/>
      </div>
       <div className='col-md-4 contact'>
        <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
        <p className="info">
          any query or info about product feel free to call 24x7 available.
        </p>
        <p className='mt-3 info'><MdOutlineMarkEmailRead/> : emailinfo@gmail.com</p>
        <p className='mt-3 info'><MdPhoneCallback/> : 012-45678</p>
        <p className='mt-3 info'><MdSupportAgent/> : 100-002-005</p>
       </div>
    </div>
  )
}

export default Contact