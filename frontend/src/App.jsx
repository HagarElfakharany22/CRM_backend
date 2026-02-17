import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Boards from "./pages/Boards/Boards.jsx";
import BoardCard from "./pages/BoardCard/BoardCard.jsx";
import BoardDetails from "./pages/BoardDetails/BoardDetails.jsx";
import { dumyData } from "./dumyData";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Employees from "./layout/Employees";
import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL;

// const socket = io("http://localhost:8000");

const socket = io(API_URL);
console.log(socket);

export default function App() {
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState(dumyData.leads);
  const [contacts, setContacts] = useState(dumyData.contacts);
  const [deals, setDeals] = useState(dumyData.deals);

  
 useEffect(() => {
    // استقبال الرسالة من السيرفر
    socket.on('server-notification', (data) => {
      alert(`رسالة من السيرفر: ${data?.message}`);
      console.log("message from socket : ", data.message);
    });
  
    // مهم جداً: نقفل الوصلة لما الـ Component يتمسح
    return () => {
      socket.off('server-notification');
    };
  }, []);
    
  
  const addLead = (lead) => setLeads([...leads, { ...lead, id: Date.now() }]);

  const editLead = (lead) =>
    setLeads(leads.map((l) => (l.id === lead.id ? lead : l)));

  const deleteLead = (id) => setLeads(leads.filter((l) => l.id !== id));

  const addContacts = (conatct) =>
    setContacts([...contacts, { ...conatct, id: Date.now() }]);

  const editContact = (conatct) =>
    setContacts(contacts.map((l) => (l.id === conatct.id ? conatct : l)));

  const deleteConatact = (id) =>
    setContacts(contacts.filter((l) => l.id !== id));

  ///deals
  const addDeals = (deal) => setDeals([...deals, { ...deal, id: Date.now() }]);

  const editDeals = (deal) =>
    setDeals(deals.map((l) => (l.id === deal.id ? deal : l)));

  const deleteDeals = (id) => setDeals(deals.filter((l) => l.id !== id));
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* employees */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute roles={["admin"]}>
              <employees />
            </ProtectedRoute>
          }
        />
        {/* Leads */}
        <Route
          path="/leads"
          element={
            <ProtectedRoute roles={["admin", "user"]}>
              <Leads
                leads={leads}
                onAdd={addLead}
                onEdit={editLead}
                onDelete={deleteLead}
              />
            </ProtectedRoute>
          }
        />

        {/* Contacts */}
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={contacts}
              onAdd={addContacts}
              onEdit={editContact}
              onDelete={deleteConatact}
            />
          }
        />

        {/* Deals */}
        <Route
          path="/deals"
          element={
            <Deals
              deals={deals}
              onAdd={addDeals}
              onEdit={editDeals}
              onDelete={deleteDeals}
            />
          }
        />

        {/* Boards */}
        <Route
          path="/boards"
          element={
            <ProtectedRoute roles={["admin", "employee"]}>
              <Boards />
            </ProtectedRoute>
          }
        />
        
        {/* Board details  */}
        <Route
          path="/boards/:id"
          element={
            <ProtectedRoute roles={["admin", "employee"]}>
              <BoardDetails />
            </ProtectedRoute>
          }
        />

        {/* Tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute roles={["admin", "employee"]}>
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
