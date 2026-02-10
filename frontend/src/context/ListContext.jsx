import { createContext, useState } from "react";
import api from "./baseURL.jsx";

export let ListContext= createContext(0);
const role = JSON.parse(localStorage.getItem("user"))?.role;  
     let auth;
     if(role==='admin')
     {
        auth='admin'
     }
     else{
        auth='Bearer'
     }
async function getListsByBoardId(id) {
    let response= await api.get(`/api/v1/list/by-board-id/${id}` , {
        headers:{
       Authorization:`${auth} ${localStorage.getItem("token")}`
    }
    });
    console.log(response?.data);
    
    return response?.data?.lists
}

async function createList(data){
    let response= await api.post('/api/v1/list/add' , data , {
          headers:{
       Authorization:`${auth} ${localStorage.getItem("token")}`
    }
    })
    console.log(response);
    return response.data;
}
export default function ListContextProvider({children}){
    return <ListContext.Provider value={{
        getListsByBoardId,
        createList
    }}>
        {children}
    </ListContext.Provider>
}