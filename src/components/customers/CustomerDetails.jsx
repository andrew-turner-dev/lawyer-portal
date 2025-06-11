import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [matters, setMatters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        // First fetch customer details
        const customerResponse = await axios.get(`https://localhost:7291/api/customers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        setCustomer(customerResponse.data);

        // Then try to fetch matters, but handle case where there are none
        try {
          const mattersResponse = await axios.get(`https://localhost:7291/api/customers/${id}/matters`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setMatters(mattersResponse.data || []);
        } catch (mattersError) {
          // If the matters endpoint returns 404 or other error, set empty array
          //NOTE: It is expected a new customer may not have a case yet
          console.log('No matters found or error fetching matters:', mattersError);
          setMatters([]);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching customer details:', err);
        setError('Failed to load customer details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

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
          onClick={() => navigate('/customers')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Customers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Customer Information */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer?.name}</h1>
            <p className="mt-1 text-gray-500">Customer email: {customer?.email}</p>
            <p className="mt-1 text-gray-500">Customer Phone: { customer?.phoneNumber !== null ? customer?.phoneNumber : 'No number listed'}</p>
          
          </div>
          <button
            onClick={() => navigate('/customers')}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Back to Customers
          </button>
        </div>
      </div>

      {/* Matters List */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Matters</h2>
          <button
            onClick={() => navigate(`/customers/${id}/matters/new`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Matter
          </button>
        </div>

        {matters.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No matters found for this customer.</p>
        ) : (
          <div className="space-y-4">
            {matters.map((matter) => (
              <div
                key={matter.id}
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/customers/${id}/matters/${matter.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">Matter Name: {matter.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Matter Description: {matter.description}</p>
                    {/* This code is also present on the matter details page. TODO: Consolidate. */}
                    <p className="mt-1 text-sm text-gray-500">Closed: {matter.isClosed ===  true ? "Yes" : "No"}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    matter.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {matter.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}