import React from 'react'

export default function Dealsforms({ formData, setFormData }) {
 return (
    <div>
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
      <select
        className="form-select"
        value={formData.stage}
        onChange={e =>
          setFormData({ ...formData, stage: e.target.value })
        }
      >
        <option value="">Select Stage</option>
        <option value="negotiation">Negotiation</option>
        <option value="poroposal">Proposal</option>
        <option value="Closed">Closed</option>
      </select>
      <div className="col-12">
        <label className="form-label">Probability</label>
        <input

          type="number"
          className="form-control"
          placeholder="Enter the probabilty "
          value={formData.probability}
          onChange={e => setFormData({ ...formData, probability: e.target.value })}
        />
      </div>
       {/* <div className="col-12">
        <label className="form-label">due Date </label>
        <input
          type="Date"
          className="form-control"
          placeholder="Enter close date"
          value={formData.dueDate}
          onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div> */}
       <div className="col-12">
        <label className="form-label">Close Date </label>
        <input
          type="Date"
          className="form-control"
          placeholder="Enter close date"
          value={formData.closeDate}
          onChange={e => setFormData({ ...formData, closeDate: e.target.value })}
          
        />
         <select
        className="form-select"
        value={formData.status}
        onChange={e =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        <option value="">Select Status</option>
        <option value="In Progress">In Progress</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </select>
      </div>
    </form>
    </div>
  )
}
