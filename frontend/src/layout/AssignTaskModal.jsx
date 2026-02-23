import styles from './style.module.css';
import React, { useEffect, useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faList, faTag, faClock, faTrash, faTimes, faSave, faImage, faPaperclip, faExternalLinkAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { TaskContext } from '../context/TaskContext.jsx';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export default function AssignTaskModal({ board, handleModal }) {
    const queryClient = useQueryClient();
    let { AssignTask } = useContext(TaskContext);
    let [loading, setloading] = useState(true);
    const [showImageInput, setShowImageInput] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const fileInputRef = useRef(null);
    let [Errmsg, setErrmsg] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;
    const sendDataToApi = async (values, resetForm) => {
        setloading(false);
        try {
            // const response = await AssignTask({
            //     title: values.title,
            //     description: values.description,
            //     image:values.image,
            //     linkReference:values.linkReference,
            //     status:values.status,
            //     dueDate:values.dueDate,
            //     priority:values.priority,
            //     email:values.email,
            //     boardId:board._id
            // });
            const data = new FormData();

            data.append("title", values.title);
            data.append("description", values.description);
            data.append("linkReference", values.linkReference);
            data.append("status", values.status);
            data.append("priority", values.priority);
            data.append("dueDate", values.dueDate);
            data.append("email", values.email);
            data.append("boardId", board._id);

            if (selectedFile) {
                data.append("image", selectedFile);
            }

            const response = await AssignTask(data);
            console.log(response);
            setloading(true);
            if (response?.status == 'success') {
                setloading(false);
                toast.success("Task Assigned successfully !");
                resetForm();
                handleModal(false);
                queryClient.invalidateQueries({ queryKey: ["boards"] });
                //   setSelectedFiles([]); // يفضي الصور
            }

        } catch (err) {
            setErrmsg(err?.response?.data?.message);
            console.log(err);
        }
    };


    function validate(values) {
        const myError = {};

        if (!values.title) {
            myError.title = "Title is required";
        }
        if (!values.description) {
            myError.description = "Description is required";
        }
        if (!values.email) {
            myError.email = "email is required";
        }
        return myError;
    }
    let Register = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",
            linkReference: "",
            status: "",
            dueDate: "",
            priority: "",
            email: ""

        },
        validate,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            //convert values to JSON then send to API
            sendDataToApi(values, resetForm);
            // {isChecked? <AdminLayOut/> :<MainLayOut/>}
        },
    });
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(name, value);
    //     setFormData(prev => ({ ...prev, [name]: value }));
    // };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            // setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
        }
    };

    useEffect(() => {
        setShowImageInput(false);
        setShowLinkInput(false);
       
        console.log(`selectedFile : ${selectedFile}`);
        

    }, [selectedFile]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('blob:') || imagePath.startsWith('http')) {
            return imagePath;
        }
        return `${API_URL}/uploads/${imagePath}`;
    };

    return (
        <div className={`${styles.bg_dark_transparent} d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0 h-100`}>
            <div
                className={`${styles.formHolder} z-2 position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center`}
            >
                <div
                    className={`${styles.form} container bg-dark w-50 px-3 py-5 rounded-5`}
                >
                    {/* -----------------------------close form -------------------------------- */}
                    <i
                        onClick={() => handleModal(false)}
                        className={`${styles.closeIcon} fa-regular fa-circle-xmark text-danger fs-3 position-absolute`}
                    ></i>
                    <form onSubmit={Register.handleSubmit} className="my-4 text-center">
                        {/*-------------------------------------------  start  title -------------------------------*/}
                        <input
                            onBlur={Register.handleBlur}
                            value={Register.values.title}
                            onChange={Register.handleChange}
                            className={` ${styles.MyInput
                                } form-control Gray-Color rounded-5 mb-3    ${Register.errors.title ? "is-invalid" : ""
                                } `}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="title*"
                        />
                        {Register.errors.title && Register.touched.title ? (
                            <div className="alert alert-danger p-1">
                                {Register.errors.title}
                            </div>
                        ) : (
                            ""
                        )}

                        {/* ----------------------------------------------- end title ------------------------------------- */}

                        {/* ------------------------------------ start description -------------------------- */}

                        <input
                            onBlur={Register.handleBlur}
                            value={Register.values.description}
                            onChange={Register.handleChange}
                            className={` ${styles.MyInput
                                } form-control Gray-Color rounded-5   ${Register.errors.description ? "is-invalid" : ""
                                } `}
                            type="text"
                            name="description"
                            id="description"
                            placeholder="description*"
                        />
                        {Register.errors.description && Register.touched.description ? (
                            <div className="alert alert-danger p-1 mt-3">
                                {Register.errors.description}
                            </div>
                        ) : (
                            ""
                        )}

                        {/* ------------------------------------------ end description ---------------------------- */}

                        {/* ------------------------------------------ start attachements ------------------------ */}

                        <button className={`${styles.MyInput} rounded-5 btn btn-light btn-sm w-100 text-start my-3`} onClick={() => setShowLinkInput(!showLinkInput)} type='button'>
                            <i className="fa-solid fa-paperclip text-muted"></i> Attachment
                        </button>
                        {(Register.values.linkReference || showLinkInput) && (
                            <div className="mb-4">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <i class="fa-solid fa-paperclip text-muted"></i>
                                    <h6 className="fw-bold mb-0">Attachments</h6>
                                </div>

                                {Register.values.linkReference && (
                                    <div className="card mb-2">
                                        <div className="card-body p-2 d-flex align-items-center gap-3">
                                            <div className="bg-light rounded p-3 text-muted">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} size="lg" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="fw-bold text-truncate">Link Reference</div>
                                                <a href={Register.values.linkReference} target="_blank" rel="noopener noreferrer" className="small text-primary text-decoration-none text-truncate d-block">
                                                    {Register.values.linkReference}
                                                </a>
                                            </div>
                                            <button className="btn btn-sm btn-light" onClick={() => setFormData(prev => ({ ...prev, linkReference: '' }))}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {showLinkInput && (
                                    <div className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Paste link URL here..."
                                            name="linkReference"
                                            value={Register.values.linkReference || ''}
                                            onChange={Register.handleChange}
                                            autoFocus
                                        />
                                        <button className="btn btn-outline-secondary" onClick={() => setShowLinkInput(false)}>Done</button>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* ------------------------------------------ end attachements ------------------------- */}
                        {/* ------------------------------------------- start image -------------------- */}
                        <button type='button' className="rounded-5  btn btn-light btn-sm w-100 text-start " onClick={() => setShowImageInput(!showImageInput)}>
                            <i className="fa-solid fa-image text-muted me-2"></i> Cover
                        </button>
                        {showImageInput && (
                            <div className="">
                                <div className="d-flex gap-2 mb-1">
                                    <button className="btn btn-outline-primary btn-sm m-auto mt-2" onClick={() => fileInputRef.current.click()}>
                                        <FontAwesomeIcon icon={faUpload} className="me-2" /> Upload from Computer
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </div>
                                <div className="text-center  small my-2 text-white">- OR -</div>
                                <div className="input-group mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Paste image URL here..."
                                        name="image"
                                        value={Register.values.image || ''}
                                        onChange={Register.handleChange}
                                        autoFocus
                                    />
                                    <button className="btn btn-outline-secondary" onClick={() => {
                                        console.log(`Register.values.image : ${Register.values.image}`);
                                        
                                        setSelectedFile(Register.values.image)
                                        setShowImageInput(false)
                                    }}>Done</button>
                                </div>
                            </div>
                        )}
                        {/* -------------------------------------------- emd image ----------------------- */}
                        {/* ------------------------------------------- start status ---------------------- */}
                        <div className="rounded-5 my-3">
                            {/* <label className="text-uppercase text-muted fw-bold small mb-1">Status</label> */}
                            <select
                                className="form-select form-select-sm rounded-5"
                                name="status"
                                value={Register.values.status || 'Pending'}
                                onChange={Register.handleChange}
                            >
                                <option hidden>status</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        {/* ------------------------------------------- end status ---------------------------- */}
                        {/* ------------------------------------------ start priority -------------------------- */}
                        <div className="rounded-5 mb-3">
                            <select
                                className="form-select form-select-sm rounded-5"
                                name="priority"
                                value={Register.values.priority}
                                onChange={Register.handleChange}

                            >
                                <option hidden >priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        {/* ------------------------------------------ end priority ----------------------------- */}
                        {/* ----------------------------------------- start email ------------------------------ */}
                        <input
                            onBlur={Register.handleBlur}
                            value={Register.values.email}
                            onChange={Register.handleChange}
                            className={` ${styles.MyInput
                                } form-control Gray-Color rounded-5 mb-3    ${Register.errors.email ? "is-invalid" : ""
                                } `}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email*"
                        />
                        {Register.errors.email && Register.touched.email ? (
                            <div className="alert alert-danger p-1">
                                {Register.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                        {/* ------------------------------------------ end email --------------------------------- */}
                        {/* ----------------------------------------- start deadline ---------------------------- */}
                        <div className="mb-4 text-start">
                            <label className=" text-white fw-bold small mb-1">Deadline :</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                name="dueDate"
                                value={Register.values.dueDate ? Register.values.dueDate.split('T')[0] : ''}
                                onChange={Register.handleChange}
                            />
                        </div>
                        {/* ----------------------------------------- end deadline ------------------------------- */}
                        {Errmsg ? <div className="alert alert-danger">{Errmsg}</div> : ""}
                        <button
                            disabled={!(Register.dirty && Register.isValid)}
                            type="submit"
                            className={`btn mt-3 form-control rounded-5 ${Register.dirty && Register.isValid
                                ? "bg-success text-white"
                                : "bg-secondary text-light"
                                }`}
                        >
                            {loading ? (
                                "Submit"
                            ) : (
                                <i className="fa fa-spinner fa-spin main-color"></i>
                            )}
                        </button>
                        {/* <label ><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> admin</label> */}
                    </form>
                </div>
            </div>
        </div>
    );
}
