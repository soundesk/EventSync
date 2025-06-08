import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://http://localhost:5173C:/api.js/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally save token: localStorage.setItem('token', data.access_token);
        navigate('/dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Could not connect to the server. Please try again later.');
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, scale: 0.8, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Log In to EventSync
        </motion.h2>

        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Log In
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
