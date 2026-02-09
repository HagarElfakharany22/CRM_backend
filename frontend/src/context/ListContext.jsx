import { createContext, useState } from "react";
import api from "./baseURL.jsx";

export let ListContext= createContext(0);
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
async function getListsByBoardId(id) {
    let response= await api.get(`/api/v1/list/by-board-id/${id}` , {
        headers:{
       Authorization:`${auth} ${localStorage.getItem("token")}`
    }
    });
    console.log(response?.data);
    
    return response?.data
}
export default function ListContextProvider({children}){
    return <ListContext.Provider value={{
        getListsByBoardId
    }}>
        {children}
    </ListContext.Provider>
}