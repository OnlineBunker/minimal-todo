import './todo.css';
import React from 'react';

function Todo(props) {
  return (
    <div id='todo-div'>
      {props.tasklist.map((task, index) => (
        <div key={index} className='todo-item'>
          <p>{task}</p>
          <button className='delete-button' onClick={() => props.delete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
export default Todo;
