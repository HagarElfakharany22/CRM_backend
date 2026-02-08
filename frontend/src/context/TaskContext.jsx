import { createContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
export const TaskContext = createContext();
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
 getTasks()
  }, []);
async function getTasks() {
    try {
      const token = localStorage.getItem("token");
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
     
      const res = await api.get('/api/v1/task/all', {
        headers: {
         Authorization: `${auth} ${token}`
        }
      });
      setTasks(res.data.tasks); 
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }
  async function EditTasks(taskId,updatedData) {
    console.log(taskId);
    
    try {
      const token = localStorage.getItem("token");
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
     
      const res = await api.put(`/api/v1/task/edit/${taskId}`, updatedData,{
        headers: {
         Authorization: `${auth} ${token}`
        }
      });
      setTasks(res.data.tasks); 
      getTasks()
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }
  async function DeleteTasks(taskId) {
    try {
      const token = localStorage.getItem("token");
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
     
      const res = await api.delete(`/api/v1/task/delete/${taskId}`,{
        headers: {
         Authorization: `${auth} ${token}`
        }
      });
      setTasks(res.data.tasks); 
      getTasks()
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }
  async function AddTask() {
    try {
      const token = localStorage.getItem("token");
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
     
      const res = await api.delete(`/api/v1/task/add`,{
        headers: {
         Authorization: `${auth} ${token}`
        }
      });
      setTasks(res.data.tasks); 
      getTasks()
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }
  return (
    <TaskContext.Provider value={{ tasks, setTasks,getTasks,EditTasks,DeleteTasks,AddTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
