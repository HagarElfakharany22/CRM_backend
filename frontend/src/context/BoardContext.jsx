import { createContext, useState } from "react";
import api from "./baseURL.jsx";


export  let BoardContext=createContext(0)

// const role = JSON.parse(localStorage.getItem("user"))?.role;  
//      let auth;
//      if(role==='admin')
//      {
//         auth='admin'
//      }
//      else{
//         auth='Bearer'
//      }
//      console.log(auth);
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
async function getAllBoards(){
    
 let response=await api.get(`/api/v1/board/all` , {
    headers:getAuthHeader()
  });
  console.log(response.data);
  
  
  return response.data;
}
async function addBoard(data){
    console.log(data);
    
    let response=await api.post('/api/v1/board/add' , data , {
    headers:getAuthHeader()});
    console.log(response);
    
    return response.data;
}

async function getBoardByItsId (id) {
    let response= await api.get(`/api/v1/board/${id}` , {
        headers:getAuthHeader()
    })

    
    return response.data.board;
}

async function deleteBoardByItsId (id) {
    let response= await api.delete(`/api/v1/board/delete/${id}` , {
        headers:getAuthHeader()
    })
    console.log(response.data);
    return response.data;
}

async function addUserToBoard(id , email){
    let response= await api.put(`/api/v1/board/by-email/${id}` , {email} , {
        headers:getAuthHeader()
    })
    console.log(response.data);
    
    return response.data;
}

async function updateBoard(id , data){
    let response= await api.put(`/api/v1/board/update/${id}` ,data , {
        headers:getAuthHeader()
    })
    console.log(response.data);
    
    return response.data;
}
export default  function BoardContextProvider({children}){
    const [BoardsData,setBoardsData]=useState();

    return <BoardContext.Provider value={{
        getAllBoards,
        BoardsData,
        setBoardsData,
        addBoard,
        getBoardByItsId,
        addUserToBoard,
        deleteBoardByItsId,
        updateBoard
    }}>
        {children}
        
    </BoardContext.Provider>
}