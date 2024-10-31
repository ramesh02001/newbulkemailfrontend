import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css'; // Import your CSS file for styling

const AddUser = ({ Usernotes, setUsernotes }) => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [err, setErr] = useState('');

    // Check for token and navigate to login if not found
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true });
            return; // Exit early if no token is found
        }
    }, [navigate]);

    // API call to post new email
    const PostNewEmail = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const newEmail = { recipient, subject, message };
        
        try {
            const res = await fetch('https://bulkemail-2.onrender.com/api/email/user/send', {
                method: "POST",
                body: JSON.stringify(newEmail),
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle non-200 responses
                setErr(data.error || 'Error sending email');
            } else {
                if (data.data) {
                    setUsernotes([...Usernotes, data.data]); // Ensure data.data exists
                } else {
                    setErr('No data returned from server');
                }
                setMessage('Email sent successfully!'); // Success message
                // Clear input fields after successful submission
                setRecipient('');
                setSubject('');
                setMessage('');
            }
            navigate('/account');

        } catch (error) {
            console.error("Error making API call:", error);
            setErr('An error occurred while sending the email.');
        }
    };

    return (
        <div className="add-user-container">
            <h2>Add New Email</h2>
            <form onSubmit={PostNewEmail}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">Send Email</button>
                {err && <p className="alert alert-danger">{err}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default AddUser;
