import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import EmailForm from './components/AddUser';
import EmailHistory from './components/dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Edituser from './components/Edituser';
import AddUser from './components/AddUser';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import './App.css'
import Header from './components/Header';


const App = () => {
    const [Usernotes, setUsernotes] = useState([]);
// const Navigate=useNavigate()
   

    return (
        <div className="app-container">
          <Header/>
          <div className='app-container'>
          <Routes>
                <Route path="/adduser" element={<AddUser Usernotes={Usernotes}  setUsernotes={setUsernotes}/>} />
                <Route path="/dashboard" element={<EmailHistory/>} />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<Account Usernotes={Usernotes}  setUsernotes={setUsernotes} />} />
                <Route path="/edit/:id" element={<Edituser Usernotes={Usernotes}  setUsernotes={setUsernotes} />} />
             
                <Route path="/forgot-password" element={<ForgotPassword/>} /> 
                <Route path="/reset-password/:token" element={<ResetPassword />} /> 
            </Routes>

          </div>
           
        </div>
    );
};

export default App;