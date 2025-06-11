import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="py-8">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Legal Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}