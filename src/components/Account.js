// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Account = ({Usernotes,setUsernotes}) => {
//     const navigate = useNavigate();
    
//     const [error, setError] = useState("");
//  const handledelete= async (id)=>{
//   const res= await fetch(` https://bulkemailtaskbackend-1.onrender.com/api/email/user/delete/${id}`,{
//     method:"DELETE",
//     headers:{
//         "Content-Type":"application/json",
//         "x-auth-token":localStorage.getItem("token"),

//     }
//   });
//   const data= await res.json();
//   console.log(data);
  
//   const newuser= Usernotes.filter((data)=>data.id !== id);
//   setUsernotes([...newuser])
// }
//     useEffect(() => {
//         // Check for token and navigate to login if not found
//         if (!localStorage.getItem("token")) {
//             navigate("/login", { replace: true });
//             return; // Exit early if no token is found
//         }

//         const fetchData = async () => {
//             try {
//                 const res = await fetch(" https://bulkemailtaskbackend-1.onrender.com/api/email/user/all", {
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
//                     setUsernotes(data.data);
//                 }
//             } catch (err) {
//                 setError("An error occurred while fetching email history.");
//                 console.error(err);
//             }
//         };

//         fetchData();
//     }, [navigate,setUsernotes]); // Add navigate to the dependency array

//     return (
//         <div><button onClick={()=>navigate('/adduser')}>AddItems</button>
//             {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
//             {Usernotes && Usernotes.length  > 0 ? (
//                 Usernotes.map((data) => (
//                     <div key={data._id} className="email-note"> {/* Use a unique key */}
//                         <p><strong>Recipient:</strong> {data.recipient}</p>
//                         <p><strong>Subject:</strong> {data.subject}</p>
//                         <p><strong>Message:</strong> {data.message}</p>
//                         <p><strong>Posted by:</strong> {data.user.username}</p>
//                         <p><strong>user email:</strong> {data.user.email}</p>
                       
//                         <button onClick={()=>navigate(`/edit/${data._id}`)}>edit</button>
//                         <button onClick={()=>handledelete(data._id)}>delete</button>
//                         <hr />
//                     </div>
//                 ))
//             ) : (
//                 <p>No emails found.</p> // Display message if there are no notes
                
//             )

//             }
          
                
           

            
//         </div>
//     );
// };

// export default Account;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; // Import your CSS file for styling

const Account = ({ Usernotes, setUsernotes }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://bulkemail2001.onrender.com/api/email/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete email.");
            }

            // Update the Usernotes state
            const newUserNotes = Usernotes.filter((note) => note._id !== id);
            setUsernotes(newUserNotes);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        // Check for token and navigate to login if not found
        if (!localStorage.getItem("token")) {
            navigate("/login", { replace: true });
            return; // Exit early if no token is found
        }

        const fetchData = async () => {
            try {
                const res = await fetch("https://bulkemail2001.onrender.com/api/email/user/all", {
                    method: "GET",
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Failed to fetch email history.");
                } else {
                    setUsernotes(data.data);
                }
            } catch (err) {
                setError("An error occurred while fetching email history.");
                console.error(err);
            }
        };

        fetchData();
    }, [navigate, setUsernotes]);

    return (
        <div className="account-container">
        <h1>My Account Details</h1>
        <div className='my-account-link'>
            
                <li onClick={()=>{navigate('/dashboard')}}>Dashboard Page</li>
            
        </div>
            <button className="btn btn-add" onClick={() => navigate('/adduser')}>Add Items</button>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            {Usernotes && Usernotes.length > 0 ? (
                <div className="email-cards">
                    {Usernotes.map((data) => (
                        <div key={data._id} className="email-card"> {/* Use a unique key */}
                            <p><strong>Recipient:</strong> {data.recipient}</p>
                            <p><strong>Subject:</strong> {data.subject}</p>
                            <p><strong>Message:</strong> {data.message}</p>
                            <p><strong>Posted by:</strong> {data.user.username}</p>
                            <p><strong>User Email:</strong> {data.user.email}</p>
                            <div className="button-group">
                                <button style={{background:'darkgreen',color:'white'}} className="btn btn-edit" onClick={() => navigate(`/edit/${data._id}`)}>Edit</button>
                                <button style={{background:'red',color:'white'}} className="btn btn-delete" onClick={() => handleDelete(data._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No emails found.</p> // Display message if there are no notes
            )}
        </div>
    );
};

export default Account;