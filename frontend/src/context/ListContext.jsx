import { createContext, useState } from "react";
import api from "./baseURL.jsx";

export let ListContext= createContext(0);
function getAuthHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token) return {};

  const role = user?.role;
  const authType = role === "admin" ? "admin" : "Bearer";

  return {
    Authorization: `${authType} ${token}`,
  };
}
async function getListsByBoardId(id) {
    let response= await api.get(`/api/v1/list/by-board-id/${id}` , {
        headers:getAuthHeader()
    });
    console.log(response?.data);
    return response?.data?.lists || []
}

async function deleteList(id) {
    let response= await api.delete(`/api/v1/list/delete/${id}` , {
        headers:getAuthHeader()
    });
    console.log(response?.data);
    
    return response?.data
}
async function updateList(id , data) {
    console.log(data);
    
    let response= await api.put(`/api/v1/list/update/${id}` , data , {
        headers:getAuthHeader()
    });
    console.log(response?.data);
    
    return response?.data
}

async function createList(data){
    let response= await api.post('/api/v1/list/add' , data , {
          headers:getAuthHeader()
    })
    console.log(response);
    return response.data;
}
export default function ListContextProvider({children}){
    return <ListContext.Provider value={{
        getListsByBoardId,
        createList,
        deleteList,
        updateList
    }}>
        {children}
    </ListContext.Provider>
}