import { useState } from 'react';

export function useDragAndDrop(onDrop) {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (task, sourceColumn) => {
    setDraggedItem({ task, sourceColumn });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (targetColumn) => {
    if (!draggedItem) return;
    
    const { task, sourceColumn } = draggedItem;
    
    // Delegate actual move logic to parent (Dependency Inversion)
    onDrop(task.id, sourceColumn, targetColumn);
    
    setDraggedItem(null);
  };

  return {
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDrop
  };
}
