// src/assets/input.jsx
import React, { useState, useEffect } from 'react';
import './input.css';
import Todo from './todo.jsx';
import { db } from '../firebase.js';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

function Input({ user }) {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // whenever user changes (login/logout), clear or subscribe
  useEffect(() => {
    setTasks([]);  // always clear first

    if (!user) {
      return;      // stay empty if signed out
    }

    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', user.uid),
      orderBy('timestamp', 'asc')
    );
    const unsub = onSnapshot(q, snap => {
      setTasks(snap.docs.map(d => ({ id: d.id, text: d.data().text })));
    });
    return () => unsub();
  }, [user]);

  // add a task
  async function handleAdd() {
    const text = inputValue.trim();
    if (!text) return;

    if (user) {
      await addDoc(collection(db, 'tasks'), {
        text,
        uid: user.uid,
        timestamp: serverTimestamp()
      });
    } else {
      setTasks(prev => [...prev, { id: Date.now(), text }]);
    }

    setInputValue('');
  }

  // delete a task
  async function handleDelete(idx) {
    if (user) {
      await deleteDoc(doc(db, 'tasks', tasks[idx].id));
    } else {
      setTasks(prev => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter the task..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button className="input-button" onClick={handleAdd}>
          ADD
        </button>
      </div>
      <Todo
        tasklist={tasks.map(t => t.text)}
        delete={handleDelete}
      />
    </>
  );
}

export default Input;
