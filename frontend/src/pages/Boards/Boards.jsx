import React, { useEffect, useState , useContext } from 'react'
import { BoardContext } from '../../context/BoardContext.jsx'



export default function Boards(){
    let {getAllBoards}= useContext(BoardContext)
    async function getAllBoardsFunc(){
        let data= await getAllBoards()
        console.log(data)
    }
    useEffect(()=>{

        
        getAllBoardsFunc()
    })
    
    return(
        <div className='Dark-Color pt-5'>
     
     <div className="container py-5">
      <div className="row">

     {/* {data?.data?.products?.map(item=>{
      return <Product item={item} key={item._id}/>
     })} */}
      </div>
     </div>
    </div>
    )
}
