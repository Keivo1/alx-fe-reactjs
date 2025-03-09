import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";


const TodoList = () => {
    const [todos, setTodos] = useState([
      { id: 1, text: "Learn React", completed: false },
      { id: 2, text: "Build a Todo App", completed: false },
    ]);
    const [newTodo, setNewTodo] = useState("");
  
    const addTodo = () => {
      if (newTodo.trim() === "") return;
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    };
  
    const toggleTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
  
    const deleteTodo = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    return (
      <div>
        <h2>Todo List</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            >
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TodoList;