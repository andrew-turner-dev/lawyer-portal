import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function MatterList() {
  const [matters, setMatters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { customerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatters = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `https://localhost:7291/api/customers/${customerId}/matters`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setMatters(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching matters:', err);
        setError('Failed to load matters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatters();
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Matters</h1>
          <button
            onClick={() => navigate(`/customers/${customerId}/matters/new`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Matter
          </button>
        </div>

        {matters.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No matters found for this customer</p>
            <button
              onClick={() => navigate(`/customers/${customerId}/matters/new`)}
              className="text-blue-600 hover:text-blue-700 mt-2"
            >
              Create your first matter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {matters.map((matter) => (
              <div
                key={matter.id}
                className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{matter.title}</h3>
                    <p className="mt-2 text-gray-600">{matter.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    matter.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {matter.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Created: {new Date(matter.createdAt).toLocaleDateString()}
                  </div>
                  <Link
                    to={`/matters/${matter.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}