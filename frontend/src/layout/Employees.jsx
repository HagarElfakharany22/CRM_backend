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
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

  return (
    <div className={`${styles.board_employees}`}>
      {users?.map((user, index) => (
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
