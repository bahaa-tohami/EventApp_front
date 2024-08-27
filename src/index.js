import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
    <div className="w-screen h-screen p-8 flex items-start justify-center">
    
      <App />
    
    </div>
    </NextUIProvider>
  </React.StrictMode>
);

