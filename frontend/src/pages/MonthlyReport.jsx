import { useEffect, useState } from "react";
import axios from "axios";
import api from "../context/baseURL";

export default function MonthlyReport() {

  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReport = async () => {
    try {
      const res = await api.get("/api/v1/report");
      setReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  if (loading) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Monthly Attendance Report</h3>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">

          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Total Days</th>
              <th>Total Hours</th>
            </tr>
          </thead>

          <tbody>
            {report.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-capitalize">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.totalDays}</td>
                <td>{user.totalHours.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}