import React, { useContext, useEffect, useState } from 'react'
import { AttendanceContext } from '../context/AttendenceContext'

export default function Reports() {
  const { getAttendance } = useContext(AttendanceContext)
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAttendance().then(setAttendance);
    // console.log(attendance)
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      {attendance.map(a => (
        <div key={a._id}>
          <span>{a.user.name}</span> - <span>{a.loginAt}</span> - <span>{a.logoutAt || "Still logged in"}</span>
        </div>
      ))}
    </div>
  );
}
