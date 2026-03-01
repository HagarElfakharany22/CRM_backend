import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "./baseURL.jsx";


export const LeadsContext = createContext();


const LeadsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

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

  function getAuthData() {
    const token = localStorage.getItem("token");

    if (!token || !user) return null;
    const role = user.role || "user";
    const auth = role === "admin" ? "admin" : "Bearer";
    return { token, auth };
  }

  async function getAllLeads(){
    
 let response=await api.get(`/api/v1/lead/all` , {
    headers:getAuthHeader()
  });
  console.log('get all Leads');
  
  console.log(response.data);
  
  
  return response.data;
}

  async function getLeadsByUserId(){
    
 let response=await api.get(`/api/v1/lead/by-user-id` , {
    headers:getAuthHeader()
  });
  console.log('get Leads By User Id');
  
  console.log(response.data);
  
  
  return response.data;
}
async function deleteLead(id) {
    let response= await api.delete(`/api/v1/lead/delete/${id}` , {
        headers:getAuthHeader()
    });
    console.log(response?.data);
    
    return response?.data
}
async function updateLead(id , data) {
    console.log(data);
    
    let response= await api.put(`/api/v1/lead/update/${id}` , data , {
        headers:getAuthHeader()
    });
    console.log(response?.data);
    
    return response?.data
}
async function createLead(data){
    let response= await api.post('/api/v1/lead/create' , data , {
          headers:getAuthHeader()
    })
    console.log(response);
    return response.data;
}
  return (
    <LeadsContext.Provider
      value={{
       getAllLeads,
       getLeadsByUserId,
       user,
       deleteLead,
       updateLead,
       createLead
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export default LeadsProvider;
