import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import './Login.css'; // Import the enhanced CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://mo-ex-latest.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token); // Save token to localStorage
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-header">Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="login-input-container">
          <label className="login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="Enter your email"
            required
          />
          <FaEnvelope className="icon" />
        </div>
        
        <div className="login-input-container">
          <label className="login-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
            required
          />
          <FaLock className="icon" />
        </div>
        
        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        
        {/* Link for new users */}
        <div className="signup-link-container">
          <p className="signup-text">
            New User?{' '}
            <Link to="/signup" className="signup-link">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
