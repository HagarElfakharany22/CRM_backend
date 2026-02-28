
// import React, { useEffect, useState, useContext } from "react";
// import LeadForm from '../forms/Leadform';
// import Modal from '../common/Modal';
// import { BoardContext } from '../context/BoardContext';
// import { useOutletContext } from "react-router-dom";
// import styles from './styles.module.css'
// const Leads = ({ leads, onAdd, onEdit, onDelete }) => {
//   const { toggleSidebar } = useOutletContext();
//   const [search, setSearch] = useState('');
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', status: '', source: '' });
//   const {  getUserRole} = useContext(BoardContext);


//   const filtered = leads.filter(l =>
//     l.name.toLowerCase().includes(search.toLowerCase()) 
//     || l.company.toLowerCase().includes(search.toLocaleLowerCase())
//   );

//   const submit = () => {
//     if (editing) onEdit({ ...formData, id: editing.id });
//     else onAdd(formData);
//     setOpen(false);
//   };
//   useEffect(() => {
//    let role= getUserRole(); 
//    console.log(role);
 
//   }, []);
//   return (
//     <>
//     <div className="d-flex justify-content-between p-3">
//           <i class={`${styles.toggle_btn} fa-solid fa-bars me-3 fs-2 text-white mb-3`}
//             onClick={toggleSidebar}
//           ></i>
//           {/* <h2 className="mb-4 text-white">Leads</h2> */}
//           </div>
//     {/* <i class={`${styles.toggle_btn} fa-solid fa-bars me-3 fs-2 mb-3 text-white`}
//                   onClick={toggleSidebar}
//                 ></i>
//       <h1 className="text-2xl font-semibold mb-4 text-white">Leads</h1> */}

//       <div className="bg-white rounded-lg shadow">
//         {/* Header */}
//         <div className="d-flex justify-between items-center p-4 border-b">
//           <h2 className="font-semibold mx-3">All Leads</h2>

//           <div className="d-flex gap-3">
//             <input
//               placeholder="Search leads..."
//               className="border px-3 py-2 rounded"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             <button
//               className="btn btn-primary text-white px-4 py-2 rounded"
//               onClick={() => { setEditing(null); setFormData({ name:'', company:'', email:'', phone:'', status:'', source:'' }); setOpen(true); }}
//             >
//               + Add Lead
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-500">
//             <tr>
//               {["Name","Company","Email","Phone","Status","Source","Actions"].map(h => (
//                 <th key={h} className="text-left px-4 py-3">{h}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map(lead => (
//               <tr key={lead.id} className="border-t">
//                 <td className="px-4 py-3">{lead.name}</td>
//                 <td className="px-4 py-3">{lead.company}</td>
//                 <td className="px-4 py-3">{lead.email}</td>
//                 <td className="px-4 py-3 "  style={{ width: "15%" }}>{lead.phone}</td>
//                 <td className="px-4 py-3">{lead.status}</td>
//                 <td className="px-4 py-3">{lead.source}</td>
//                 <td className="px-4 py-3 d-flex gap-2">
//                   <button
//                     className="px-3 py-1 border rounded"
//                     onClick={() => { setEditing(lead); setFormData(lead); setOpen(true); }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-3 py-1 btn btn-danger text-white rounded"
//                     onClick={() => onDelete(lead.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={open} title={editing ? "Edit Lead" : "Add Lead"} onClose={() => setOpen(false)} onSubmit={submit}>
//         <LeadForm formData={formData} setFormData={setFormData} />
//       </Modal>
//     </>
//   );
// };

// export default Leads;

import React, { useEffect, useState, useContext } from "react";
import LeadForm from '../forms/Leadform';
import Modal from '../common/Modal';
import { BoardContext } from '../context/BoardContext';
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css';

const Leads = ({ leads, onAdd, onEdit, onDelete }) => {
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: '',
    source: ''
  });

  const { getUserRole } = useContext(BoardContext);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (editing) onEdit({ ...formData, id: editing.id });
    else onAdd(formData);
    setOpen(false);
  };

  useEffect(() => {
    let role = getUserRole();
    console.log(role);
  }, []);

  return (
    <>
      {/* Sidebar Toggle */}
      <div className="p-3">
        <i
          className={`${styles.toggle_btn} fa-solid fa-bars fs-2 text-white`}
          onClick={toggleSidebar}
        ></i>
      </div>

      <div className="container-fluid">
        <div className="bg-white rounded-4 shadow p-3 p-md-4">

          {/* ================= Header ================= */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            {/* <h2 className="m-0">All Leads</h2> */}

            <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
              <input
                placeholder="Search leads..."
                className={`form-control w-75  ${styles.input_size_responsive}`}
                value={search}
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
                    status: '',
                    source: ''
                  });
                  setOpen(true);
                }}
              >
                + Add Lead
              </button>
            </div>
          </div>

          {/* ================= Desktop & Tablet Table ================= */}
          <div className="d-none d-md-block table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  {["Name","Company","Email","Phone","Status","Source","Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td>{lead.email}</td>
                    <td>{lead.phone}</td>
                    <td>{lead.status}</td>
                    <td>{lead.source}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary px-4"
                          onClick={() => {
                            setEditing(lead);
                            setFormData(lead);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-4"
                          onClick={() => onDelete(lead.id)}
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

          {/* ================= Mobile Card Layout ================= */}
          <div className="d-md-none">
            {filtered.map(lead => (
              <div key={lead.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{lead.name}</h5>
                  <p className="mb-1"><strong>Company:</strong> {lead.company}</p>
                  <p className="mb-1 "><strong>Email:</strong> {lead.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {lead.phone}</p>
                  <p className="mb-1"><strong>Status:</strong> {lead.status}</p>
                  <p className="mb-2"><strong>Source:</strong> {lead.source}</p>

                  <div className="d-flex gap-2 ">
                    <button
                      className="btn btn-outline-secondary btn-sm w-50"
                      onClick={() => {
                        setEditing(lead);
                        setFormData(lead);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => onDelete(lead.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={open}
        title={editing ? "Edit Lead" : "Add Lead"}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      >
        <LeadForm
          formData={formData}
          setFormData={setFormData}
        />
      </Modal>
    </>
  );
};

export default Leads;