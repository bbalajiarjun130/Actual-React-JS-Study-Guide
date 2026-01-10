import React from 'react';
import { GripVertical } from 'lucide-react';

export default function TaskCard({ task, columnKey, onDragStart, onDelete, animationDelay }) {
  const handleDragStart = (e) => {
    onDragStart(task, columnKey);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="task-card bg-white rounded-xl p-4 shadow-md border-2 border-slate-100 cursor-move group"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-start gap-3">
        <GripVertical 
          className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 mt-0.5" 
          size={20} 
        />
        <p className="text-slate-700 flex-1 leading-relaxed">
          {task.text}
        </p>
        <button
          onClick={() => onDelete(columnKey, task.id)}
          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
