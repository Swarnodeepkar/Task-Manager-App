import React from 'react';
import { TaskStatus } from '../types';

interface FilterBarProps {
  current: 'all' | TaskStatus;
  onChange: (filter: 'all' | TaskStatus) => void;
}

const FilterBar = ({ current, onChange }: FilterBarProps) => {
  const options: Array<'all' | TaskStatus> = ['all', 'pending', 'completed'];

  return (
    <div className="flex gap-2 my-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
            current === opt
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
          }`}
        >
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
