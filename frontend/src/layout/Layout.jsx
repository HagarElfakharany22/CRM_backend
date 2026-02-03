import React, { useContext } from "react";  
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
    const { user } = useContext(AuthContext);
 return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Topbar */}
        <Topbar user={user}/>

        {/* Page Content */}
        <main className="p-3 flex-grow-1">
         
           <Outlet /> 
        </main>
      </div>
    </div>
  );
}
