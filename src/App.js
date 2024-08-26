import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./pages/Registration";
import "./App.css";

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>

  );
};

export default App;