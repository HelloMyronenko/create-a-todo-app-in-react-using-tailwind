import React from 'react';
import { CheckCircle, Circle, Trash } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoStats: React.FC = () => {
  const { todos, clearCompleted } = useTodo();
  
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  const completionPercentage = total > 0 
    ? Math.round((completed / total) * 100) 
    : 0;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 rounded-lg p-4 mb-6 shadow-lg">
      <div className="flex space-x-6 mb-4 sm:mb-0">
        <div className="flex items-center">
          <CheckCircle size={18} className="text-green-500 mr-2" />
          <span className="text-sm text-gray-300">
            Completed: <span className="text-white font-medium">{completed}</span>
          </span>
        </div>
        <div className="flex items-center">
          <Circle size={18} className="text-blue-500 mr-2" />
          <span className="text-sm text-gray-300">
            Pending: <span className="text-white font-medium">{pending}</span>
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-32 bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-white font-medium">{completionPercentage}%</span>
        
        {completed > 0 && (
          <button
            onClick={clearCompleted}
            className="flex items-center text-sm text-red-500 hover:text-red-400 transition-colors"
          >
            <Trash size={14} className="mr-1" />
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoStats;
