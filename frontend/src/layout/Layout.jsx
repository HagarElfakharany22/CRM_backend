import React, { useContext, useState } from "react";  
import Sidebar from './sidebar/Sidebar'
import Topbar from './topbar/Topbar'
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import styles from './style.module.css'
export default function Layout() {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
 return (
    <div className={`${styles.layoutRoot} d-flex`} >
      {/* Sidebar */}
      <Sidebar user={user} isOpen={isOpen} toggleSidebar={toggleSidebar}/>

      {/* Main Content */}
      <div className={`${styles.bg_dark} ${styles.contentColumn} flex-grow-1 d-flex flex-column`}>
        {/* Topbar */}
        <Topbar user={user}/>

        {/* Page Content */}
        <main className={`${styles.mainContent} flex-grow-1`}>
         <button
          className="btn btn-dark m-2 d-md-none"
          onClick={toggleSidebar}
        >
          ☰
        </button>
           <Outlet /> 
        </main>
      </div>
    </div>
  );
}
