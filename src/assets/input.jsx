// src/assets/input.jsx
import './input.css';
import React, { useState, useEffect } from 'react';
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
import { auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function Input({ user }) {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // **Wipe out any old tasks immediately on any auth change**
    setTasks([]);

    if (!user) {
      // signed out → stay empty (in‑memory list cleared)
      return;
    }

    // signed in → subscribe to Firestore
    const q = query(
      collection(db, 'tasks'),
      where('uid', '==', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      setTasks(snapshot.docs.map(d => ({ id: d.id, text: d.data().text })));
    });

    return () => unsubscribe();
  }, [user]);

  async function handleAdd() {
    const text = inputValue.trim();
    if (!text) return;

    setInputValue('');
    if (user) {
      // save to Firestore
      await addDoc(collection(db, 'tasks'), {
        text,
        uid: user.uid,
        timestamp: serverTimestamp()
      });
    } else {
      // just in-memory (will vanish on login or reload)
      setTasks(prev => [...prev, { id: Date.now(), text }]);
    }

  }

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
