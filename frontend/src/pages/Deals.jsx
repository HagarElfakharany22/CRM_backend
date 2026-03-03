import React, { useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from '../common/Modal';
import Dealsforms from '../forms/Dealsforms';
import { useOutletContext } from "react-router-dom";
import { BoardContext } from "../context/BoardContext.jsx";
import { DealsContext } from '../context/DealsContext.jsx';
import styles from './styles.module.css';

export default function Deals({ deals, onAdd, onEdit, onDelete }) {
  const queryClient = useQueryClient();
  const { toggleSidebar } = useOutletContext();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  let [userRole, setUserRole] = useState(null);
  const [editing, setEditing] = useState(null);
  const [dealToDelete, setDealToDelete] = useState(null);
  const { getUserRole } = useContext(BoardContext)
  const { getAllDeals, getDealsByUserId, user, deleteDeals, updateDeals, createDeals } = useContext(DealsContext);

  const { data } = useQuery({
    queryKey: ["deals", search],
    queryFn: () =>
      userRole === "admin" ||
        userRole === "leader" ||
        userRole === "manager"
        ? getAllDeals(search)
        : getDealsByUserId(search),
    enabled: !!userRole,
  });
  const deleteDealMutation = useMutation({
    mutationFn: (DealId) => deleteDeals(DealId),
    onSuccess: async () => {
      setDealToDelete(null)
      await queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.refetchQueries({ queryKey: ["deals"] });
      onClose();
    },
  });
  const addDealMutation = useMutation({
    mutationFn: (newDeal) => createDeals(newDeal),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["deals"] });
      setOpen(false);
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: (updatedDeal) => updateDeals(updatedDeal._id, updatedDeal),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["deals"] });
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
                  {["Title", "Value", "Stage", "Probability", "Deadline", "Actions"].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.deals?.map(deal => (
                  <tr key={deal._id}>
                    <td>{deal.title}</td>
                    <td>{deal.value}</td>
                    <td>{deal.stage}</td>
                    <td>{deal.probability}%</td>
                    <td>{new Date(deal.expectedCloseDate).toLocaleString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary px-4"
                          onClick={() => {
                            setEditing(deal);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-4"
                          onClick={() => setDealToDelete(deal)}
                        >
                          Delete
                        </button>
                        {/*---------------------------- start delete list ----------------------- */}
                        {
                          dealToDelete && (
                            <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
                              <div className={`p-5 bg-light rounded-3`}>
                                <h5 className="text-center mb-4">Are You Sure ?  </h5>
                                <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={() => deleteDealMutation.mutate(dealToDelete._id)}>Delete</button>
                                <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={() => setDealToDelete(null)}>Cancel</button>
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
            {data?.deals?.map(deal => (
              <div key={deal._id} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-2">{deal.title}</h5>
                  <p className="mb-1"><strong>Value:</strong> {deal.value}</p>
                  <p className="mb-1"><strong>Stage:</strong> {deal.stage}</p>
                  <p className="mb-1"><strong>Probability:</strong> {deal.probability}%</p>
                  <p className="mb-2"><strong>Dateline:</strong> {new Date(deal.expectedCloseDate).toLocaleString()}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm w-50"
                      onClick={() => {
                        setEditing(deal);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-50"
                      onClick={() => setDealToDelete(deal)}
                    >
                      Delete
                    </button>
                    {/*---------------------------- start delete deal ----------------------- */}
                    {
                      dealToDelete && (
                        <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
                          <div className={`p-5 bg-light rounded-3`}>
                            <h5 className="text-center mb-4">Are You Sure ?  </h5>
                            <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={() => deleteDealMutation.mutate(dealToDelete._id)}>Delete</button>
                            <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={() => setDealToDelete(null)}>Cancel</button>
                          </div>
                        </div>
                      )
                    }
                    {/*---------------------------- end delete deal ----------------------- */}
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
        title={editing ? "Edit Lead" : "Add Lead"}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
      >
        <Dealsforms
  initialValues={
    editing
      ? {
          ...editing,
          expectedCloseDate: editing.expectedCloseDate
            ? editing.expectedCloseDate.split("T")[0]
            : "",
          lead: editing.lead?._id || "",
          contacts: editing.contacts?.map(c => c._id) || []
        }
      : {
          title: "",
          value: "",
          stage: "",
          probability: "",
          expectedCloseDate: "",
          contacts: [],
          lead: ""
        }
  }
  isEdit={!!editing}
  onSubmit={(values) => {
    if (editing) {
      updateDealMutation.mutate({ ...values, _id: editing._id });
    } else {
      addDealMutation.mutate(values);
    }
  }}
/>

        {/* <Dealsforms
          initialValues={
            editing
              ? {
                ...editing,
                expectedCloseDate: editing.expectedCloseDate
                  ? editing.expectedCloseDate.split("T")[0]
                  : "",
                lead: editing.lead?._id || "",
                contacts: editing.contacts?.map(c => c._id) || []
              }
              : {
                title: "",
                value: "",
                stage: "",
                probability: "",
                expectedCloseDate: "",
                contacts: [],
                lead: ""
              }
          }
          isEdit={!!editing}
          onSubmit={(values) => {
            if (editing) {
              updateDealMutation.mutate({ ...values, _id: editing._id });
            } else {
              addDealMutation.mutate(values);
            }
          }}
        /> */}
      </Modal>

    </>
  );
}
