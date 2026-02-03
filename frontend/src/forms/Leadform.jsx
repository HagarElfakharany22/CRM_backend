import React from 'react';

const LeadForm = ({ formData, setFormData }) => {
  return (
    <form className="row g-3">
      {/* Name */}
      <div className="col-12">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      {/* Company */}
      <div className="col-12">
        <label className="form-label">Company</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter company"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
        />
      </div>

      {/* Email */}
      <div className="col-12">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="col-12">
        <label className="form-label">phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <select
        className="form-select"
        value={formData.status}
        onChange={e =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        <option value="">Select Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>
       <select
        className="form-select"
        value={formData.source}
        onChange={e =>
          setFormData({ ...formData, source: e.target.value })
        }
      >
        <option value="">Select Status</option>
        <option value="facebook">Facebook</option>
        <option value="website">Website</option>
      </select>
    </form>
  );
};

export default LeadForm;
