

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const statusOptions = ["new", "contacted", "qualified", "lost"];
const sourceOptions = ["website", "facebook", "referral", "manual"];

const LeadForm = ({ initialValues, onSubmit, isEdit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "new",
      source: "manual",
      ...initialValues, // ensures edit data overrides defaults
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      company: Yup.string().required("Company is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      status: Yup.string()
        .oneOf(statusOptions)
        .required("Status is required"),
      source: Yup.string()
        .oneOf(sourceOptions)
        .required("Source is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Name */}
      <div className="mb-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger small">{formik.errors.name}</div>
        )}
      </div>

      {/* Company */}
      <div className="mb-3">
        <input
          type="text"
          name="company"
          placeholder="Company"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.company}
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>

      {/* Phone */}
      <div className="mb-3">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
      </div>

      {/* Status Select */}
      <div className="mb-3">
        <select
          name="status"
          className="form-select"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {formik.touched.status && formik.errors.status && (
          <div className="text-danger small">{formik.errors.status}</div>
        )}
      </div>

      {/* Source Select */}
      <div className="mb-3">
        <select
          name="source"
          className="form-select"
          value={formik.values.source}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {sourceOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        {formik.touched.source && formik.errors.source && (
          <div className="text-danger small">{formik.errors.source}</div>
        )}
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {isEdit ? "Update Lead" : "Add Lead"}
      </button>
    </form>
  );
};

export default LeadForm;