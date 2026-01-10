import React from 'react';
import Column from './components/Column';
import { useTaskManager } from './hooks/useTaskManager';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { columnConfig, COLUMN_TYPES } from './config/columnConfig';

export default function App() {
  // Custom hooks handle specific responsibilities (SRP + DIP)
  const { tasks, addTask, deleteTask, moveTask } = useTaskManager({
    [COLUMN_TYPES.TODO]: [],
    [COLUMN_TYPES.IN_PROGRESS]: [],
    [COLUMN_TYPES.COMPLETE]: []
  });

  const { handleDragStart, handleDrop } = useDragAndDrop(moveTask);

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
          {/* OCP: Using configuration, easy to add new columns */}
          {Object.entries(columnConfig).map(([columnKey, config], index) => (
            <Column
              key={columnKey}
              columnKey={columnKey}
              config={config}
              tasks={tasks[columnKey]}
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
