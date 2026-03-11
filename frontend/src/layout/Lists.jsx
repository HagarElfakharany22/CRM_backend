import { useContext , useEffect , useState } from "react"
import { ListContext } from "../context/ListContext.jsx";
import { useQuery , useQueryClient ,useMutation } from "@tanstack/react-query";
import TaskCard from "./TaskCard.jsx";
import styles from './style.module.css'
import { TaskContext } from "../context/TaskContext.jsx";
export default function Lists({list , onTaskClick}){

    const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [menuOptions, setMenuOptions] = useState(false);
  const [isDeleteList, setDeletedList] = useState(false);
  const [isUpdateList, setUpdateList] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);

  const queryClient = useQueryClient();
  const { AddTask , getAllAssignedTasks, updateTaskList  } = useContext(TaskContext);
  const { deleteList , updateList} = useContext(ListContext);

  const addTaskMutation = useMutation({
    mutationFn: (newTask) => AddTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", list.boardId]);
      setIsAddingTask(false);
      setTaskTitle("");
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: () => deleteList(list._id),
    onSuccess:  async() => {
      setDeletedList(false)
      await queryClient.invalidateQueries({queryKey: ["lists", list.boardId]});
      queryClient.refetchQueries({ queryKey: ["lists", list.boardId] });
  onClose();
    },
  });

  const updateListMutation = useMutation({
    mutationFn: (data) => updateList(list._id , data),
    onSuccess:  async() => {
      setUpdateList(false)
      await queryClient.invalidateQueries({queryKey: ["lists", list.boardId]});
      queryClient.refetchQueries({ queryKey: ["lists", list.boardId] });
  onClose();
    },
  });

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;
   let userId=localStorage.getItem("user")?._id;
    
    // Note: You'll need the current User ID from your Auth context
    addTaskMutation.mutate({
      title: taskTitle,
      listId: list._id,
      description: "New task", // Default values to satisfy schema
      deadline: new Date(),    // Default value
      userId,  // Replace with actual logged-in user ID
    });
  };

    useEffect(()=>{
      


  }, [list])
  // move task 
const updateTaskMutation = useMutation({
   mutationFn: ({ taskId, listId, changedListId }) =>
    updateTaskList(taskId, listId, changedListId),

  onSuccess: () => {
    queryClient.invalidateQueries(["lists", list.boardId]);
  },
});
const moveTask = (taskId, newListId, oldListId) => {
  console.log("mooove");
  updateTaskMutation.mutate({
    taskId,
    listId: newListId,
    changedListId: oldListId
  });
};

  return (
    <div className={`${styles.list} position-relative`}>
      <div className={`${styles.list_header}`}>
        <span>{list.title}</span>
        <span className={`${styles.cursor}`} onClick={()=>setMenuOptions(!menuOptions)}>•••</span>
      </div>
      {/* --------- start list options menu ---------- */}
      {
       menuOptions && ( 
       <div className={`${styles.optionsCard} bg-white position-absolute z-1 w-75 rounded-2`}>
        <h6 className={`${styles.optionsItems} ${styles.firstItem} position-relative `}  onClick={()=>setDeletedList(true)}>Delete</h6>
        <div className={`${styles.divider}`}></div>
        <h6 className={`${styles.optionsItems}`} onClick={()=>{
          setUpdateList(true)
          setMenuOptions(!menuOptions)
        }}>EDIT</h6>
      </div>
      )
      }
      {/*---------------------------- start delete list ----------------------- */}
      {
        isDeleteList &&(
          <div className={`${styles.deleteCheckHolder} z-2 position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center`} >
        <div className={`p-5 bg-light rounded-3`}>
          <h5 className="text-center mb-4">Are You Sure ?  </h5>
          <button className={`py-2 px-5 rounded-3 border-0 me-2 bg-danger text-white`} onClick={()=>deleteListMutation.mutate()}>Delete</button>
        <button className={`py-2 px-5 rounded-3 border-1  me-2`} onClick={()=>setDeletedList(false)}>Cancel</button>
        </div>
      </div>
        )
      }
      {/*---------------------------- end delete list ----------------------- */}

      {/* -------------------------start edit lists ---------------- */}
      {isUpdateList && (
  <div className="d-flex gap-2 align-items-center mt-2">
    <input
      type="text"
      className="form-control form-control-sm"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      autoFocus
    />
    <button
      className="btn btn-sm btn-success"
      onClick={() => {
        updateListMutation.mutate({ title: editTitle })
        // Call your updateList function from context
        // updateList(list._id, { title: editTitle });
        // setUpdateList(false);
      }}
    >
      Save
    </button>
    <button
      className="btn btn-sm btn-secondary"
      onClick={() => {
        setEditTitle(list.title);
        setUpdateList(false);
      }}
    >
      Cancel
    </button>
  </div>
) }

      {/* ------------------------- end edit lists ---------------------- */}
      {/* --------- end list options menu ---------- */}

<div
  className={`${styles.tasks}`}
  onDragOver={(e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; // ← add this
  }}
  onDrop={(e) => {
    e.preventDefault();
  const taskId = e.dataTransfer.getData("taskId");
  const currentListId = e.dataTransfer.getData("currentListId"); // ناخد الليست الأصلية
  console.log("drop taskId",taskId);
  console.log("drop currentListId",currentListId)
 if (currentListId !== list._id) { // ← toString() for safe compare
    moveTask(taskId, list._id, currentListId);
  }
  }}

>
        {list.tasks.map((task) => (
          task.status !== 'done' &&<TaskCard key={task._id} task={task} onClick={onTaskClick} />
        ))}
      </div>
      {isAddingTask ? (
        <div className="mt-2">
          <textarea
            autoFocus
            className="form-control mb-2"
            placeholder="Enter a title for this card..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleAddTask}>Add card</button>
            <button className="btn-close ms-2 mt-1" onClick={() => setIsAddingTask(false)}></button>
          </div>
        </div>
      ) : (
        <button className={`${styles.add_card}`} onClick={() => setIsAddingTask(true)}>
          + Add a card
        </button>
      )}
     
    </div>
  );

}