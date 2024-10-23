// ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'

const ResetPassword = () => {
    const { token } = useParams(); // Get the token from URL parameters
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message before making a new request
        setError(''); // Reset error before making a new request

        try {
            const response = await fetch(`https://bulkemail2001.onrender.com/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password.');
            }

            setMessage(data.message); // Set success message

            // Redirect to login page after successful reset
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">Reset Password</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Reset Password</button>
                    </form>
                    {message && <div className="alert alert-success mt-3">{message}</div>}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;