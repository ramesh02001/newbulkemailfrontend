// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const Edituser = ({ Usernotes, setUsernotes }) => {
//     const navigate = useNavigate();
//     const [recipient, setRecipient] = useState('');
//     const [subject, setSubject] = useState('');
//     const [message, setMessage] = useState(''); // Corrected variable name
//     const [err, setErr] = useState('');
//     const {id}=useParams();

//    // Check for token and navigate to login if not found
//     useEffect(() => {
//         if (!localStorage.getItem("token")) {
//             navigate("/login", { replace: true });
//             return; // Exit early if no token is found
//         }
//        const data =Usernotes.find((data)=>data._id===id);
//        if(data){
//         setRecipient(data.recipient);
//         setSubject(data.subject);
//         setMessage(data.message);

//        }
//     }, [navigate,id,Usernotes]);

//     // API call to post new email
//     const EditNewEmail = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior

//         const newEmail = { recipient, subject, message };
        
//         try {
//             const res = await fetch(` http://localhost:3000/api/email/user/edit/${id}`, {
//                 method: "PUT",
//                 body: JSON.stringify(newEmail),
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-auth-token": localStorage.getItem("token"),
//                 },
//             });

//             const data = await res.json();
             
//             if(!data.data){
//                 setErr(data.error);
//             }else{
//                 const editableindex= Usernotes?.findIndex((data)=>data._id===id);
//                 Usernotes[editableindex]=data.data;
//                 await setUsernotes([...Usernotes])
                
//             }

//         } catch (error) {
//             console.error("Error making API call:", error);
//             setErr('An error occurred while sending the email.');
//         }
//     };

//     return (
//         <form onSubmit={EditNewEmail}>
//             <div className="form-group">
//                 <label>Email</label>
//                 <input
//                     type="email"
//                     className="form-control"
//                     value={recipient} // Corrected value to recipient
//                     onChange={(e) => setRecipient(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Subject</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     required
//                 />
//             </div>
//             <div className="form-group">
//                 <label>Message</label> {/* Changed label from Question to Message */}
//                 <textarea
//                     className="form-control"
//                     rows="5"
//                     value={message} // Corrected value to message
//                     onChange={(e) => setMessage(e.target.value)} // Use setMessage for the textarea
//                     required
//                 />
//             </div>
//             <button type='submit' className="btn btn-primary">Add</button>
//             {err && <p className="alert alert-danger">{err}</p>} {/* Display error message */}
//             {/* Uncomment the following line to display success message */}
//             {/* {message && <p className="alert alert-success">{message}</p>} */}
//         </form>
//     );
// };

// export default Edituser;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUser.css'; // Import your CSS file for styling

const EditUser = ({ Usernotes, setUsernotes }) => {
    const navigate = useNavigate();
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [err, setErr] = useState('');
    const { id } = useParams();

    // Check for token and navigate to login if not found
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true });
            return; // Exit early if no token is found
        }

        const data = Usernotes.find((note) => note._id === id);
        if (data) {
            setRecipient(data.recipient);
            setSubject(data.subject);
            setMessage(data.message);
        }
    }, [navigate, id, Usernotes]);

    // API call to update email
    const editNewEmail = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const updatedEmail = { recipient, subject, message };
        
        try {
            const res = await fetch(`https://bulkemail2001.onrender.com/api/email/user/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedEmail),
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();
             
            if (!data.data) {
                setErr(data.error);
            } else {
                const editableIndex = Usernotes.findIndex((note) => note._id === id);
                Usernotes[editableIndex] = data.data;
                setUsernotes([...Usernotes]);
                navigate('/account'); // Redirect to account page after editing
            }
        } catch (error) {
            console.error("Error making API call:", error);
            setErr('An error occurred while sending the email.');
        }
    };

    return (
        <div className="edit-user-container">
            <h2>Edit Email</h2>
            <form onSubmit={editNewEmail}>
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
                <button type='submit' className="btn btn-primary">Update</button>
                {err && <p className="alert alert-danger">{err}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default EditUser;