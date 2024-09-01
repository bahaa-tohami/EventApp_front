import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/react";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
    <div className="main-content">
    <div className="w-full min-h-screen p-5">
      
      <App />
      
    </div>
    </div>
    </NextUIProvider>
    
  </React.StrictMode>
);

