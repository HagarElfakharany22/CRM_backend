import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../context/BoardContext.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./BoardDetails.module.css";
import Employees from "../../layout/Employees.jsx";
import Lists from "../../layout/Lists.jsx";
export default function BoardDetails() {
  const { id } = useParams();
  const { getBoardByItsId } = useContext(BoardContext);
  const [boardDetails, setBoardDetails] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["boardDetails"],
    queryFn: () => getBoardByItsId(id),
  });

  useEffect(() => {
    console.log(data?._id);
  }, [data]);

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
        </div>
       
      </div>
       <Lists boardId={data?._id} />
    </div>
  );
}
