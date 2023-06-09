import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const quotes = [
  {
    q: 'A única maneira de fazer um ótimo trabalho é amar o que você faz.',
    a: 'Steve Jobs',
  },
  {
    q: 'Acredite que você pode e você já está no meio do caminho.',
    a: 'Theodore Roosevelt',
  },
  {
    q: 'O futuro pertence àqueles que acreditam na beleza de seus sonhos.',
    a: 'Eleanor Roosevelt',
  },
  {
    q: 'Não fique de olho no relógio; faça o que ele faz. Continue seguindo em frente.',
    a: 'Sam Levenson',
  },
  {
    q: 'O sucesso não é definitivo, a falha não é fatal: é a coragem de continuar que conta.',
    a: 'Winston Churchill',
  },
  {
    q: 'O único limite para a realização de amanhã será as nossas dúvidas de hoje.',
    a: 'Franklin D. Roosevelt',
  },
  {
    q: 'O segredo para ir adiante é começar.',
    a: 'Mark Twain',
  },
  {
    q: 'Se você quer alcançar a grandeza, pare de pedir permissão.',
    a: 'Anônimo',
  },
  {
    q: 'Sucesso é caminhar de fracasso em fracasso sem perder o entusiasmo.',
    a: 'Winston Churchill',
  },
  {
    q: 'A melhor maneira de prever o futuro é criá-lo.',
    a: 'Peter Drucker',
  },
  {
    q: 'Eu acredito que é possível para pessoas comuns escolherem ser extraordinárias.',
    a: 'Elon Musk',
  },
  {
    q: 'A força não vem de vencer. Suas lutas desenvolvem suas forças.',
    a: 'Arnold Schwarzenegger',
  },
];

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [quote, setQuote] = useState({ q: '', a: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    getRandomQuote();
  }, []);

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full mx-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4">TaskMaster +</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="flex-grow bg-gray-700 text-white placeholder-gray-400 border-gray-400 border-2 p-2 rounded-l-md focus:outline-none"
            placeholder="Escreve uma nova tarefa..."
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Adicionar
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center bg-gray-700 p-3 rounded-md ${todo.completed ? 'text-gray-500 line-through' : 'text-white'
                }`}
            >
              <span className="flex-grow">{todo.text}</span>
              {!todo.completed ? (
                <button
                  onClick={() => handleToggleComplete(todo.id)}
                  className="text-green-500 hover:text-green-600 ml-2 focus:outline-none"
                >
                  ✓
                </button>
              ) : null}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 ml-2 focus:outline-none"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-white">
          <p>
            Tarefas por fazer: {totalTodos} | Tarefas Completadas: {completedTodos}
          </p>
          <p className="mt-2">
            <em>"{quote.q}"</em> - {quote.a}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
