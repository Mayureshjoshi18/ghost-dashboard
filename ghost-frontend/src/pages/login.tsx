'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const { token } = await res.json();
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-4 px-4">
      <h1 className="text-xl font-semibold">Login</h1>
      <p className="text-sm text-gray-400 text-center">
        Username:  <span className="font-mono text-white">admin</span> ,Password: <span className="font-mono text-white">admin123</span>
      </p>

      <input
        className="border border-white bg-black p-2 w-64"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="border border-white bg-black p-2 w-64"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-blue-600 px-4 py-2 rounded">Login</button>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
