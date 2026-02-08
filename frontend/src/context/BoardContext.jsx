import axios from "axios";
import { createContext, useState } from "react";
// import Cookies from 'js-cookie';


export  let BoardContext=createContext(0)

const role = JSON.parse(localStorage.getItem("user")).role;  
     let auth;
     if(role==='admin')
     {
        auth='admin'
     }
     else{
        auth='Bearer'
     }
     console.log(auth);
async function getAllBoards(){
    
 let response=await axios.get(`http://localhost:8000/api/v1/board/all` , {
    headers:{
        Authorization:`${auth} ${localStorage.getItem("token")}`
    }
  });
  
  return response.data;
}
export default  function BoardContextProvider({children}){
    const [BoardsData,setBoardsData]=useState();

    return <BoardContext.Provider value={{
        getAllBoards,
        BoardsData,
        setBoardsData
    }}>
        {children}
        
    </BoardContext.Provider>
}