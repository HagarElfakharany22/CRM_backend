import { useContext, useEffect, useState } from "react"
import { BoardContext } from "../context/BoardContext.jsx";
import { ListContext } from "../context/ListContext.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import TaskCard from "./TaskCard.jsx";
import styles from './style.module.css'
import { TaskContext } from "../context/TaskContext.jsx";
export default function AssignedTasksLists({ list, onTaskClick }) {

    useEffect(() => {
        console.log(list);

    }, [list])

    return (

        <div className={`${styles.list} position-relative`}>
            <div className={`${styles.assigndTaskslist_header}`}>
                <span className=" me-2 text-success">{list?.userId?.name}</span>
                <span className="p-0 m-0">{list.title}</span>

            </div>
            <div className={`${styles.tasks}`}>
                {list.tasks.map((task) => (
                    task.status !== 'done' && <TaskCard key={task._id} task={task} onClick={onTaskClick} />
                ))}
            </div>


        </div>
    );

}