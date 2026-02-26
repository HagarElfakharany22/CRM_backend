import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardContext } from "../context/BoardContext.jsx";
import styles from "./style.module.css";

export default function ShareModal({ board, onClose, onSubmit }) {
  const [inviteEmail, setInviteEmail] = useState("");
  // let [users , setUsers] = useState([])
  let [showShareModal, setShowShareModal] = useState(true);
  const { addUserToBoard, deleteMember } = useContext(BoardContext);
  const [isDeleteMember, setDeletedMember] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null); // Store the user object or ID here
  const queryClient = useQueryClient();

  // Mutation to add a member to the board
  const addMemberMutation = useMutation({
    mutationFn: async (email) => addUserToBoard(board._id, email)
    ,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boardDetails", board._id] });
      queryClient.refetchQueries({ queryKey: ["boardDetails", board._id] });
      onClose();
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: ({ boardId, userId }) => deleteMember(boardId, userId),
    onSuccess: async () => {
      setDeletedMember(false)
      await queryClient.invalidateQueries({ queryKey: ["boardDetails", board._id] });
      queryClient.refetchQueries({ queryKey: ["boardDetails", board._id] });
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
  console.log(board);
  console.log(users);

  // const users = board
  //   ? [...board.users, board.owner]
  //   : [];
  useEffect(() => {
    // const boardUsers = board ? JSON.parse(JSON.stringify(board?.users)) : [];
    // boardUsers.push(board?.owner);
    // setUsers(boardUsers);


  }, [board, onClose])

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
                placeholder="Email address"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <button
                className={`btn btn-primary px-4 btn  ${styles.btn_main}`}
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
                  <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center gap-2">
                      <div className={`${styles.user_avatar_large}`}>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        {/* {(user._id == board) ? "(Owner)" : ""} */}
                        <div className="fw-bold small">{user.name} {(user._id == board.owner._id) ? "(Owner)" : ""}</div>
                        <div className="text-muted small">{user.email}</div>
                      </div>
                    </div>

                    {/*------------ delete icon---------- */}
                    {
                      user._id != board.owner._id && user.role != `admin` && user.role != `leader` ? (
                        <i class={`fa-solid fa-user-minus ${styles.cursor}`} onClick={() => setMemberToDelete(user)}></i>
                      ) : null
                    }
                    {/*---------------------------- start delete member ----------------------- */}
                    {memberToDelete && (
                      <div className={`${styles.deleteMemberCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`}>
                        <div className={`p-5 bg-light rounded-3`}>
                          <h5 className="text-center mb-4">Remove {memberToDelete.name}?</h5>
                          <div className="d-flex justify-content-between">
                            <button
                            className="btn btn-danger me-2"
                            onClick={() => deleteMemberMutation.mutate({
                              boardId: board._id,
                              userId: memberToDelete._id
                            })}
                          >
                            Delete
                          </button>
                          <button className="btn btn-secondary" onClick={() => setMemberToDelete(null)}>
                            Cancel
                          </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {/*---------------------------- end delete member ----------------------- */}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}