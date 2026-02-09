import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../context/BoardContext.jsx";
import { useQuery, useQueryClient , useMutation } from "@tanstack/react-query";
import styles from "./BoardDetails.module.css";
import Employees from "../../layout/Employees.jsx";
import Lists from "../../layout/Lists.jsx";
import { ListContext } from "../../context/ListContext.jsx";
import ShareModal from "../../layout/ShareModal.jsx";
export default function BoardDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { getBoardByItsId } = useContext(BoardContext);
  const [boardDetails, setBoardDetails] = useState(null);
//   ----------------------------------------
  let { getListsByBoardId , createList } = useContext(ListContext);
//   --------------------------------------------
  const [isAddingList, setIsAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["boardDetails"],
    queryFn: () => getBoardByItsId(id),
  });


  const {
    data: listData,
    error: listError,
    isLoading: isListloading,
  } = useQuery({
    queryKey: ["lists", data?._id],
    queryFn: () => getListsByBoardId(data._id),
    enabled: !!data?._id,
  });

  const addListMutation = useMutation({
    mutationFn: (newList) => createList(newList), // Ensure this matches your API helper
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", data?._id]);
      setIsAddingList(false);
      setListTitle("");
    },
  });
  const handleAddList = () => {
    if (!listTitle.trim()) return;
    addListMutation.mutate({ title: listTitle, boardId: data._id });
  };

  useEffect(() => {
    console.log(data?._id);
    console.log(listData);
  }, [data , listData]);
 
  return (
    <div className={`${styles.bg_gredient} container p-0 vh-100 `}>
      <div
        className={`${styles.boardNav} ${styles.bg_dark_transparent} p-2 text-white d-flex align-items-center justify-content-between`}
      >
        <div>
          <h5>{data?.title}</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Employees users={data?.users} />
          {/* Trigger Icon */}
          <i 
            className={`${styles.cursor} fa-solid fa-user-plus`}
            onClick={() => setIsShareModalOpen(true)}
          ></i>
        </div>
        
      </div>
      <div className={`${styles.board}`}>
        
        {listData?.map((list) => (
          <Lists key={list._id} list={list} />
        ))}
        {isAddingList ? (
          <div className={`${styles.add_list_form} ${styles.list}`}> {/* Uses 'list' class for same width */}
            <input
              autoFocus
              className={`${styles.form_control} mb-3 p-1 w-100`} // Add margin-bottom for spacing
              placeholder="Enter list title..."
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button className={`${styles.btn_primary} btn  btn-sm text-white`} onClick={handleAddList}>Add list</button>
              <button className="btn btn-light btn-sm" onClick={() => setIsAddingList(false)}>X</button>
            </div>
          </div>
        ) : (
          <div className={`${styles.add_list}`} onClick={() => setIsAddingList(true)}>
            + Add another list
          </div>
        )}
      </div>
      {/* Share Modal Component */}
     
      
         {isShareModalOpen && (
        <div className={` ${styles.bg_dark_transparent} d-flex justify-content-center align-items-center position-absolute top-0 bottom-0 end-0 start-0 h-100`}>
            <ShareModal className=" m-auto"
            users={data?.users}  
          board={data}
          onClose={() => setIsShareModalOpen(false)} 
        />
            </div>
      )}
      
    </div>
  );
}
