// import React from 'react'
// import { useState } from 'react';
// import Modal from '../common/Modal'
// import Contactsform from '../forms/Contactsform'
// import { useOutletContext } from "react-router-dom";
// import styles from './styles.module.css'

// export default function Contacts({contacts, onAdd, onEdit, onDelete}) {
//    const { toggleSidebar } = useOutletContext();
//   const [search, setSearch] = useState('');
//     const [open, setOpen] = useState(false);
//     const [editing, setEditing] = useState(null);
//     const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', title: ''});
  
  
//     const filtered = contacts.filter(l =>
//       l.name.toLowerCase().includes(search.toLowerCase()) 
//       || l.company.toLowerCase().includes(search.toLocaleLowerCase())||
//       l.title.toLowerCase().includes(search.toLocaleLowerCase())
//     );
  
//     const submit = () => {
//       if (editing) onEdit({ ...formData, id: editing.id });
//       else onAdd(formData);
//       setOpen(false);
//     };
//   return (
//     <>
//       {/* <h1 className="text-2xl font-semibold mb-4">Contacts</h1> */}
//        <div className='p-3'>
//              <i class={`${styles.toggle_btn} fa-solid fa-bars me-3 fs-2 mb-3 text-white `}
//               onClick={toggleSidebar}
//             ></i>
//            </div>
//        <div className="bg-white rounded-lg shadow">
//         <div className="d-flex justify-between items-center p-4 ">
//           <h2 className="font-semibold mx-3">All Contacts</h2>
//           <div className="d-flex gap-3">
//             <input
//               placeholder="Search leads..."
//               className="border px-3 py-2 rounded"
//               onChange={e=> setSearch(e.target.value)}
              
//             />
//             <button
//               className="btn btn-primary text-white px-4 py-2 rounded"
//               onClick={()=>{setEditing(null); setFormData({ name:'', company:'', email:'', phone:'', title:'' }); setOpen(true);}}
//             >
//               + Add Contact
//             </button>
//           </div>
//         </div>
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-500">
//             <tr>
//               {["Name","Title","Email","Phone","Company","Actions"].map(h => (
//                 <th key={h} className="text-left px-4 py-3">{h}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map(contact => (
//               <tr key={contact.id} className="border-t">
//                 <td className="px-4 py-3">{contact.name}</td>
//                 <td className="px-4 py-3">{contact.title}</td>
//                 <td className="px-4 py-3">{contact.email}</td>
//                 <td className="px-4 py-3 "  style={{ width: "15%" }}>{contact.phone}</td>
//                 <td className="px-4 py-3">{contact.company}</td>
                
//                 <td className="px-4 py-3 d-flex gap-2">
//                   <button
//                     className="px-3 py-1 border rounded"
//                     onClick={() => { setEditing(contact); setFormData(contact); setOpen(true); }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-3 py-1 btn btn-danger text-white rounded"
//                      onClick={() => onDelete(contact.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//        </div>
//        <Modal isOpen={open} title={editing ? "Edit Contacts" : "Add Contacts"} onClose={() => setOpen(false)} onSubmit={submit}>
//           <Contactsform formData={formData} setFormData={setFormData}/>
//        </Modal>
//     </>
//   )
// }


import React, { useState } from 'react';
import Modal from '../common/Modal';
import Contactsform from '../forms/Contactsform';
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css';

export default function Contacts({ contacts, onAdd, onEdit, onDelete }) {
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    title: ''
  });

  const filtered = contacts.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (editing) onEdit({ ...formData, id: editing.id });
    else onAdd(formData);
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <div className="p-3">
        <i
          className={`${styles.toggle_btn} fa-solid fa-bars fs-2 mb-3 text-white`}
          onClick={toggleSidebar}
        ></i>
      </div>

      <div className="bg-white rounded-lg shadow p-3 p-md-4">

        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          {/* <h2 className="font-semibold m-0">All Contacts</h2> */}

          <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
            <input
              placeholder="Search contacts..."
              className={`form-control w-75  ${styles.input_size_responsive}`}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary px-3  py-2"
              onClick={() => {
                setEditing(null);
                setFormData({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  title: ''
                });
                setOpen(true);
              }}
            >
              + Add Contact
            </button>
          </div>
        </div>

        {/* ===================== */}
        {/* Desktop & Tablet Table */}
        {/* ===================== */}
        <div className="d-none d-md-block table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                {["Name", "Title", "Email", "Phone", "Company", "Actions"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.title}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.company}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => {
                          setEditing(contact);
                          setFormData(contact);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger px-4"
                        onClick={() => onDelete(contact.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===================== */}
        {/* Mobile Card Layout */}
        {/* ===================== */}
        <div className="d-md-none">
          {filtered.map(contact => (
            <div key={contact.id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-1">{contact.name}</h5>
                <p className="mb-1"><strong>Title:</strong> {contact.title}</p>
                <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {contact.phone}</p>
                <p className="mb-2"><strong>Company:</strong> {contact.company}</p>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm w-50"
                    onClick={() => {
                      setEditing(contact);
                      setFormData(contact);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => onDelete(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      <Modal
        isOpen={open}
        title={editing ? "Edit Contact" : "Add Contact"}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      >
        <Contactsform
          formData={formData}
          setFormData={setFormData}
        />
      </Modal>
    </>
  );
}
