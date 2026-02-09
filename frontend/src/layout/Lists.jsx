import { useContext , useEffect , useState } from "react"
import { ListContext } from "../context/ListContext.jsx";
import { useQuery , useQueryClient ,useMutation } from "@tanstack/react-query";
import TaskCard from "./TaskCard.jsx";
import styles from './style.module.css'
import { TaskContext } from "../context/TaskContext.jsx";
export default function Lists({list}){

    const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const queryClient = useQueryClient();
  const { AddTask } = useContext(TaskContext);

  const addTaskMutation = useMutation({
    mutationFn: (newTask) => AddTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries(["lists", list.boardId]);
      setIsAddingTask(false);
      setTaskTitle("");
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
      
    } , [])

    return (
    <div className={`${styles.list}`}>
      <div className={`${styles.list_header}`}>
        <span>{list.title}</span>
        <span className={`${styles.cursor}`}>•••</span>
      </div>

      <div className={`${styles.tasks}`}>
        {list.tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
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
// return (
//     <div className="list">
//       <div className="list-header">
//         <span>{list.title}</span>
//         <span>•••</span>
//       </div>

//       <div className="tasks">
//         {list.tasks.map((task) => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>

//       {isAddingTask ? (
//         <div className="mt-2">
//           <textarea
//             autoFocus
//             className={`${styles.form_control} mb-2`}
//             placeholder="Enter a title for this card..."
//             value={taskTitle}
//             onChange={(e) => setTaskTitle(e.target.value)}
//           />
//           <div className="d-flex gap-2">
//             <button className={`${styles.btn_primary} btn  btn-sm`} onClick={handleAddTask}>Add card</button>
//             <button className="btn-close ms-2 mt-1" onClick={() => setIsAddingTask(false)}></button>
//           </div>
//         </div>
//       ) : (
//         <button className={`${styles.add_card}`} onClick={() => setIsAddingTask(true)}>
//           + Add a card
//         </button>
//       )}
//     </div>
//   );
}