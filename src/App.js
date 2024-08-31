import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Events from "./pages/Events";
import AdminPage from "./pages/AdminPage";

import LandingPage from "./pages/LandingPage";
import { AuthProvider } from './auth/AuthContext';
import Navbar from "./components/Navbar.js";
import { Container } from "@nextui-org/react";
import EventForm from "./components/EventForm";
import MyProfile from "./pages/MyProfile.js";
import EventDetails from "./pages/EventDetails.js";
import InvitationPage from "./pages/InvitationPage.js";
import NotificationPage from "./pages/NotificationPage.js";
import InviteUserForm from "./components/InviteUserForm.js";
import { io } from 'socket.io-client';
import { useState } from 'react';
import { UserConnected } from './auth/userConnected.js';
import { useEffect } from 'react';

const socket = io('http://localhost:9000');

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [countNotifications, setCountNotifications] = useState(0);
  useEffect(() => {
    socket.on('newNotification', (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      const userConnected = UserConnected();
      console.log(userConnected);
      console.log(message.user_id);
      if(message.user_id == userConnected){
        setCountNotifications(prevCount => prevCount + 1);
      }
      console.log("countNotifications " + countNotifications);
    });
    // nettoyage à la déconnexion du socket
    return () => {
      socket.off('newNotification');
    };
  }, []);

  const handleOnClickOnNotification = () => {
    setCountNotifications(0);
  };

  return (

    <AuthProvider>
      <Router>
        <Navbar handleOnClickOnNotification={handleOnClickOnNotification} countNotifications={countNotifications} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/invite-user/:eventId" element={<InviteUserForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/eventdetails/:eventId" element={<EventDetails />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/invitations" element={<InvitationPage />} />
          {/* Ajoutez d'autres routes ici */}
        </Routes>
      </Router>
    </AuthProvider>

  );
};

export default App;