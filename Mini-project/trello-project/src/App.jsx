import React, { useState } from 'react';
import Column from './components/Column';

export default function App() {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    complete: []
  });
  
  const [draggedTask, setDraggedTask] = useState(null);

  const columnConfig = {
    todo: { 
      title: 'To Do', 
      color: 'from-amber-400 to-orange-500', 
      bgGradient: 'from-amber-50 to-orange-50' 
    },
    inProgress: { 
      title: 'In Progress', 
      color: 'from-blue-400 to-indigo-500', 
      bgGradient: 'from-blue-50 to-indigo-50' 
    },
    complete: { 
      title: 'Complete', 
      color: 'from-emerald-400 to-teal-500', 
      bgGradient: 'from-emerald-50 to-teal-50' 
    }
  };

  const handleDragStart = (task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
  };

  const handleDrop = (targetColumn) => {
    if (!draggedTask) return;
    
    const { task, sourceColumn } = draggedTask;
    
    if (sourceColumn === targetColumn) return;
    
    setColumns(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
      [targetColumn]: [...prev[targetColumn], task]
    }));
    
    setDraggedTask(null);
  };

  const addTask = (column, taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText
    };
    
    setColumns(prev => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));
  };

  const deleteTask = (column, taskId) => {
    setColumns(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== taskId)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          font-family: 'DM Sans', sans-serif;
        }
        
        h1, h2, h3 {
          font-family: 'Sora', sans-serif;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .task-card {
          transition: all 0.2s ease;
        }
        
        .task-card:hover {
          transform: translateY(-2px);
        }
        
        .column {
          transition: all 0.3s ease;
        }
        
        .column.drag-over {
          transform: scale(1.02);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
        }
        
        .noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 slide-in">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Project Board
          </h1>
          <p className="text-slate-400 text-lg">
            Organize your tasks with drag & drop simplicity
          </p>
        </header>
        
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(columnConfig).map(([columnKey, config], index) => (
            <Column
              key={columnKey}
              columnKey={columnKey}
              config={config}
              tasks={columns[columnKey]}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}