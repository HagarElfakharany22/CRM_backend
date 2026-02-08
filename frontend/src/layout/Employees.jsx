import styles from './style.module.css'
export default function Employees({ users }) {
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
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

  return (
    <div className={`${styles.board_employees}`}>
      {users.map((user, index) => (
        <div
          key={user._id}
          className={`${styles.user_avatar}`}
          style={{ backgroundColor: getColor(index) }}
          title={user.email}
        >
          {getInitials(user.name)}
        </div>
      ))}
    </div>
  );
}
