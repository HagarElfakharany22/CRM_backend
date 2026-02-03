import React from 'react'
import { useState } from 'react';
import Modal from '../common/Modal'
import Contactsform from '../forms/Contactsform'

export default function Contacts({contacts, onAdd, onEdit, onDelete}) {
  const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', title: ''});
  
  
    const filtered = contacts.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) 
      || l.company.toLowerCase().includes(search.toLocaleLowerCase())||
      l.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
  
    const submit = () => {
      if (editing) onEdit({ ...formData, id: editing.id });
      else onAdd(formData);
      setOpen(false);
    };
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Contacts</h1>
       <div className="bg-white rounded-lg shadow">
        <div className="d-flex justify-between items-center p-4 ">
          <h2 className="font-semibold mx-3">All Contacts</h2>
          <div className="d-flex gap-3">
            <input
              placeholder="Search leads..."
              className="border px-3 py-2 rounded"
              onChange={e=> setSearch(e.target.value)}
              
            />
            <button
              className="btn btn-primary text-white px-4 py-2 rounded"
              onClick={()=>{setEditing(null); setFormData({ name:'', company:'', email:'', phone:'', title:'' }); setOpen(true);}}
            >
              + Add Contact
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              {["Name","Title","Email","Phone","Company","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map(contact => (
              <tr key={contact.id} className="border-t">
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.title}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3 "  style={{ width: "15%" }}>{contact.phone}</td>
                <td className="px-4 py-3">{contact.company}</td>
                
                <td className="px-4 py-3 d-flex gap-2">
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => { setEditing(contact); setFormData(contact); setOpen(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 btn btn-danger text-white rounded"
                     onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
       <Modal isOpen={open} title={editing ? "Edit Contacts" : "Add Contacts"} onClose={() => setOpen(false)} onSubmit={submit}>
          <Contactsform formData={formData} setFormData={setFormData}/>
       </Modal>
    </>
  )
}
