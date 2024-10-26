import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://bulkemail2001.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            navigate('/dashboard'); // Redirect to the dashboard or home page
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome to Sneat! 👋🏻</h2>
            <p>Please sign in to your account and start the adventure.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email or Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-footer">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className="options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        {/* <a href="/forgot-password">Forgot password?</a> */}
                        <span onClick={()=>navigate('/forgot-password')} class="blue-underline">Forgot password?</span>
                    </div>
                </div>
                {/* <p>New on our platform? <a href="/signup">Create an account</a></p>
                 */}
                 <p>New on our platform? <span onClick={()=>navigate('/signup')} class="blue-underline">Click here</span></p>

                <p>or sign in with:</p>
                <div className="social-buttons">
                <img src='https://png.pngtree.com/png-clipart/20201208/original/pngtree-facebook-pink-icon-vector-png-image_5520166.jpg' alt='Facebook' className='social-icon' />
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi-svfmz4WWcIY1zeZDhHvCEcY9RqH5H4YXg&s' alt='Twitter' className='social-icon' />
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGItIEf-nfmidp_Rse7eb7h-TQgTQIUZznAw&s' alt='Google' className='social-icon' />   
                </div>
            </form>
        </div>
    );
};

export default Login;
