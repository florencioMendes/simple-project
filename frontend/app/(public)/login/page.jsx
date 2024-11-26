'use client'

import { useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div>
          <Link href="/forgot-password">
            <a>Forgot Password?</a>
          </Link>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
