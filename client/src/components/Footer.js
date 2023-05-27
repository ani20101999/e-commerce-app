import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-dark text-light Footer'>
            <h4 className='text-center'>All Right Reserved &copy; Ecommerce </h4>
            <p className='text-center mt-3'>
                <Link to="/about" className='link'>About us</Link>|
                <Link to="/contact" className='link'>Contact us</Link>|
                <Link to="/policy" className='link'>Policy</Link>
            </p>
        </div>
    )
}

export default Footer