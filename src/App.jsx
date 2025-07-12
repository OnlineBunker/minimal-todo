// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './assets/header.jsx';
import Input from './assets/input.jsx';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header user={user} />
      <Input user={user} />
    </>
  );
}

export default App;
