import axios from "axios";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";    

export const BoardContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;
 
// helper function to get token & auth type
function getAuthData(user) {
  const token = localStorage.getItem("token");
  if (!token || !user) return null;

  const role = user.role || "user";
  const auth = role === "admin" ? "admin" : "Bearer";
  return { token, auth };
}
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
export default function BoardContextProvider({ children }) {
  const [BoardsData, setBoardsData] = useState([]);
  const { user } = useContext(AuthContext);

  // Fetch all boards
  async function getAllBoards() {
    const authData = getAuthData(user);
    if (!authData) return null; 

    try {
      const response = await axios.get(`${API_URL}/api/v1/board/all`, {
        headers: {
          Authorization: `${authData.auth} ${authData.token}`,
        },
      });

      setBoardsData(response.data.boards || []); 
      return response.data;
    } catch (err) {
      console.error("Error fetching boards:", err);
      return null;
    }
  }

  return (
    <BoardContext.Provider
      value={{
        getAllBoards,
        BoardsData,
        setBoardsData,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
