import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const TaskContext = createContext();

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
 
  function getAuthData() {
    const token = localStorage.getItem("token");
    if (!token || !user) return null;
    const role = user.role || "user";
    const auth = role === "admin" ? "admin" : "Bearer";
    return { token, auth };
  }

  // Redirect user to login if not logged in
  useEffect(() => {
    if (!user) {
      // navigate("/login");
      console.log("not a user")
    } else {
      getTasks();
    }
  }, [user]);

  async function getTasks() {
    const authData = getAuthData();
    if (!authData) return;

    try {
      const res = await api.get("/api/v1/task/all", {
        headers: {
          Authorization: `${authData.auth} ${authData.token}`,
        },
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  async function EditTasks(taskId, updatedData) {
    const authData = getAuthData();
    if (!authData) return;

    try {
      await api.put(`/api/v1/task/edit/${taskId}`, updatedData, {
        headers: {
          Authorization: `${authData.auth} ${authData.token}`,
        },
      });
      getTasks();
    } catch (err) {
      console.error("Error editing task:", err);
    }
  }

  async function DeleteTasks(taskId) {
    const authData = getAuthData();
    if (!authData) return;

    try {
      await api.delete(`/api/v1/task/delete/${taskId}`, {
        headers: {
          Authorization: `${authData.auth} ${authData.token}`,
        },
      });
      getTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  async function AddTask(data) {
    const authData = getAuthData();
    if (!authData) return;

    try {
      console.log(data)
      const res = await api.post(`/api/v1/task/add`, data, {
        headers: {
          Authorization: `${authData.auth} ${authData.token}`,
        },
      });
      
      if (res.data.task) setTasks(prev => [...prev, res.data.task]);
      getTasks()
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, getTasks, EditTasks, DeleteTasks, AddTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
