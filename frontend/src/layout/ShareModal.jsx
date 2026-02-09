// import React, { useState } from "react";
// import styles from "./style.module.css";

// export default function ShareModal({ board, onClose , users }) {
//   const [email, setEmail] = useState("");

//   const handleShare = () => {
//     console.log("Sharing with:", email);
//     // Add your share mutation logic here
//   };

//   return (
//     <div className={styles.modal_backdrop} onClick={onClose}>
//       <div className={styles.share_modal_content} onClick={(e) => e.stopPropagation()}>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5 className="m-0">Share board</h5>
//           <button className="btn-close" onClick={onClose}></button>
//         </div>

//         <div className="d-flex gap-2 mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Email address or name"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <select className="form-select w-auto">
//             <option>Member</option>
//             <option>Observer</option>
//           </select>
//           <button className="btn btn-primary px-4" onClick={handleShare}>Share</button>
//         </div>

//         <div className={`${styles.share_link_section} p-2 mb-4 d-flex align-items-center gap-3`}>
//           <div className={styles.link_icon_box}>
//             <i className="fa-solid fa-link"></i>
//           </div>
//           <div>
//             <div className="fw-bold small">Share this board with a link</div>
//             <a href="#" className="small text-decoration-underline">Create link</a>
//           </div>
//         </div>

//         <div className="border-bottom mb-3 pb-2">
//           <span className="fw-bold small me-3 border-bottom border-primary border-3 pb-2">Board members</span>
//           <span className="text-muted small">Join requests</span>
//         </div>

//         {/* Member List */}
//         <div className="d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center gap-2">
//             <div className={styles.user_avatar_large}>HM</div>
//             <div>
//               <div className="fw-bold small">hana mohsen (you)</div>
//               <div className="text-muted small">@hana2003mohsen1 • Workspace admin</div>
//             </div>
//           </div>
//           <select className="form-select form-select-sm w-auto border-0 bg-light">
//             <option>Admin</option>
//             <option>Member</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./style.module.css";

export default function ShareModal({ board, onClose }) {
  const [inviteEmail, setInviteEmail] = useState("");
  const queryClient = useQueryClient();

  // Mutation to add a member to the board
  const addMemberMutation = useMutation({
    mutationFn: async (email) => {
      // Replace with your API call: e.g., axios.post(`/boards/${board._id}/members`, { email })
      console.log(`Adding ${email} to board ${board._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["boardDetails"]);
      setInviteEmail(""); // Clear input after success
    },
  });

  const handleShare = () => {
    if (inviteEmail.trim()) {
      addMemberMutation.mutate(inviteEmail);
    }
  };

  return (
    <div className={styles.modal_backdrop} onClick={onClose}>
      <div className={styles.share_modal_content} onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0">Share board</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {/* Input for NEW members */}
        <div className="d-flex gap-2 mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email address or name"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <button 
            className="btn btn-primary px-4" 
            onClick={handleShare}
            disabled={addMemberMutation.isPending}
          >
            {addMemberMutation.isPending ? "Adding..." : "Share"}
          </button>
        </div>

        <div className="border-bottom mb-3 pb-2">
          <span className="fw-bold small me-3 border-bottom border-primary border-3 pb-2">
            Board members ({board?.users?.length || 0})
          </span>
        </div>

        {/* Dynamic Member List from Board Data */}
        <div className={styles.member_list_container}>
          {board?.users?.map((user) => (
            <div key={user._id} className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className={styles.user_avatar_large}>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="fw-bold small">{user.name} {user.isOwner ? "(Owner)" : ""}</div>
                  <div className="text-muted small">{user.email}</div>
                </div>
              </div>
              {/* <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>{user.role || "Member"}</option>
                <option>Admin</option>
                <option>Observer</option>
              </select> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}