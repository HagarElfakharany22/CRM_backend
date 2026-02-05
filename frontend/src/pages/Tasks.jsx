import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import Modal from "../common/Modal"; // Assuming this handles the Bootstrap modal backdrop
import TaskForm from "../forms/TaskForm"; // You'll create this to handle the inputs

function TasksPage() {
  const { tasks, AddTask, EditTasks, DeleteTasks,getTasks,setTasks } = useContext(TaskContext);
  
  // State for Modal and Search
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', status: 'Pending', description: '' });

  // Filter logic
  const filteredTasks = tasks?.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (editing) {
      console.log(editing._id);
      
     EditTasks( editing._id ,formData);
    } else {
      AddTask(formData);
    }
    setOpen(false);
    setEditing(null);
  };

  const openEditModal = (task) => {
    setEditing(task);
    setFormData(task);
    setOpen(true);
  };

  const openAddModal = () => {
    setEditing(null);
    setFormData({ title: '', status: 'Pending', description: '' });
    setOpen(true);
  };

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="h3 mb-1 fw-bold text-dark">Task Manager</h1>
          <p className="text-muted mb-0">Manage your CRM activities and deadlines</p>
        </div>
        
        <div className="d-flex gap-2">
          <div className="input-group shadow-sm" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-white border-end-0">
              {/* <i className="bi bi-search text-muted"></i> */}
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary shadow-sm px-4" onClick={openAddModal}>
            New Task
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-white border-bottom">
              <tr>
                <th className="ps-4 py-3 text-uppercase small fw-bold text-muted">Task Details</th>
                <th className="py-3 text-uppercase small fw-bold text-muted">Status</th>
                <th className="py-3 text-uppercase small fw-bold text-muted text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td className="ps-4 py-3">
                      <div className="fw-semibold text-dark">{task.title}</div>
                      <div className="text-muted small">{task.description?.substring(0, 40)}...</div>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${
                        task.status === 'Completed' ? 'bg-success-subtle text-success border border-success' : 
                        task.status === 'In Progress' ? 'bg-primary-subtle text-primary border border-primary' : 
                        'bg-warning-subtle text-dark border border-warning'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button 
                        className="btn btn-sm btn-light border me-2"
                        onClick={() => openEditModal(task)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => DeleteTasks(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-5">
                    <div className="text-muted">No tasks found matching your search.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Modal Component */}
      <Modal 
        isOpen={open} 
        title={editing ? "Update Task" : "Create New Task"} 
        onClose={() => setOpen(false)} 
        onSubmit={handleSubmit}
      >
        <TaskForm formData={formData} setFormData={setFormData} />
      </Modal>
    </div>
  );
}

export default TasksPage;