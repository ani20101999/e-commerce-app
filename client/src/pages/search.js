import React from 'react'
import { useSearch } from '../contextApi.js/searchContext'
import { Link } from 'react-router-dom';

const Search = () => {
    const [search,setSearch] = useSearch();
  return (
    <div className='container'>
        <div className='text-center'>
            <h1>Search Results</h1>
            <h4>{search?.results.length < 1?"No ProductsFound" :`Found ${search?.results.length}`}</h4>
        </div>
        <div className='d-flex flex-wrap'>
            
              {search.results?.map((p) => (
                <Link to={`/dashboard/admin/products/${p.slug}`} key={p._id} className='product-link'>
                <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                  <img src={`${process.env.REACT_APP_PORT}/get-photo/${p._id}`} className="card-img-top" alt={p.name} style={{maxWidth:"150px",maxHeight:"200px",margin:"auto"}}/>
                  <div className="card-body">
                    <h5 className="card-title" style={{fontSize:"30px",fontFamily:"sans-serif"}}>{p.name}</h5>
                    <p className="card-text" style={{fontSize:"small"}}>{p.description.substring(0,30)}</p>
                    <p className="card-text" style={{fontSize:"large"}}>₹{p.price}</p>
                    <button type='button' className="btn btn-primary m-2">More Details</button>
                    <button type='button' className="btn btn-secondary">Add To Cart</button>
                  </div>
                  </div>
                </Link>
              ))}
            
          </div>
    </div>
  )
}

export default Search
