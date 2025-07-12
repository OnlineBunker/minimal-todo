// src/assets/header.jsx
import React from 'react';
import { auth, provider } from '../firebase.js';
import { signInWithPopup, signOut } from 'firebase/auth';
import './header.css';

function Header({ user }) {
  const handleClick = () => {
    if (user) {
      signOut(auth);
    } else {
      signInWithPopup(auth, provider).catch(console.error);
    }
  };

  return (
    <div id="header-div">
      <h1>TODO App</h1>
      <button className="auth-button" onClick={handleClick}>
        {user ? 'Sign Out' : 'Sign In with Google'}
      </button>
    </div>
  );
}

export default Header;
