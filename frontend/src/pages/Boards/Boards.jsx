import React, { useEffect, useState , useContext } from 'react'
import { BoardContext } from '../../context/BoardContext.jsx'
import { useQuery } from '@tanstack/react-query';
import Board from '../Board/Board.jsx';
import styles from './Boards.module.css'
export default function Boards(){
    


    let {getAllBoards , BoardsData ,setBoardsData }= useContext(BoardContext)
    const {data, error, isLoading} = useQuery({
  queryKey: ["boards"],
  queryFn: getAllBoards,
});
    useEffect(()=>{
        console.log(data?.boards);
    })
     if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
    return(
      
        <div className={`${styles.bg_dark } p-0 m-0 h-100 `}>
            <i className={` ${styles.iconColor} icon-link fa-solid fa-heart ms-2 bg-white`}></i>
     <div className="container py-5 bg-dark">
      <div className="row">

     {data?.boards.map(item=>{
      return<>
      <Board item={item} key={item._id}/>
      </> 
     })}
      </div>
     </div>
    </div>
    )
}
