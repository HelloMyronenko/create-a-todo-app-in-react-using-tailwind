import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  // Sort todos by creation date (newest first)
  const sortedTodos = [...todos].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg">No tasks yet</p>
        <p className="text-sm mt-2">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-850 rounded-md overflow-hidden shadow-lg">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          createdAt={todo.createdAt}
        />
      ))}
    </div>
  );
};

export default TodoList;
