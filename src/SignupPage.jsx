import React, { useState } from 'react';
import { addUser, getUser } from './indexedDB';
import { useNavigate } from 'react-router-dom';
import './css/LoginSignup.css';

function SignupPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const existingUser = await getUser(username);
    if (existingUser) {
      setError('Username already taken');
      return;
    }

    const newUser = {
      username,
      password,
      cart: [],
      favorites: [],
      ratings: {}
    };

    await addUser(newUser);
    setUser(newUser);
    navigate('/'); 
  };

  return (
    <div className='loginSingupPage'>
      <h1>Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default SignupPage;
