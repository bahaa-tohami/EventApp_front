import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataForm = {
      password: password,
      username: username
    };
    console.log("Submitting form with data:", dataForm);
    axios.post(`http://localhost:9000/login`, dataForm)
      .then((res) => {
        console.log("Response received:", res);
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log("User data saved to localStorage:", res.data);
        
        }
        return res.data;
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="login-container">
      <form method="post" onSubmit={handleSubmit} className="login-form">
        <h2 style={{ paddingLeft: 1 + 'em' }}>Connectez-vous !</h2>
        <input type="text" placeholder="Email" name="username" onChange={handleChange} value={username} />
        <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={password} />
        <button>Connexion</button>
      </form>
    </div>
  );
};

export default Login;