import React, { useContext } from "react";
import { dumyData } from "../dumyData";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { AuthContext } from "../context/AuthContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF3366"];

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // --- Leads by Status ---
  const leadsStatus = dumyData.leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});
  const leadsData = Object.keys(leadsStatus).map(key => ({
    name: key,
    value: leadsStatus[key]
  }));

  // --- Tasks by Priority ---
  const tasksPriority = dumyData.tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});
  const tasksData = Object.keys(tasksPriority).map(key => ({
    name: key,
    value: tasksPriority[key]
  }));

  // --- Deals by Stage ---
  const dealsStage = dumyData.deals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {});
  const dealsData = Object.keys(dealsStage).map(key => ({
    name: key,
    value: dealsStage[key]
  }));

  // --- Users by Role (Admin only) ---
  const usersData = dumyData.users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const usersChartData = Object.keys(usersData).map(key => ({
    name: key,
    value: usersData[key]
  }));

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        {/* Leads Pie */}
        <div className="col-md-6 col-lg-4">
          <div className="card p-3 h-100">
            <h5>Leads by Status</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={leadsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {leadsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks Pie */}
        <div className="col-md-6 col-lg-4">
          <div className="card p-3 h-100">
            <h5>Tasks by Priority</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={tasksData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                  {tasksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deals Bar */}
        <div className="col-md-6 col-lg-4">
          <div className="card p-3 h-100">
            <h5>Deals by Stage</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dealsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users Pie (Admin only) */}
        {user.role === "admin" && (
          <div className="col-md-6 col-lg-4">
            <div className="card p-3 h-100">
              <h5>Users by Role</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={usersChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                    {usersChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
