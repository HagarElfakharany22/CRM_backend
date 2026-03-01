import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useContext(AuthContext);
console.log("Allowed roles:", roles);
console.log("User role:", user?.role);
 
  if (loading) return null; 

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;


}
