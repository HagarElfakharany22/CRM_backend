import { createContext, useContext } from "react";
import api from "./baseURL";
import { AuthContext } from "./AuthContext";


export const AttendanceContext = createContext({
  getAttendance: async () => [],
});

export const AttendanceProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    function getAuthData() {
    const token = localStorage.getItem("token");
   
    if (!token || !user) return null;
    const role = user.role || "user";
    const auth = role === "admin" ? "admin" : "Bearer";
    return { token, auth };
  }
 async function getAttendance() {
    const authData = getAuthData();
    console.log("authData",authData);
    if (!authData) return [];

    const response = await api.get('/api/v1/user/attendance', {
      headers: {
        Authorization: `${authData.auth} ${authData.token}`,
      },
    });
    console.log("response attendance", response.data.attendance);
    return response.data.attendance;
  }

  return (
    <AttendanceContext.Provider value={{ getAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};
