import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import { Task, TaskPayload, TaskStatus } from '../types';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const { data } = await api.get<Task[]>('/tasks', { params });
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (payload: TaskPayload) => {
    await api.post('/tasks', payload);
    setShowForm(false);
    fetchTasks();
  };

  const handleUpdate = async (payload: TaskPayload) => {
    if (!editingTask) return;
    await api.put(`/tasks/${editingTask._id}`, payload);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: TaskStatus = task.status === 'pending' ? 'completed' : 'pending';
    await api.put(`/tasks/${task._id}`, { ...task, status: newStatus });
    fetchTasks();
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          {!showForm && !editingTask && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Task
            </button>
          )}
        </div>

        <FilterBar current={filter} onChange={setFilter} />

        {(showForm || editingTask) && (
          <TaskForm
            initial={editingTask}
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
          />
        )}

        {loading ? (
          <p className="text-center text-gray-400 mt-10">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No tasks found. Add one above!</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TasksPage;
