// import { createContext, useState, useEffect } from "react";
// import { dumyData } from "../dumyData";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     if (!localStorage.getItem("users")) {
//       localStorage.setItem("users", JSON.stringify(dumyData.users));
//     }

//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }

//     setLoading(false); 
//   }, []);

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const found = users.find(
//       u => u.email === email && u.password === password
//     );

//     if (found) {
//       setUser(found);
//       localStorage.setItem("user", JSON.stringify(found));
//       return found;
//     }
//     return null;
//   };

//   const logout = (navigate) => {
//     setUser(null);
//     localStorage.removeItem("user");
//     if (navigate) navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );

// }
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true); 
 
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false); 
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("https://crmbackend-production-39b2.up.railway.app/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        return data.user; 
      } else {
        alert(data.error|| "Email or password incorrect");
        return null;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
      return null;
    }
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (navigate) navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user,loading ,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

