import { useState,useContext,createContext } from "react";

const searchContext = createContext();

 const SearchProvider = ({children})=>{
  
  const [search,setSearch] = useState({
    keywords:"",
    results:[]
  })

 

  return (
    <searchContext.Provider value={[search,setSearch]}>
    {children}
    </searchContext.Provider>
  )
}
const useSearch = () => useContext(searchContext);
export {SearchProvider,useSearch}