import './header.css';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

function Header({ user }) {
  const handleAuth = () => {
    if (user) {
      signOut(auth);
    } else {
      signInWithPopup(auth, provider).catch(console.error);
    }
  };

  return (
    <div id="header-div">
      <h1>TODO App</h1>
      <button className="auth-button" onClick={handleAuth}>
        {user ? 'Sign Out' : 'Sign In with Google'}
      </button>
    </div>
  );
}

export default Header;
