import axios from "axios";
import { createContext, useState } from "react";
// import Cookies from 'js-cookie';


export  let BoardContext=createContext(0)

async function getAllBoards(){
  return axios.get(`http://localhost:8000/api/v1/board/all` , {
    headers:{
        Authorization:`admin ${localStorage.getItem("token")}`
    }
  });
}
export default  function BoardContextProvider({children}){
    return <BoardContext.Provider value={{
        getAllBoards
    }}>
        {children}
        
    </BoardContext.Provider>
}