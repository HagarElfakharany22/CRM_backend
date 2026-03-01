

import React, { useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LeadForm from '../forms/Leadform';
import Modal from '../common/Modal';
import { LeadsContext } from "../context/LeadsContext.jsx";
import { BoardContext } from "../context/BoardContext.jsx";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from './styles.module.css';

const Leads = ({ leads, onAdd, onEdit, onDelete }) => {
  const queryClient = useQueryClient();
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  let [userRole, setUserRole] = useState(null);
  const [editing, setEditing] = useState(null);

  // const [formData, setFormData] = useState({
  //   name: '',
  //   company: '',
  //   email: '',
  //   phone: '',
  //   status: '',
  //   source: ''
  // });
  const [leadToDelete, setLeadToDelete] = useState(null);
  const { getUserRole } = useContext(BoardContext)
  const { getAllLeads, getLeadsByUserId, user, deleteLead , updateLead , createLead } = useContext(LeadsContext);
  const { data } = useQuery({
    queryKey: ["leads"],
    queryFn: () =>
      userRole === "admin" ||
        userRole === "leader" ||
        userRole === "manager"
        ? getAllLeads()
        : getLeadsByUserId(),
    enabled: !!userRole,
  });
  const deleteLeadMutation = useMutation({
    mutationFn: (LeadId) => deleteLead(LeadId),
    onSuccess: async () => {
      setLeadToDelete(null)
      await queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.refetchQueries({ queryKey: ["leads"] });
      onClose();
    },
  });
  const addLeadMutation = useMutation({
  mutationFn: (newLead) => createLead(newLead),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["leads"] });
    setOpen(false);
  },
});

const updateLeadMutation = useMutation({
  mutationFn: (updatedLead) => updateLead(updatedLead._id, updatedLead),
  onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ["leads"] });
    setOpen(false);
    setEditing(null);
  },
});


  // const filtered = leads.filter(l =>
  //   l.name.toLowerCase().includes(search.toLowerCase()) ||
  //   l.company.toLowerCase().includes(search.toLowerCase())
  // );

  // const submit = () => {
  //   if (editing) onEdit({ ...formData, id: editing.id });
  //   else onAdd(formData);
  //   setOpen(false);
  // };

  useEffect(() => {
    let role = getUserRole();
    if (role) {
      setUserRole(role)
    }
    console.log(data);

  }, [userRole, data]);

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
                  {["Name", "Company", "Email", "Phone", "Status", "Source", "Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.leads?.map(lead => (
                  <tr key={lead._id}>

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
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-4"
                          onClick={() => {
                            setLeadToDelete(lead);


                          }}
                        >
                          Delete
                        </button>
                        {/*---------------------------- start delete list ----------------------- */}
                        {
                          leadToDelete && (
                            <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
                              <div className={`p-5 bg-light rounded-3`}>
                                <h5 className="text-center mb-4">Are You Sure ?  </h5>
                                <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={() => deleteLeadMutation.mutate(leadToDelete._id)}>Delete</button>
                                <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={() => setLeadToDelete(null)}>Cancel</button>
                              </div>
                            </div>
                          )
                        }
                        {/*---------------------------- end delete list ----------------------- */}
                      </div>
                    </td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>

          {/* ================= Mobile Card Layout ================= */}
          <div className="d-md-none">
            {data?.leads?.map(lead => (
              <div key={lead._id} className="card mb-3 shadow-sm">
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
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => setLeadToDelete(lead)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/*---------------------------- start delete list ----------------------- */}
                {
                  leadToDelete && (
                    <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
                      <div className={`p-5 bg-light rounded-3`}>
                        <h5 className="text-center mb-4">Are You Sure ?  </h5>
                        <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={() => deleteLeadMutation.mutate(leadToDelete._id)}>Delete</button>
                        <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={() => setLeadToDelete(null)}>Cancel</button>
                      </div>
                    </div>
                  )
                }
                {/*---------------------------- end delete list ----------------------- */}
              </div>

            ))}
          </div>

        </div>
      </div>


      {/* Modal */}
      <Modal
        isOpen={open}
        title={editing ? "Edit Lead" : "Add Lead"}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <LeadForm
          initialValues={
            editing || {
              name: "",
              company: "",
              email: "",
              phone: "",
              status: "",
              source: "",
            }
          }
          isEdit={!!editing}
          onSubmit={(values) => {
            if (editing) {
              updateLeadMutation.mutate({ ...values, _id: editing._id });
            } else {
              addLeadMutation.mutate(values);
            }
          }}
        />
      </Modal>
      {/* <Modal
        isOpen={open}
        title={editing ? "Edit Lead" : "Add Lead"}
        onClose={() => setOpen(false)}
        onSubmit={submit}
      >
        <LeadForm
          formData={formData}
          setFormData={setFormData}
        />
      </Modal> */}
    </>
  );
};

export default Leads;