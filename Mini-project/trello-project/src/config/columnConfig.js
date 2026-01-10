export const COLUMN_TYPES = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  COMPLETE: 'complete'
};

export const columnConfig = {
  [COLUMN_TYPES.TODO]: {
    title: 'To Do',
    color: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-50 to-orange-50'
  },
  [COLUMN_TYPES.IN_PROGRESS]: {
    title: 'In Progress',
    color: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50'
  },
  [COLUMN_TYPES.COMPLETE]: {
    title: 'Complete',
    color: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50'
  }
};


export function addColumnType(key, config) {
  return {
    ...columnConfig,
    [key]: config
  };
}
