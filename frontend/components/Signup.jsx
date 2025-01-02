import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons
import './Signup.css'; // Import the enhanced CSS

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation logic
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password is valid
    if (!isPasswordValid(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one letter, one number, and one special character.'
      );
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous errors
    try {
      const res = await axios.post('https://mo-ex-latest.onrender.com/api/auth/signup', {
        name,
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
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-header">Signup</h2>
        {error && <p className="error-message">{error}</p>}
        
        <div className="signup-input-container">
          <label className="signup-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
            placeholder="Enter your name"
            required
          />
          <FaUser className="icon" />
        </div>
        
        <div className="signup-input-container">
          <label className="signup-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            placeholder="Enter your email"
            required
          />
          <FaEnvelope className="icon" />
        </div>
        
        <div className="signup-input-container">
          <label className="signup-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            placeholder="Enter your password"
            required
          />
          <FaLock className="icon" />
        </div>
        
        <button
          type="submit"
          className="signup-button"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Signup'}
        </button>
        
        {/* Link for existing users */}
        <div className="login-link-container">
          <p className="login-text">
            Already have an account?{' '}
            <Link to="/" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
