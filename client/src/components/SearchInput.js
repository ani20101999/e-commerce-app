import React from 'react'
import { useSearch } from '../contextApi.js/searchContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate()
     const [search,setSearch] = useSearch();

 const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
    const res = await axios.get(`${process.env.REACT_APP_PORT}/search/${search.keywords}`)
    setSearch({...search,results:res.data});
    navigate("/search")
    }
    catch(err){
        console.log(err);
    } 
 }

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
  <input className="form-control me-2"
   type="search"
    placeholder="Search"
    aria-label="Search" 
    onChange={(e)=>setSearch({...search,keywords:e.target.value})}
    value={search.keywords}/>
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

  )
}

export default SearchInput