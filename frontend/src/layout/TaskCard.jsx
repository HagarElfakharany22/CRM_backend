import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperclip, faImage, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

export default function TaskCard({ task, onClick }) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className={`${styles.task} card shadow-sm mb-2 p-2 border-0`} onClick={() => onClick(task)} style={{ cursor: 'pointer' }}>

      {/* Cover Image Preview if exists */}
      {task.image && (
        <div className="mb-2 rounded overflow-hidden" style={{ height: '120px' }}>
          <img src={task.image} alt="cover" className="w-100 h-100 object-fit-cover" />
        </div>
      )}

      {/* Title */}
      <div className="fw-semibold mb-2">{task.title}</div>

      {/* Badges / Meta */}
      <div className="d-flex gap-2 flex-wrap text-muted small align-items-center">

        {/* Due Date Badge */}
        {task.dueDate && (
          <span className={`badge ${isOverdue ? 'bg-danger' : 'bg-light text-dark border'} d-flex align-items-center gap-1`}>
            <FontAwesomeIcon icon={faClock} />
            {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        )}

        {/* Indicators */}
        {task.description && <FontAwesomeIcon icon={faAlignLeft} title="Has description" />}
        {task.linkReference && <FontAwesomeIcon icon={faPaperclip} title="Has attachment" />}

        {/* Priority Badge */}
        {task.priority === 'High' && <span className="badge bg-danger-subtle text-danger border border-danger p-1 px-2">High</span>}
      </div>
    </div>
  );
}
