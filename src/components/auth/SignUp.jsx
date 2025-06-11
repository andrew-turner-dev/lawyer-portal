import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    loginEmail: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    firm: '',
    isAdmin: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://localhost:7291/api/auth/signup', {
        loginEmail: formData.loginEmail,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        firm: formData.firm,
        isAdmin: formData.isAdmin
      });

      if (response.status === 201) {
        navigate('/login'); // Redirect to login after signup
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center mb-6">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            {/* Repeat the same pattern for other input fields */}
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="firm" className="text-sm font-medium text-gray-700 mb-1">
                Firm:
              </label>
              <input
                id="firm"
                type="text"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.firm}
                onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="loginEmail" className="text-sm font-medium text-gray-700 mb-1">
                Email address:
              </label>
              <input
                id="loginEmail"
                type="email"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.loginEmail}
                onChange={(e) => setFormData({ ...formData, loginEmail: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                Password:
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          {/* Admin checkbox */}
          <div className="flex items-center mt-4">
            <input
              id="isAdmin"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.isAdmin}
              onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
            />
            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
              Register as Administrator?
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign up'}
          </button>

          <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}