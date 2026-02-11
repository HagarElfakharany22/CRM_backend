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
    <div className='container-fluid py-4 bg-light min-vh-100'>
      <h2 className='mb-1 fw-bold text-dark'> Attendance Records</h2>
      <div className='card shadow-sm border-0 overflow-hide'>
        <table className='table table-hover align middle mb-0'>
          <style>
            {`
                .task-row {
                  transition: background-color 0.2s;
                }
                .task-row:hover {
                  background-color: #f8f9fa;
                }
                .task-row .view-icon {
                  opacity: 0;
                  transition: opacity 0.2s;
                }
                .task-row:hover .view-icon {
                  opacity: 1;
                }
              `}
          </style>
          <thead className='bg-white border-bottom'>
            <tr>
              <th className='ps-4 py-3 text-uppercase small fw-bold text-muted'>Name</th>
              <th className='ps-4 py-3 text-uppercase small fw-bold text-muted'>In</th>
              <th className='ps-4 py-3 text-uppercase small fw-bold text-muted'>out</th>

            </tr>
          </thead>
        <tbody>
  {attendance.map(a => (
    <tr key={a._id} className="task-row">
      <td className='ps-4 py-3'>
        {a.user?.name }
      </td>

      <td className='ps-4 py-3'>
        {new Date(a.loginAt).toLocaleString()}
      </td>

      <td className='ps-4 py-3'>
        {a.logoutAt
          ? new Date(a.logoutAt).toLocaleString()
          : "Still logged in"}
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>

    </div >
  );
}
