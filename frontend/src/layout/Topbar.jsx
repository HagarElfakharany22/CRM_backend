import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Topbar = ({user}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between align-items-center bg-white border-bottom p-3">
      {/* Search Input */}
      {/* <input
        type="text"
        placeholder="Search..."
        className="form-control me-3"
        style={{ maxWidth: "24rem" }} 
      /> */}
     <h3>hello <span style={{color:"#6495ED"}}>{user.name}</span></h3>
      {/* Right Section */}
      <div className="d-flex align-items-center gap-2">
        {/* <button className="btn btn-primary">
          + Create New
        </button> */}

        {/* User Avatar */}
        <div className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle fw-bold" 
             style={{ width: "2.5rem", height: "2.5rem" }}>
          {user.name.slice(0,2)}
        </div>
         <button className="btn btn-danger" onClick={() => logout(navigate)}>
        Log Out
      </button>
      </div>
    </div>
  );
};

export default Topbar;
