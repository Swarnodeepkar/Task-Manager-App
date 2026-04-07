import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }: TaskCardProps) => {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`bg-white rounded-xl shadow p-4 flex items-start gap-4 transition ${
        isCompleted ? 'opacity-70' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => onToggleStatus(task)}
        className="mt-1 h-4 w-4 cursor-pointer accent-blue-600"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`font-medium text-gray-800 truncate ${
            isCompleted ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
        <span
          className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
            isCompleted
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm text-red-400 hover:text-red-600 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
