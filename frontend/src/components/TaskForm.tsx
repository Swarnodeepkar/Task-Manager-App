import React, { useState, useEffect } from 'react';
import { Task, TaskPayload } from '../types';

interface TaskFormProps {
  initial?: Task | null;
  onSubmit: (payload: TaskPayload) => Promise<void>;
  onCancel: () => void;
}

const TaskForm = ({ initial, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description);
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), description: description.trim() });
    } catch {
      setError('Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {initial ? 'Edit Task' : 'New Task'}
      </h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        placeholder="Description (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? 'Saving...' : initial ? 'Update' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
