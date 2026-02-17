import React, { useContext } from "react";  
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import styles from './style.module.css'
export default function Layout() {
    const { user } = useContext(AuthContext);
 return (
    <div className={`${styles.layoutRoot} d-flex`} >
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className={`${styles.bg_dark} ${styles.contentColumn} flex-grow-1 d-flex flex-column`}>
        {/* Topbar */}
        <Topbar user={user}/>

        {/* Page Content */}
        <main className={`${styles.mainContent} flex-grow-1`}>
         
           <Outlet /> 
        </main>
      </div>
    </div>
  );
}
