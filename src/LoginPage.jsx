import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from './indexedDB';

function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    const user = await getUser(username);
    if (!user || user.password !== password) {
      setError('Invalid username or password');
      return;
    }
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); 
    navigate('/'); 
  };

  return (
    <div>
      <h1>Login</h1>
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
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
