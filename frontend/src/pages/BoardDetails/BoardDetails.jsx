import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../context/BoardContext.jsx";
import { useQuery, useQueryClient , useMutation } from "@tanstack/react-query";
import styles from "./BoardDetails.module.css";
import Employees from "../../layout/Employees.jsx";
import Lists from "../../layout/Lists.jsx";
import { ListContext } from "../../context/ListContext.jsx";
import TaskDetailModal from "../../components/TaskDetailModal.jsx";
import { TaskContext } from "../../context/TaskContext.jsx";
import { toast } from "react-toastify";

export default function BoardDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { getBoardByItsId } = useContext(BoardContext);
  const [boardDetails, setBoardDetails] = useState(null);
  const { EditTasks, DeleteTasks } = useContext(TaskContext);

  // Modal State
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
//   ----------------------------------------
  let { getListsByBoardId , createList } = useContext(ListContext);
//   --------------------------------------------
  const [isAddingList, setIsAddingList] = useState(false);
  const [listTitle, setListTitle] = useState("");

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

  useEffect(() => {
    console.log(data?._id);
    console.log(listData);
  }, [data, listData]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await EditTasks(taskId, updatedData);
      toast.success("Task updated successfully");
      setIsModalOpen(false);
      // Invalidate lists query to refresh data
      queryClient.invalidateQueries(["lists", data?._id]);
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await DeleteTasks(taskId);
      toast.success("Task deleted successfully");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["lists", data?._id]);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };


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
      <div className={`${styles.board}`}>
        {listData?.map((list) => (
          <Lists key={list._id} list={list} onTaskClick={handleTaskClick} />
        ))}

        <div className={`${styles.add_list}`}>+ Add another list</div>
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
