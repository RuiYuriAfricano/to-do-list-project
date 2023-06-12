import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  categ: string;
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
  const [select, setSelect] = useState('0');
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [inserir, setInserir] = useState();

  useEffect(() => {
    if (todos.length)
      localStorage.setItem('todos', JSON.stringify(todos))
    setInserir()
  }, [inserir])

  useEffect(() => {
    const dados: string = localStorage.getItem('todos') + ''

    if (dados !== 'null') {
      setTodos(JSON.parse(dados));
    }

  }, [])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(e.target.value);
  };


  //listar por categoria
  const handleSortByCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;

    const dados: string = localStorage.getItem('todos') + '';

    if (dados !== 'null') {
      setTodos(JSON.parse(dados));
    }

    if (category !== '0' && category !== "TODAS") {
      setTodos(prevTodos => {
        const sortedTodos = [...prevTodos].sort((a, b) => {
          if (a.categ < b.categ) {
            return -1;
          } else if (a.categ > b.categ) {
            return 1;
          } else {
            return 0;
          }
        });

        const filteredTodos = sortedTodos.filter(todo => todo.categ === category);

        return filteredTodos;
      });
    }
  };



  const handleAddTodo = () => {
    if (inputText.trim() === '')
      alert("Deves inserir a designação da tarefa");
    else if (select === '0')
      alert("Deves selecionar uma categoria");

    else {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        categ: select,
        completed: false,
      };
      setInserir("sim");
      setTodos([...todos, newTodo]);
      setInputText('');

    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          setInserir("sim");
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setInserir("sim");

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
    <div className="body-text bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="body-card max-w-lg w-full mx-4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="dark-text  text-2xl font-bold text-white mb-4">Gestor de tarefa</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="input-text flex-grow bg-gray-700 text-white placeholder-gray-400 border-gray-400 border-2 p-2 rounded-l-md focus:outline-none"
            placeholder="Escreve uma nova tarefa..."
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleAddTodo();
              }
            }} />
          <select className="input-text flex-grow bg-gray-700 text-white placeholder-gray-400 border-gray-400 border-2 p-2 rounded-l-md focus:outline-none"
            onChange={handleInputChange1} value={select}>
            <option value='0'>
              Categoria
            </option>
            <option value="A">
              A
            </option>
            <option value="B">
              B
            </option>
            <option value="C">
              C
            </option>
          </select>
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
              className={`li-card flex items-center bg-gray-700 p-3 rounded-md ${todo.completed ? 'text-gray-500 line-through' : 'text-white'
                }`}
            >
              <span className="flex-grow">{todo.text} - {todo.categ}</span>
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
        <div className="dark-text  mt-8 text-white">
          <p>
            Tarefas por fazer: {totalTodos} | Tarefas Completadas: {completedTodos}
            <select className="input-text me-0 mt-2 flex-grow bg-gray-700 text-white  border-gray-400 border-2 p-2 rounded-l-md focus:outline-none"
              onChange={handleSortByCategory}>
              <option value='0'>
                Lista/Categoria
              </option>
              <option value="A">
                A
              </option>
              <option value="B">
                B
              </option>
              <option value="C">
                C
              </option>
              <option value="TODAS">
                Todas Categorias
              </option>
            </select>
          </p>
          <p className="mt-2">

          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
