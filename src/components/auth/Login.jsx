// components/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ loginEmail: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('token'); // Clear any existing token
    try {
      const response = await login(credentials);
      console.log('Login response:', response);
      console.log('Response data:', response.data);
      if (response && response.data) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/customers');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.log('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow ml-5">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        
        {error && (
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address: 
              </label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email address"
                onChange={e => setCredentials({...credentials, loginEmail: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password: 
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                onChange={e => setCredentials({...credentials, password: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}