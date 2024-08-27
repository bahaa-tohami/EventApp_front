import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/Navbar.js";
import { AuthProvider } from './auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
    <div className="w-screen h-screen p-8 flex items-start justify-center">

    <AuthProvider>
      <Navbar />
      <App />
      </AuthProvider>
    
    </div>
    </NextUIProvider>
  </React.StrictMode>
);

