// src/assets/todo.jsx
import React from 'react';
import './todo.css';

function Todo({ tasklist, delete: onDelete }) {
  return (
    <div id="todo-div">
      {tasklist.map((task, idx) => (
        <div key={idx} className="todo-item">
          <p>{task}</p>
          <button className="delete-button" onClick={() => onDelete(idx)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
