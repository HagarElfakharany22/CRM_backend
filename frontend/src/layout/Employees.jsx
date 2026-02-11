import styles from './style.module.css'
import { useEffect , useState } from 'react';
export default function Employees({ users , owner }) {

  // let [data , setData] = useState([])
    const colors = [
  "#f97316", // orange
  "#6366f1", // indigo
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#22c55e", // green
];


function getColor(index) {
  return colors[index % colors.length];
}

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const data = owner ? [...users, owner] : users;
useEffect(()=>{
  // const boardUsers = users ? JSON.parse(JSON.stringify(users)) : [];
  // boardUsers.push(owner);
  // setData(boardUsers);
  // console.log(boardUsers);
  
} , [users , owner])
  return (

    <div className={`${styles.board_employees}`}>
      {/* {console.log(users)
      } */}
      {data?.map((user, index) => (
        <div
          key={user?._id}
          className={`${styles.user_avatar}`}
          style={{ backgroundColor: getColor(index) }}
          title={user?.email}
        >
          {getInitials(user?.name)}
        </div>
      ))}
    </div>
  );
}
