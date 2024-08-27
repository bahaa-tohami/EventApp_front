import React, { useState } from 'react';
import axios from 'axios';

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { useAuth } from '../auth/AuthContext';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();

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
          setIsAuthenticated(true);
          window.location = "/home";

        }
      });
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button>Se connecter</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <form method="post" onSubmit={handleSubmit} className="login-form p-3">
            <input
              className="text-small p-3 mb-4"
              type="text"
              placeholder="Email"
              name="username"
              onChange={handleChange}
              value={username}
            />
            <input
              className="text-small p-3 mb-4"
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              value={password}
            />
          
            <button className="p-3">Connexion</button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Login;