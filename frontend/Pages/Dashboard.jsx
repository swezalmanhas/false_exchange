import { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); // We'll store the localStorage user data here
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(`user :  ${storedUser}`);
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, redirect to login
        navigate('/');
        return;
      }

      const res = await axios.get('https://mo-ex-latest.onrender.com/api/order/all', {
        headers: { 'x-auth-token': token },
      });
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred while fetching orders.');
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove the user data as well
    navigate('/');
  };

  // Fetch orders on mount, then poll every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard-container">
      {/* Navbar with Logout Button */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">False Exchange</h1>

        {/* If user info exists, display name/email */}
        {user && (
          <div style={{ marginRight: '1rem', fontWeight: 600 }}>
            Hello, {user.name} ({user.email})
          </div>
        )}

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {error && <p className="error-message" role="alert">{error}</p>}
        {success && <p className="success-message" role="status">{success}</p>}
        <OrderForm fetchOrders={fetchOrders} />
        <OrderList orders={orders} fetchOrders={fetchOrders} />
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          Made with ❤️ by <strong>Swezal</strong>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
