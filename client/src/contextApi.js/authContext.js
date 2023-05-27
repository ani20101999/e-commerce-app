import { useState,useEffect,useContext,createContext } from "react";

const authContext = createContext();

 const AuthProvider = ({children})=>{
  
  const [auth,setAuth] = useState({
    user:null,
    token:""
  })

  useEffect(()=>{
    const data = localStorage.getItem(auth);
    if(data){
        const parsedData = JSON.parse(data);
        setAuth({
            ...auth,
            user:parsedData.user,
            token:parsedData.token
        })
    }
  },[auth]);

  return (
    <authContext.Provider value={[auth,setAuth]}>
    {children}
    </authContext.Provider>
  )
}
const useAuth = () => useContext(authContext);
export {AuthProvider,useAuth}