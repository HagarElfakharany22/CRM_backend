import React from 'react'
import CheckBtn from './CheckBtn'
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css'
export default function Attendance() {
  const { toggleSidebar } = useOutletContext();
  return (
    <div className='p-4 vh-100'>
      <i class={`${styles.toggle_btn} ${styles.toggle_btn_laptop_screen} mb-3 fa-solid fa-bars me-3 fs-2 text-light `}
                  onClick={toggleSidebar}
                ></i>
      <div className='d-flex justify-content-center align-items-center h-75 '>
        <CheckBtn/>
      </div>
    </div>
  )
}
