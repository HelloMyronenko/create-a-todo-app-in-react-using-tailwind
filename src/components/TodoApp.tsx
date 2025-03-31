import React from 'react';
import { CheckSquare } from 'lucide-react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoStats from './TodoStats';
import { TodoProvider } from '../context/TodoContext';

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <CheckSquare className="text-green-500 mr-2" size={28} />
          <h1 className="text-3xl font-bold text-white">Task Master</h1>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
          <TodoStats />
          <TodoInput />
          <TodoList />
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Organize your tasks efficiently and boost your productivity!</p>
        </div>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;
