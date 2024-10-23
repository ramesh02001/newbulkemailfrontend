// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const EmailHistory = () => {
//     const navigate = useNavigate();
//     const [notes, setNotes] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         // Check for token and navigate to login if not found
//         if (!localStorage.getItem("token")) {
//             navigate("/login", { replace: true });
//             return; // Exit early if no token is found
//         }

//         const fetchData = async () => {
//             try {
//                 const res = await fetch("http://localhost:3000/api/email/all", {
//                     method: "GET",
//                     headers: {
//                         "x-auth-token": localStorage.getItem("token"),
//                     },
//                 });

//                 const data = await res.json();

//                 if (!res.ok) {
//                     // If the response is not OK, handle the error
//                     setError(data.error || "Failed to fetch email history.");
//                 } else {
//                     setNotes(data.data);
//                 }
//             } catch (err) {
//                 setError("An error occurred while fetching email history.");
//                 console.error(err);
//             }
//         };

//         fetchData();
//     }, [navigate]); // Add navigate to the dependency array

//     return (
//         <div>
//             {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
//             {notes.length > 0 ? (
//                 notes.map((data) => (
//                     <div key={data._id} className="email-note"> {/* Use a unique key */}
//                         <p><strong>Recipient:</strong> {data.recipient}</p>
//                         <p><strong>Subject:</strong> {data.subject}</p>
//                         <p><strong>Message:</strong> {data.message}</p>
//                         <p><strong>Posted by:</strong> {data.user.username}</p>
//                         <hr />
//                     </div>
//                 ))
//             ) : (
//                 <p>No emails found.</p> // Display message if there are no notes
//             )}
//         </div>
//     );
// };

// export default EmailHistory;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Email.css'; // Import your CSS file for styling

const EmailHistory = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check for token and navigate to login if not found
        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true });
            return; // Exit early if no token is found
        }

        const fetchData = async () => {
            try {
                const res = await fetch("https://bulkemail2001.onrender.com/api/email/all", {
                    method: "GET",
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    // If the response is not OK, handle the error
                    setError(data.error || "Failed to fetch email history.");
                } else {
                    setNotes(data.data);
                }
            } catch (err) {
                setError("An error occurred while fetching email history.");
                console.error(err);
            }
        };

        fetchData();
    }, [navigate]); // Add navigate to the dependency array

    return (
        <div className="email-history-container">
            <div>
                <li onClick={() => navigate('/account')} className="my-account-link">Go to My Account</li>
            </div>
            <h2>All Email Users</h2>
            
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            {notes.length > 0 ? (
                notes.map((data) => (
                    <div key={data._id} className="email-card"> {/* Use a unique key */}
                        <p><strong>Recipient:</strong> {data.recipient}</p>
                        <p><strong>Subject:</strong> {data.subject}</p>
                        <p><strong>Message:</strong> {data.message}</p>
                        <p><strong>Posted by:</strong> {data.user.username}</p>
                    </div>
                ))
            ) : (
                <p>No emails found.</p> // Display message if there are no notes
            )}
        </div>
    );
};

export default EmailHistory;