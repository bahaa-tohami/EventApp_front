import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;