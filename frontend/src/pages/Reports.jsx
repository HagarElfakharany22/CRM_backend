import React, { useContext, useEffect, useState } from 'react'
import { AttendanceContext } from '../context/AttendenceContext'
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css'
export default function Reports() {
  const { toggleSidebar } = useOutletContext(); 
  const { getAttendance } = useContext(AttendanceContext);

    const [attendance, setAttendance] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // 🔹 نجيب حالة اليوزر الحالية
  // useEffect(() => {
  //   fetch("/api/v1/user/attendance/status")
  //     .then((res) => res.json())
  //     .then((data) => setIsCheckedIn(data.isCheckedIn));
  // }, []);
  useEffect(() => {
    getAttendance().then(setAttendance);
    console.log(attendance)
  }, []);
  // 🔹 نجيب الريكوردز


  // useEffect(() => {
  //   getAttendance().then(setAttendance);
  //   // console.log(attendance)
  // }, []);

  return (
    <div className={`container-fluid py-4 bg-light min-vh-100 ${styles.bg_gredient}`}>
    <i class={`${styles.toggle_btn} fa-solid fa-bars me-3 fs-2 mb-3 text-light`}
            onClick={toggleSidebar}
          ></i>
      <h2 className="mb-3 fw-bold text-light">Attendance Records</h2>

      {/* 🔘 زرار ذكي */}
      

      <div className={`card shadow-sm border-0 overflow-hidden  ${styles.card}`}>
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-white border-bottom">
            <tr>
              <th className="ps-4 py-3 text-uppercase small fw-bold text-muted">
                Name
              </th>
              <th
                className="ps-4 py-3 text-uppercase small fw-bold"
                style={{ color: "#478778" }}
              >
                In
              </th>
              <th
                className="ps-4 py-3 text-uppercase small fw-bold"
                style={{ color: "red" }}
              >
                Out
              </th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a) => (
              <tr key={a._id} className="task-row">
                <td
                  className="ps-4 py-3"
                  style={{ color: "#4682B4", fontWeight: "bold" }}
                >
                  {a.user?.name}
                </td>

                {/* ✅ checkInAt */}
                <td className="ps-4 py-3">
                  {new Date(a.checkInAt).toLocaleString()}
                </td>

                {/* ✅ checkOutAt */}
                <td className="ps-4 py-3">
                  {a.checkOutAt ? (
                    new Date(a.checkOutAt).toLocaleString()
                  ) : (
                    <span className="text-success fw-semibold">
                      Still working
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
