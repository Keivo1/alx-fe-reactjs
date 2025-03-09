import React from "react";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>My React Todo App</h1>
      <TodoList />
    </div>
  );
}

export default App;