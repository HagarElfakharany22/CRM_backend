import React, { useState , useContext , useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardContext } from "../context/BoardContext.jsx";
import styles from "./style.module.css";

export default function ShareModal({ board, onClose , onSubmit }) {
  const [inviteEmail, setInviteEmail] = useState("");
  // let [users , setUsers] = useState([])
  let [showShareModal , setShowShareModal]= useState(true);
  const { addUserToBoard } = useContext(BoardContext);
  const queryClient = useQueryClient();

  // Mutation to add a member to the board
  const addMemberMutation = useMutation({
    mutationFn: async (email) =>addUserToBoard(board._id, email)
    ,
    onSuccess: (updatedBoard) => {
      
      queryClient.setQueryData(
    ["boardDetails", updatedBoard?.board?._id],
    updatedBoard?.board
  );
  console.log(updatedBoard?.board);
  
  onClose();
    },
  });
  
  const handleShare = () => {
    if (inviteEmail.trim()) {
      addMemberMutation.mutate(inviteEmail);
    }
  };
  const users = [
  ...(Array.isArray(board?.users) ? board.users : []),
  ...(board?.owner ? [board.owner] : []),
];
// const users = board
//   ? [...board.users, board.owner]
//   : [];
  useEffect(()=>{
    // const boardUsers = board ? JSON.parse(JSON.stringify(board?.users)) : [];
    // boardUsers.push(board?.owner);
    // setUsers(boardUsers);
    
    
  } , [board , onClose ])

  return (
    <>
    {showShareModal && (
      <div className={`${styles.modal_backdrop}`} onClick={onClose}>
      <div className={`${styles.share_modal_content}`} onClick={(e) => e.stopPropagation()}>
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
            Board members ({users?.length || 0})
          </span>
        </div>

        {/* Dynamic Member List from Board Data */}
        <div className={`${styles.member_list_container}`}>
          {users?.map((user) => (
            <div key={user._id} className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div className={`${styles.user_avatar_large}`}>
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
    )}
    </>
  );
}