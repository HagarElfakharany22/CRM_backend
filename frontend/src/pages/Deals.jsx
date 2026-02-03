import React, { useState } from 'react'
import Modal from '../common/Modal';
import Dealsforms from '../forms/Dealsforms';
export default function Deals({ deals, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', stage: '', probability: '', status: ''});


  const filtered = deals.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) 
    || l.company.toLowerCase().includes(search.toLocaleLowerCase())||
    l.stage.toLowerCase().includes(search.toLocaleLowerCase())
    
  );

  const submit = () => {
    if (editing) onEdit({ ...formData, id: editing.id });
    else onAdd(formData);
    setOpen(false);
  };
  return (
     <>
      <h1 className="text-2xl font-semibold mb-4">Deals</h1>

      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="d-flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold mx-3">All Deals</h2>

          <div className="d-flex gap-3">
            <input
              placeholder="Search leads..."
              className="border px-3 py-2 rounded"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary text-white px-4 py-2 rounded"
              onClick={() => { setEditing(null); setFormData({ name: '', company: '', stage: '', probability: '', status: ''}); setOpen(true); }}
            >
              + Add Deal
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              {["Name","Company","Stage","Probability","Status","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map(deal => (
              <tr key={deal.id} className="border-t">
                <td className="px-4 py-3">{deal.name}</td>
                <td className="px-4 py-3">{deal.company}</td>
                <td className="px-4 py-3">{deal.stage}</td>
                <td className="px-4 py-3 "  >{deal.probability}%</td>
                <td className="px-4 py-3" style={{ width: "15%" }}>{deal.status}</td>
      
                <td className="px-4 py-3 d-flex gap-2">
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => { setEditing(deal); setFormData(deal); setOpen(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 btn btn-danger text-white rounded"
                    onClick={() => onDelete(deal.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={open} title={editing ? "Edit deal" : "Add deal"} onClose={() => setOpen(false)} onSubmit={submit}>
        <Dealsforms formData={formData} setFormData={setFormData} />
      </Modal>
    </>
  );
}
