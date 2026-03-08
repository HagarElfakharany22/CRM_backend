import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LeadsContext } from "../context/LeadsContext";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { BoardContext } from "../context/BoardContext";
import { ContactsContext } from "../context/ContactsContext";

const stageOptions = ["prospecting", "proposal", "negotiation", "won", "lost"];
export default function Dealsforms({ initialValues, onSubmit, isEdit }) {
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const { getLeadsByUserId, getAllLeads } = useContext(LeadsContext)
  const { getUserRole } = useContext(BoardContext)
  const {getContactsByLeadId} = useContext(ContactsContext)
  let [userRole, setUserRole] = useState(null);
  const { data } = useQuery({
    queryKey: ["leadsData"],
    queryFn: () =>
      userRole === "admin" ||
        userRole === "leader" ||
        userRole === "manager"
        ? getAllLeads()
        : getLeadsByUserId(),
    enabled: !!userRole,
  });


  const formik = useFormik({
    enableReinitialize: true, // important for edit mode
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      value: Yup.number()
        .required("Value is required")
        .positive("Must be positive"),
      stage: Yup.string()
        .oneOf(stageOptions)
        .required("Stage is required"),
      probability: Yup.number(),
      expectedCloseDate: Yup.date(),
      lead: Yup.string().required("Lead is required"),
      contacts: Yup.array().min(1, "Select at least one contact"),
    }),
    onSubmit: (values) => {
      onSubmit(values); // send data to parent -> API
    },
  })

  
  const { data: contactsData } = useQuery({
  queryKey: ["contactsData", formik.values.lead],
  queryFn: () => getContactsByLeadId(formik.values.lead),
  enabled: !!formik.values.lead, // only run if lead selected
});
  useEffect(() => {
    let role = getUserRole();
    if (role) {
      setUserRole(role)
    }
    console.log(contactsData);
  }, [data , contactsData]);
  return (
    <form className="row g-3" onSubmit={formik.handleSubmit}>

      {/* Name */}
      <div className="col-12">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-danger small">{formik.errors.title}</div>
        )}
      </div>

      {/* Value */}
      <div className="col-12">
        <label className="form-label">Value</label>
        <input
          type="number"
          name="value"
          className="form-control"
          placeholder="Enter value"
          value={formik.values.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.value && formik.errors.value && (
          <div className="text-danger small">{formik.errors.value}</div>
        )}
      </div>
      {/* Stage Select */}
      <div className="mb-3">
        <label className="form-label">Stage</label>
        <select
          name="stage"
          className="form-select"
          value={formik.values.stage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {stageOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {formik.touched.stage && formik.errors.stage && (
          <div className="text-danger small">{formik.errors.stage}</div>
        )}
      </div>

      {/* probability */}
      <div className="col-12">
        <label className="form-label">Probability</label>
        <input
          type="number"
          name="probability"
          className="form-control"
          placeholder="Enter probability"
          value={formik.values.probability}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.probability && formik.errors.probability && (
          <div className="text-danger small">{formik.errors.probability}</div>
        )}
      </div>

      {/* expectedCloseDate */}
      <div className="col-12">
        <label className="form-label">Deadline</label>
        <input
          type="date"
          name="expectedCloseDate"
          className="form-control"
          placeholder="Enter expectedCloseDate"
          value={formik.values.expectedCloseDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.expectedCloseDate && formik.errors.expectedCloseDate && (
          <div className="text-danger small">{formik.errors.expectedCloseDate}</div>
        )}
      </div>

      {/* createdFromLead */}
      <div className="mb-3">
        <select
          name="lead"
          className="form-select"
          value={formik.values.lead}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Lead</option>

          {data?.leads?.map((lead) => (
            <option key={lead._id} value={lead._id}>
              {lead.name}
            </option>
          ))}
        </select>

        {formik.touched.lead && formik.errors.lead && (
          <div className="text-danger small">
            {formik.errors.lead}
          </div>
        )}
      </div>

      {/* contacts */}
      <div className="mb-3">
  <div className="form-check">
  {contactsData?.contacts?.map((contact) => (
    <div key={contact._id} className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={contact._id}
        name="contacts"
        value={contact._id}
        checked={formik.values.contacts.includes(contact._id)}
        onChange={(e) => {
          if (e.target.checked) {
            formik.setFieldValue("contacts", [
              ...formik.values.contacts,
              contact._id,
            ]);
          } else {
            formik.setFieldValue(
              "contacts",
              formik.values.contacts.filter((id) => id !== contact._id)
            );
          }
        }}
      />

      <label className="form-check-label" htmlFor={contact._id}>
        {contact.name}
      </label>
    </div>
  ))}
</div>

  {formik.touched.contacts && formik.errors.contacts && (
    <div className="text-danger small">
      {formik.errors.contacts}
    </div>
  )}
</div>
            {/* <div className="mb-3">
        <select
        multiple
          name="contacts"
          className="form-select"
          value={formik.values.contacts}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Contacts</option>

          {contactsData?.contacts?.map((contact) => (
            <option key={contact._id} value={contact._id}>
              {contact.name}
            </option>
          ))}
        </select>

        {formik.touched.contact && formik.errors.contact && (
          <div className="text-danger small">
            {formik.errors.contact}
          </div>
        )}
      </div> */}

      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100">
          {isEdit ? "Update Deal" : "Add Deal"}
        </button>
      </div>
    </form>
  );
}
