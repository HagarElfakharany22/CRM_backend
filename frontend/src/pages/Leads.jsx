import { useState } from 'react';

import LeadForm from '../forms/Leadform';
import Modal from '../common/Modal';

const Leads = ({ leads, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', phone: '', status: '', source: '' });


  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) 
    || l.company.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const submit = () => {
    if (editing) onEdit({ ...formData, id: editing.id });
    else onAdd(formData);
    setOpen(false);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Leads</h1>

      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="d-flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold mx-3">All Leads</h2>

          <div className="d-flex gap-3">
            <input
              placeholder="Search leads..."
              className="border px-3 py-2 rounded"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary text-white px-4 py-2 rounded"
              onClick={() => { setEditing(null); setFormData({ name:'', company:'', email:'', phone:'', status:'', source:'' }); setOpen(true); }}
            >
              + Add Lead
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              {["Name","Company","Email","Phone","Status","Source","Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map(lead => (
              <tr key={lead.id} className="border-t">
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3">{lead.company}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3 "  style={{ width: "15%" }}>{lead.phone}</td>
                <td className="px-4 py-3">{lead.status}</td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3 d-flex gap-2">
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => { setEditing(lead); setFormData(lead); setOpen(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 btn btn-danger text-white rounded"
                    onClick={() => onDelete(lead.id)}
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
      <Modal isOpen={open} title={editing ? "Edit Lead" : "Add Lead"} onClose={() => setOpen(false)} onSubmit={submit}>
        <LeadForm formData={formData} setFormData={setFormData} />
      </Modal>
    </>
  );
};

export default Leads;
