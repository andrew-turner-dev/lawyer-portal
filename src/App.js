import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import CustomerList from './components/customers/CustomerList';
import CustomerDetails from './components/customers/CustomerDetails';
import MatterDetails from './components/maters/MatterDetails.jsx';
import AddCustomer from './components/customers/AddCustomer';
import AddMatter from './components/maters/AddMatter';
import Signup from './components/auth/SignUp.jsx';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/customers" element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          } />
          <Route path="/customers/:id" element={
            <ProtectedRoute>
              <CustomerDetails />
            </ProtectedRoute>
          } />
          <Route path="/matters/:matterId" element={
            <ProtectedRoute>
              <MatterDetails />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/customers" replace />} />
          <Route path="/customers/new" element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="/customers/:id/matters/new" element={
          <ProtectedRoute>
            <AddMatter />
          </ProtectedRoute>
        } />
        <Route path="/customers/:customerId/matters/:matterId" element={
            <ProtectedRoute>
              <MatterDetails />
            </ProtectedRoute>
          } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;