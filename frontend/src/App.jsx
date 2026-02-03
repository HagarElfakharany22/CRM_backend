import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";

import { dumyData } from "./dumyData";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/register";

export default function App() {
  const [leads, setLeads] = useState(dumyData.leads);
  const [contacts,setContacts]=useState(dumyData.contacts);
  const [deals,setDeals]=useState(dumyData.deals);
  const addLead = (lead) =>
    setLeads([...leads, { ...lead, id: Date.now() }]);

  const editLead = (lead) =>
    setLeads(leads.map(l => l.id === lead.id ? lead : l));

  const deleteLead = (id) =>
    setLeads(leads.filter(l => l.id !== id));

const addContacts = (conatct) =>
    setContacts([...contacts, { ...conatct, id: Date.now() }]);

  const editContact = (conatct) =>
   setContacts(contacts.map(l => l.id === conatct.id ? conatct : l));

  const deleteConatact = (id) =>
    setContacts(contacts.filter(l => l.id !== id));


  ///deals
  const addDeals = (deal) =>
    setDeals([...deals, { ...deal, id: Date.now() }]);

  const editDeals = (deal) =>
   setDeals(deals.map(l => l.id === deal.id ? deal : l));

  const deleteDeals = (id) =>
    setDeals(deals.filter(l => l.id !== id));
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected Routes with Layout */}
      <Route  element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute  roles={["admin"]}>
              <Dashboard />
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
        <Route path="/deals" element={<Deals deals={deals}  onAdd={addDeals}
              onEdit={editDeals}
              onDelete={deleteDeals} />} />

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
