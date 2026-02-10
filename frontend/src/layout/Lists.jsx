import { useContext, useEffect } from "react"
import { ListContext } from "../context/ListContext.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TaskCard from "./TaskCard.jsx";
import styles from './style.module.css'
export default function Lists({ list, onTaskClick }) {

  useEffect(() => {

  }, [])

  return (
    <div className={`${styles.list}`}>
      <div className={`${styles.list_header}`}>
        <span>{list.title}</span>
        <span>•••</span>
      </div>

      <div className={styles.tasks}>
        {list.tasks.map((task) =>
          task.status !== 'done' && (
            <TaskCard
              key={task._id}
              task={task}
              onClick={onTaskClick}
            />
          )
        )}
      </div>


      <button className={`${styles.add_card}`}>
        + Add a card
      </button>
    </div>
  );
}