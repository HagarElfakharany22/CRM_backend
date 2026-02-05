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
      const token = localStorage.getItem("user");
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
  return (
    <TaskContext.Provider value={{ tasks, setTasks,getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
