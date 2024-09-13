import React from "react";

const TodoItem = ({ todo, toggleCompletion, editTodo, deleteTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <div className="actions">
        <button onClick={toggleCompletion}>
          {todo.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button onClick={editTodo}>Edit</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
