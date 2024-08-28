import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Events from "./pages/Events";import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

import LandingPage from "./pages/LandingPage";
import { AuthProvider } from './auth/AuthContext';
import Navbar from "./components/Navbar.js";
import { Container } from "@nextui-org/react";
import EventForm from "./components/EventForm";
import MyProfile from "./pages/MyProfile.js";


const App = () => {
  return (
    
    
    <AuthProvider>
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/myprofile" element={<MyProfile />} />

        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
   </AuthProvider>

  );
};

export default App;