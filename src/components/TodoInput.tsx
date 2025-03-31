import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-3 bg-transparent text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white p-3 transition-colors"
          disabled={!text.trim()}
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
