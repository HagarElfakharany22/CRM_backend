import { createContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
export const TaskContext = createContext();
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
function getAuthData() {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) return null; 

  const user = JSON.parse(userStr);
  const role = user.role || "user";

  const auth = role === "admin" ? "admin" : "Bearer";

  return { token, auth };
}

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
 getTasks()
  }, []);
async function getTasks() {
  const authData = getAuthData();
  if (!authData) return; // ما فيش login → نعمل return

  try {
    const res = await api.get("/api/v1/task/all", {
      headers: {
        Authorization: `${authData.auth} ${authData.token}`,
      },
    });
    setTasks(res.data.tasks);
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
    await api.post(`/api/v1/task/add`, data, {
      headers: {
        Authorization: `${authData.auth} ${authData.token}`,
      },
    });
    getTasks();
  } catch (err) {
    console.error("Error adding task:", err);
  }
}
  return (
    <TaskContext.Provider value={{ tasks, setTasks,getTasks,EditTasks,DeleteTasks,AddTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
