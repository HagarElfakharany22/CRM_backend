import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Board.module.css';

export default function Board({ item }){




    return(
        <>
        
      <div className="col-lg-4 col-sm-4 rounded-4 pt-5 ">
        <div className={`${styles.product} text-white cursor-pointer rounded-3 gray-border my-3 w-100 h-100 pt-5 ps-1`}>
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