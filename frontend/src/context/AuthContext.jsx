
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // نتأكد إن الكود على Client-side قبل الوصول لـ localStorage
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("attendanceId", data.attendanceId);
        }
        setUser(data.user);
        return data.user;
      } else {
        alert(data.error || "Email or password incorrect");
        return null;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
      return null;
    }
  };

 const logout = async (navigate) => {
  try {
    const attendanceId = localStorage.getItem("attendanceId");

    if (attendanceId) {
      await fetch(`${API_URL}/api/v1/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ attendanceId }),
      });
    }
  } catch (err) {
    console.error("Logout tracking error:", err);
  } finally {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("attendanceId"); // 👈 مهم
    }
    if (navigate) navigate("/login");
  }
};

async function getUserById (id) {
    let response= await api.get(`/api/v1/board/${id}` , {
        headers:getAuthHeader()
    })

    
    return response.data.board;
}

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

