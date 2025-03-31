import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit, X } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed, createdAt }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the date to a readable string
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(createdAt);

  // Focus the input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group flex items-center p-4 border-b border-gray-700 hover:bg-gray-800/50 transition-colors ${completed ? 'bg-gray-800/30' : ''}`}>
      <button
        onClick={() => toggleTodo(id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border ${
          completed ? 'bg-green-500 border-green-500' : 'border-gray-500'
        } flex items-center justify-center mr-4 transition-colors`}
      >
        {completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-grow">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-700 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ) : (
          <div className="flex flex-col">
            <span className={`text-md ${completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {text}
            </span>
            <span className="text-xs text-gray-500 mt-1">{formattedDate}</span>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1 text-green-500 hover:text-green-400 transition-colors"
            >
              <Check size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-500 hover:text-red-400 transition-colors"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-blue-500 hover:text-blue-400 transition-colors"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => deleteTodo(id)}
              className="p-1 text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
