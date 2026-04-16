import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
/* Add config from console */
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function App() {

const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Failed:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Failed:", error.message);
    }
  };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {user ? (
        // UI for Logged In Users
        <div>
          <h2>Welcome, {user.displayName}!</h2>
          <img 
            src={user.photoURL} 
            alt="profile" 
            style={{ borderRadius: '50%', width: '100px' }} 
          />
          <p>Email: {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        // UI for Logged Out Users
        <div>
          <h2>Please Sign In</h2>
          <button onClick={handleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default App;
