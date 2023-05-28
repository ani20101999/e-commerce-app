import { useState,useEffect,useContext,createContext } from "react";

const authContext = createContext();

 const AuthProvider = ({children})=>{
  
  const [auth,setAuth] = useState({
    user:null,
    token:""
  })

  useEffect(()=>{
    const data = localStorage.getItem("auth");
    if(data){
        const parsedData = JSON.parse(data);
        setAuth({
            ...auth,
            user:parsedData.user,
            token:parsedData.token
        })
    }
  },[]);

  const [id,setId] = useState({
    _id:"",
    name:"",
    price:"",
    description:"",
    category:""
  });

  useEffect(()=>{
    const data = localStorage.getItem("id");
    if(data){
      const parseData = JSON.parse(data);
      setId({
        ...id,
        _id:parseData._id,
        name:parseData.name,
        price:parseData.price,
        description:parseData.description,
        category:parseData.category
      })
    }
  },[])

  return (
    <authContext.Provider value={[auth,setAuth,id,setId]}>
    {children}
    </authContext.Provider>
  )
}
const useAuth = () => useContext(authContext);
export {AuthProvider,useAuth}