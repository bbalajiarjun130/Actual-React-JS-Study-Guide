import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

export default function Column({ 
  columnKey, 
  config, 
  tasks, 
  onDragStart, 
  onDrop, 
  onAddTask, 
  onDeleteTask,
  animationDelay 
}) {
  const [showInput, setShowInput] = useState(false);
  const [taskInput, setTaskInput] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop(columnKey);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    
    onAddTask(columnKey, taskInput);
    setTaskInput('');
    setShowInput(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div
      className="column slide-in flex-shrink-0 w-80"
      style={{ animationDelay: `${animationDelay}s` }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col noise-texture min-h-[700px]">
        <div className={`bg-gradient-to-r ${config.color} p-6 text-white`}>
          <h2 className="text-2xl font-bold tracking-tight flex items-center justify-between">
            {config.title}
            <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full backdrop-blur">
              {tasks.length}
            </span>
          </h2>
        </div>
        
        <div className="p-6 flex-1 space-y-3 overflow-y-auto max-h-[600px]">
          {tasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              columnKey={columnKey}
              onDragStart={onDragStart}
              onDelete={onDeleteTask}
              animationDelay={idx * 0.05}
            />
          ))}
          
          {showInput ? (
            <div className={`fade-in bg-gradient-to-r ${config.bgGradient} rounded-xl p-4 border-2 border-dashed border-slate-300`}>
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter task name..."
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:border-slate-400 focus:outline-none mb-2"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  className="flex-1 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowInput(false);
                    setTaskInput('');
                  }}
                  className="px-4 py-2 rounded-lg border-2 border-slate-300 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="w-full p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-700 transition-all flex items-center justify-center gap-2 font-medium group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Add Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}