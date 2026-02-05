import React from 'react';

const TaskForm = ({ formData, setFormData }) => {
  // Helper to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="row g-3 py-2">
      {/* Task Title */}
      <div className="col-12">
        <label className="form-label fw-bold small text-uppercase">Task Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="e.g., Follow up with client"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Status Selection */}
      <div className="col-md-6">
        <label className="form-label fw-bold small text-uppercase">Status</label>
        <select
          name="status"
          className="form-select"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority Selection (Common CRM field) */}
      <div className="col-md-6">
        <label className="form-label fw-bold small text-uppercase">Priority</label>
        <select
          name="priority"
          className="form-select"
          value={formData.priority || 'Medium'}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Description */}
      <div className="col-12">
        <label className="form-label fw-bold small text-uppercase">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          placeholder="Detailed notes about this task..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Due Date (Optional but useful for CRM) */}
      <div className="col-12">
        <label className="form-label fw-bold small text-uppercase">Due Date</label>
        <input
          type="date"
          name="dueDate"
          className="form-control"
          value={formData.dueDate || ''}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default TaskForm;