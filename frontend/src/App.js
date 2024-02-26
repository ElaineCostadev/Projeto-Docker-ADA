import React, { useState} from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [novoTodo, setNovoTodo] = useState('');

  // useEffect(() => {
  //   // Função para carregar os TODOS ao carregar o componente
  //   const carregarTodos = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/todos');
  //       setTodos(response.data);
  //     } catch (error) {
  //       console.error('Erro ao carregar TODOS:', error);
  //     }
  //   };

  //   // Carregar TODOS
  //   carregarTodos();
  // }, []); // Executar apenas uma vez ao montar o componente

  const adicionarTodo = async () => {
    try {
      // Fazer requisição POST para adicionar um novo TODO
      const response = await axios.post('http://localhost:5000/todos', {
        description: novoTodo,
        is_completed: false, // Defina como necessário
      });

      console.log('TODO adicionado com sucesso:', response.data);

      // Atualizar a lista de TODOS no estado após a adição
      setTodos((prevTodos) => [...prevTodos, response.data]);
      
      // Limpar o input após a adição
      setNovoTodo('');
    } catch (error) {
      console.error('Erro ao adicionar TODO:', error);
    }
  };

  const removerTodo = async (id) => {
    try {
      // Fazer requisição DELETE para remover o TODO
      await axios.delete(`http://localhost:5000/todos/${id}`);
      console.log('TODO removido com sucesso');

      // Atualizar a lista de TODOS no estado após a remoção
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Erro ao remover TODO:', error);
    }
  };

  const alterarStatusTodo = async (id, novoStatus) => {
    try {
      // Fazer requisição PUT para alterar o status do TODO
      await axios.put(`http://localhost:5000/todos/${id}`, { is_completed: novoStatus });
      console.log('Status do TODO alterado com sucesso');

      // Atualizar a lista de TODOS no estado após a alteração do status
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, is_completed: novoStatus } : todo
        )
      );
    } catch (error) {
      console.error('Erro ao alterar status do TODO:', error);
    }
  };

  return (
    <div>
      <h2>Lista de TODOS</h2>
      <div>
        <input
          type="text"
          value={novoTodo}
          onChange={(e) => setNovoTodo(e.target.value)}
          placeholder="Digite um novo TODO"
        />
        <button onClick={adicionarTodo}>Adicionar</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => alterarStatusTodo(todo.id, !todo.is_completed)}
            />
            <span style={{ textDecoration: todo.is_completed ? 'line-through' : 'none' }}>
              {todo.description}
            </span>
            <button onClick={() => removerTodo(todo.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
