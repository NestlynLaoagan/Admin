import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'SkAdmin@372822023' && password === 'HPGMHVXBCCX23') {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#315925] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-[#315925] mb-2">
            BARANGAY BAKAKENG CENTRAL
          </h1>
          <p className="text-gray-600">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm mb-2 text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#66b539] text-white hover:bg-[#315925]"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© 2025 Barangay Bakakeng Central</p>
        </div>
      </div>
    </div>
  );
}
