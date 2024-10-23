
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior
//         setError(''); // Reset error state before making the request

//         const payload = {
//             email,
//             password,
//         };

//         try {
//             const res = await fetch('http://localhost:3000/api/auth/login', {
//                 method: 'POST',
//                 body: JSON.stringify(payload),
//                 headers: {
//                     'Content-Type': 'application/json', // Corrected header format
//                 },
//             });

//             if (!res.ok) {
//                 // Handle non-200 responses
//                 const errorData = await res.json();
//                 setError(errorData.message || 'Invalid email or password.');
//                 return;
//             }

//             const data = await res.json();
//             if (data.token) {
//                 localStorage.setItem('token', data.token); // Store token in local storage
//                 navigate('/history'); // Redirect to history page on successful login
//             }
//         } catch (err) {
//             setError('An error occurred while logging in.');
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;
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
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                </div>
                <p>New on our platform? <a href="/signup">Create an account</a></p>
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