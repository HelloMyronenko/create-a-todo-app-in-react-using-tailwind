import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the Todo type
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Define the context type
interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
}

// Create the context with a default value
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Custom hook to use the todo context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

// Provider component
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        // Parse the saved todos and convert string dates back to Date objects
        return JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
        return [];
      }
    }
    return [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: new Date()
        }
      ]);
    }
  };

  // Toggle a todo's completed status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit a todo's text
  const editTodo = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        )
      );
    }
  };

  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Value object to be provided to consumers
  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
