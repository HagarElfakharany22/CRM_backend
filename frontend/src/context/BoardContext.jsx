import { createContext, useState } from "react";
import api from "./baseURL.jsx";


export  let BoardContext=createContext(0)

const role = JSON.parse(localStorage.getItem("user"))?.role;  
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
    
 let response=await api.get(`/api/v1/board/all` , {
    headers:{
       Authorization:`${auth} ${localStorage.getItem("token")}`
    }
  });
  
  return response.data;
}
async function addBoard(data){
    console.log(data);
    
    let response=await api.post('/api/v1/board/add' , data , {
    headers:{
        Authorization:`${auth} ${localStorage.getItem("token")}`
    }});
    console.log(response);
    
    return response.data;
}

async function getBoardByItsId (id) {
    let response= await api.get(`/api/v1/board/${id}` , {
        headers:{
        Authorization:`${auth} ${localStorage.getItem("token")}`
    }
    })

    
    return response.data.board;
}

async function addUserToBoard(id , email){
    let response= await api.put(`/api/v1/board/by-email/${id}` , {email} , {
        headers:{
        Authorization:`${auth} ${localStorage.getItem("token")}`
    }
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
        addUserToBoard
    }}>
        {children}
        
    </BoardContext.Provider>
}