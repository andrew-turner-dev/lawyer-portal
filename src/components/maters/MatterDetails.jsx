import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MatterDetails() {
  const { matterId, customerId } = useParams();
  // const { matterId } = useParams();
  // const { customerId } = useParams();
  const navigate = useNavigate();
  const [matter, setMatter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatterDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/customers/${customerId}/matters/${matterId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setMatter(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching matter details:', err);
        setError('Failed to load matter details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatterDetails();
  }, [matterId]);

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
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>

          {/* TODO: Impliment matter edit feature */}
          {/* <button
            onClick={() => navigate(`/matters/${matterId}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Matter
          </button> */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">Matter Title: {matter.name}</h1>
              <p className="mt-2 text-gray-600">Description: {matter.description}</p>
              <p className="mt-2 text-gray-600">Matter is Closed: {matter.isClosed === true ? "Yes" : "No"}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              matter.status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {matter.isClosed}
            </span>
          </div>

          
        </div>
      </div>
    </div>
  );
}