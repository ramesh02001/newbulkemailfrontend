import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch('https://bulkemail2001.onrender.com/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email}),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        // setMessage(response.data.message);
        localStorage.setItem('token', data.token);
        const resetToken = data.token; 
        navigate(`/reset-password/${resetToken}`); // Redirect to the dashboard or home page
    } catch (err) {
        setError(err.message);
        setMessage('');
    }
};

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Forgot Password</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
          {message && <div className="alert alert-success mt-3">{message}</div>}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;