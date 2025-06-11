import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddMatter() {
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matter, setMatter] = useState({
    name: '',
    description: '',
    isClosed: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Adding matter for customer:', customerId, 'with data:', matter);
      await axios.post(`https://localhost:7291/api/customers/${customerId}/matters`, matter, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      navigate(`/customers/${customerId}`);
    } catch (err) {
      console.error('Error adding matter:', err);
      setError(err.response?.data?.message || 'Failed to add matter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add New Matter</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={matter.title}
              onChange={(e) => setMatter({ ...matter, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              value={matter.description}
              onChange={(e) => setMatter({ ...matter, description: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="isClosed" className="ml-2 block text-sm text-gray-700">
              Mark as Closed
            </label>
            <input
              type="checkbox"
              id="isClosed"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
              checked={matter.isClosed}
              onChange={(e) => setMatter({ ...matter, isClosed: e.target.checked })}
            />
            
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Adding...' : 'Add Matter'}
          </button>
          <button
            onClick={() => navigate(`/customers/${customerId}`)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}