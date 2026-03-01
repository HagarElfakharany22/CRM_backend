import React from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";
import * as Yup from "yup";

export default function ContactsForm({ initialValues, onSubmit, isEdit }) {
  const formik = useFormik({
    enableReinitialize: true, // important for edit mode
    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      company: Yup.string().required("Company is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values); // send data to parent -> API
    },
  });

  return (
    <form className="row g-3" onSubmit={formik.handleSubmit}>
      
      {/* Name */}
      <div className="col-12">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Enter name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-danger small">{formik.errors.name}</div>
        )}
      </div>

      {/* Company */}
      <div className="col-12">
        <label className="form-label">Company</label>
        <input
          type="text"
          name="company"
          className="form-control"
          placeholder="Enter company"
          value={formik.values.company}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.company && formik.errors.company && (
          <div className="text-danger small">{formik.errors.company}</div>
        )}
      </div>

      {/* Email */}
      <div className="col-12">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger small">{formik.errors.email}</div>
        )}
      </div>

      {/* Phone */}
      <div className="col-12">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Enter phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-danger small">{formik.errors.phone}</div>
        )}
      </div>

      {/* Title */}
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

      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100">
          {isEdit ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}