import React from 'react'

export default function Contactsform({ formData, setFormData }) {
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
     
       <div className="col-12">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter email"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      
    </form>
    </div>
  )
}
