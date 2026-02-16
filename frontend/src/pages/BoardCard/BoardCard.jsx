import React, { useContext, useState, useEffect } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import styles from './BoardCard.module.css';

export default function Board({ item }){
      const navigate = useNavigate();
      const [menuOptions, setMenuOptions] = useState(false);

    return(
        <>
        
        {/* onClick={()=>navigate("/boards/" + item._id)} */}
      <div className={`col-lg-4 col-sm-4 rounded-4 pt-5 `} >
        
        <div className={`${styles.product} text-white cursor-pointer rounded-3 gray-border my-3 w-100 h-100 pt-5 ps-1 position-relative`}>
          <i class={`fa-solid fa-ellipsis-vertical  position-absolute fs-4 ${styles.threeDots}`} onClick={()=>setMenuOptions(!menuOptions)}></i>
           {/* --------- start list options menu ---------- */}
                {
                 menuOptions && ( 
                 <div className={`${styles.optionsCard} bg-white position-absolute z-1 w-75 rounded-2`}>
                  <h6 className={`${styles.optionsItems} ${styles.firstItem}  text-dark`}  onClick={()=>{
                    // setDeletedList(true)
                    }}>Delete</h6>
                  <div className={`${styles.divider}`}></div>
                  <h6 className={`${styles.optionsItems} text-dark`} onClick={()=>{
                    // setUpdateList(true)
                    // setMenuOptions(!menuOptions)
                  }}>EDIT</h6>
                </div>
                )
                }
              
                {/* --------- end list options menu ---------- */}
          {/* start link to product details */}
          <Link className="un-underline text-white text-decoration-none" to={"/boards/" + item._id}>
            {/* <span className='main-color'>{item.category.name}</span> */}
             <h3 className="my-2 fw-bold ">
              {item.title}
              {/* {item.description.split(" ").slice(0, 2).join(" ")} */}
            </h3>
            <h5 className="my-2 fw-bold fs-6">
              {item.description}
              {/* {item.description.split(" ").slice(0, 2).join(" ")} */}
            </h5>
            
          </Link>
          {/* end link to product details */}
        
        </div>
      </div>
    </>
    )
}