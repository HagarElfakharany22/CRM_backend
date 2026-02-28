// import React, { useState } from 'react'
// import Modal from '../common/Modal';
// import Dealsforms from '../forms/Dealsforms';
// import { useOutletContext } from "react-router-dom";
// import styles from './styles.module.css'
// export default function Deals({ deals, onAdd, onEdit, onDelete }) {
//   const { toggleSidebar } = useOutletContext();
//   const [search, setSearch] = useState('');
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [formData, setFormData] = useState({ name: '', company: '', stage: '', probability: '', status: '' });


//   const filtered = deals.filter(l =>
//     l.name.toLowerCase().includes(search.toLowerCase())
//     || l.company.toLowerCase().includes(search.toLocaleLowerCase()) ||
//     l.stage.toLowerCase().includes(search.toLocaleLowerCase())

//   );

//   const submit = () => {
//     if (editing) onEdit({ ...formData, id: editing.id });
//     else onAdd(formData);
//     setOpen(false);
//   };
//   return (
//     <>
//       {/* <h1 className="text-2xl font-semibold mb-4">Deals</h1> */}
//      <div className='p-3'>
//        <i class={`${styles.toggle_btn} fa-solid fa-bars me-3 fs-2 mb-3 text-white `}
//         onClick={toggleSidebar}
//       ></i>
//      </div>

//       <div className='d-flex justify-content-center'>
//         <div className={`bg-white  rounded-4 p-2 shadow ${styles.border_main} `}>
//         {/* Header */}
//         <div className="d-flex justify-between items-center p-4 border-b">
//           <h2 className="font-semibold mx-3">All Deals</h2>

//           <div className="d-flex gap-3">
//             <input
//               placeholder="Search leads..."
//               className="border px-3 py-2 rounded"
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             <button
//               className="btn btn-primary text-white px-4 py-2 rounded"
//               onClick={() => { setEditing(null); setFormData({ name: '', company: '', stage: '', probability: '', status: '' }); setOpen(true); }}
//             >
//               + Add Deal
//             </button>
//           </div>
//         </div>

//        <div className={`${styles.tableWrapper} overflow-auto`}>
//          {/* Table */}
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50 text-gray-500">
//             <tr>
//               {["Name", "Company", "Stage", "Probability", "Status", "Actions"].map(h => (
//                 <th key={h} className="text-left px-4 py-3">{h}</th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map(deal => (
//               <tr key={deal.id} className="border-t">
//                 <td className="px-4 py-3">{deal.name}</td>
//                 <td className="px-4 py-3">{deal.company}</td>
//                 <td className="px-4 py-3">{deal.stage}</td>
//                 <td className="px-4 py-3 "  >{deal.probability}%</td>
//                 <td className="px-4 py-3" style={{ width: "15%" }}>{deal.status}</td>

//                 <td className="px-4 py-3 d-flex gap-2">
//                   <button
//                     className="px-3 py-1 border rounded"
//                     onClick={() => { setEditing(deal); setFormData(deal); setOpen(true); }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-3 py-1 btn btn-danger text-white rounded"
//                     onClick={() => onDelete(deal.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//        </div>
//       </div>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={open} title={editing ? "Edit deal" : "Add deal"} onClose={() => setOpen(false)} onSubmit={submit}>
//         <Dealsforms formData={formData} setFormData={setFormData} />
//       </Modal>
//     </>
//   );
// }

import React, { useState } from 'react';
import Modal from '../common/Modal';
import Dealsforms from '../forms/Dealsforms';
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css';

export default function Deals({ deals, onAdd, onEdit, onDelete }) {
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    stage: '',
    probability: '',
    status: ''
  });

  const filtered = deals.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.company.toLowerCase().includes(search.toLowerCase()) ||
    l.stage.toLowerCase().includes(search.toLowerCase())
  );

  const submit = () => {
    if (editing) onEdit({ ...formData, id: editing.id });
    else onAdd(formData);
    setOpen(false);
  };

  return (
    <>
      {/* Sidebar Toggle */}
      <div className="p-3">
        <i
          className={`${styles.toggle_btn} fa-solid fa-bars fs-2 mb-3 text-white`}
          onClick={toggleSidebar}
        ></i>
      </div>

      <div className="container-fluid">
        <div className={`bg-white rounded-4 p-3 p-md-4 shadow ${styles.border_main}`}>

          {/* ================= Header ================= */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            {/* <h2 className="m-0">All Deals</h2> */}

            <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
              <input
                placeholder="Search deals..."
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
                    stage: '',
                    probability: '',
                    status: ''
                  });
                  setOpen(true);
                }}
              >
                + Add Deal
              </button>
            </div>
          </div>

          {/* ================= Desktop & Tablet Table ================= */}
          <div className="d-none d-md-block table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  {["Name", "Company", "Stage", "Probability", "Status", "Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(deal => (
                  <tr key={deal.id}>
                    <td>{deal.name}</td>
                    <td>{deal.company}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.probability}%</td>
                    <td>{deal.status}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary px-4"
                          onClick={() => {
                            setEditing(deal);
                            setFormData(deal);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-4"
                          onClick={() => onDelete(deal.id)}
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
            {filtered.map(deal => (
              <div key={deal.id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-2">{deal.name}</h5>
                  <p className="mb-1"><strong>Company:</strong> {deal.company}</p>
                  <p className="mb-1"><strong>Stage:</strong> {deal.stage}</p>
                  <p className="mb-1"><strong>Probability:</strong> {deal.probability}%</p>
                  <p className="mb-2"><strong>Status:</strong> {deal.status}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm w-50"
                      onClick={() => {
                        setEditing(deal);
                        setFormData(deal);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => onDelete(deal.id)}
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
        title={editing ? "Edit Deal" : "Add Deal"}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      >
        <Dealsforms
          formData={formData}
          setFormData={setFormData}
        />
      </Modal>
    </>
  );
}
