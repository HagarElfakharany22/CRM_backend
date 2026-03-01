
import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from '../common/Modal';
import Contactsform from '../forms/Contactsform';
import { useOutletContext } from "react-router-dom";
import styles from './styles.module.css';
import { ContactsContext } from '../context/ContactsContext.jsx';
import { BoardContext } from '../context/BoardContext.jsx';
import LeadForm from '../forms/Leadform.jsx';
export default function Contacts({ contacts, onAdd, onEdit, onDelete }) {
  const queryClient = useQueryClient();
  const { getContacts, getContactsByUserId, deleteContacts, updateContacts, createContacts } = useContext(ContactsContext)
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  let [userRole, setUserRole] = useState(null);
  const { getUserRole } = useContext(BoardContext)
  const [editing, setEditing] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const { data } = useQuery({
    queryKey: ["contacts", search],
    queryFn: () =>
      userRole === "admin" ||
        userRole === "leader" ||
        userRole === "manager"
        ? getContacts(search)
        : getContactsByUserId(search),
    enabled: !!userRole,
  });
  const deleteContactMutation = useMutation({
      mutationFn: (contactId) => deleteContacts(contactId),
      onSuccess: async () => {
        setContactToDelete(null)
        await queryClient.invalidateQueries({ queryKey: ["contacts"] });
        queryClient.refetchQueries({ queryKey: ["contacts"] });
        onClose();
      },
    });
    const addConactMutation = useMutation({
    mutationFn: (newContact) => createContacts(newContact),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setOpen(false);
    },
  });
  
  const updateContactMutation = useMutation({
    mutationFn: (updatedContact) => updateContacts(updatedContact._id, updatedContact),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setOpen(false);
      setEditing(null);
    },
  });
  useEffect(() => {
    let role = getUserRole();
    if (role) {
      setUserRole(role)
    }
    console.log(data);

  }, [userRole, data]);


  return (
    <>
      {/* Toggle button */}
      <div className="p-3">
        <i
          className={`${styles.toggle_btn} fa-solid fa-bars fs-2 mb-3 text-white`}
          onClick={toggleSidebar}
        ></i>
      </div>

      <div className="bg-white rounded-lg shadow p-3 p-md-4">

        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
          {/* <h2 className="font-semibold m-0">All Contacts</h2> */}

          <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
            <input
              placeholder="Search contacts..."
              className={`form-control w-75  ${styles.input_size_responsive}`}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary px-3  py-2"
              onClick={() => {
                setOpen(true);
              }}
            >
              + Add Contact
            </button>
          </div>
        </div>

        {/* ===================== */}
        {/* Desktop & Tablet Table */}
        {/* ===================== */}
        <div className="d-none d-md-block table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                {["Name", "Title", "Email", "Phone", "Company", "Actions"].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data?.contacts?.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.title}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.company}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary px-4"
                        onClick={() => {
                          setEditing(contact);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger px-4"
                        onClick={() => setContactToDelete(contact)}
                      >
                        Delete
                      </button>
                      {/*---------------------------- start delete list ----------------------- */}
                      {
                        contactToDelete && (
                          <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
                            <div className={`p-5 bg-light rounded-3`}>
                              <h5 className="text-center mb-4">Are You Sure ?  </h5>
                              <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={() => deleteContactMutation.mutate(contactToDelete._id)}>Delete</button>
                              <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={() => setContactToDelete(null)}>Cancel</button>
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

        {/* ===================== */}
        {/* Mobile Card Layout */}
        {/* ===================== */}
        <div className="d-md-none">
          {data?.contacts?.map(contact => (
            <div key={contact._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-1">{contact.name}</h5>
                <p className="mb-1"><strong>Title:</strong> {contact.title}</p>
                <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {contact.phone}</p>
                <p className="mb-2"><strong>Company:</strong> {contact.company}</p>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm w-50"
                    onClick={() => {
                      setEditing(contact);
                      setFormData(contact);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => onDelete(contact._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
}
