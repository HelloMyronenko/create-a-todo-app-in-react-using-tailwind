import React from 'react';
import { CheckSquare } from 'lucide-react';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <CheckSquare className="text-green-500" size={28} />
            <h1 className="text-2xl font-bold">Task Master</h1>
          </div>
        </header>
        
        <main>
          <TodoApp />
        </main>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Stay organized, stay productive!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
