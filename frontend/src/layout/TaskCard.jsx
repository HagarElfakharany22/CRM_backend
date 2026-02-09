import styles from './style.module.css'
export default function TaskCard({ task }) {
  return (
    <div className={`${styles.task}`}>
      {task.title}
    </div>
  );
}
