// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

// const Signup = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:3000/api/auth/register', {
//                 username, 
//                 email, 
//                 password
//             });
//             // Redirect to login page after successful signup
//             navigate('/login');
//         } catch (err) {
//             setError('Failed to sign up. Please try again.');
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             <h2>Sign Up</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>

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
//                 <button type="submit" className="btn btn-primary">Sign Up</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for styling

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before making the request

        try {
            const response = await axios.post('https://bulkemail2001.onrender.com/api/auth/register', {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                // Redirect to login page after successful signup
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
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

                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p className="signup-footer">
                    Already have an account? <a href="/login">Log in here</a>
                </p>
            </form>
        </div>
    );
};

export default Signup;