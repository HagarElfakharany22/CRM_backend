import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TaskContext = createContext();

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
     
      const res = await axios.get('http://localhost:8000/api/v1/task/all', {
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
     
      const res = await axios.put(`http://localhost:8000/api/v1/task/edit/${taskId}`, updatedData,{
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
     
      const res = await axios.delete(`http://localhost:8000/api/v1/task/delete/${taskId}`,{
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
     
      const res = await axios.delete(`http://localhost:8000/api/v1/task/add`,{
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
