import React, { useState } from 'react';
import axios from 'axios';
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";


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
    <Popover placement="bottom" showArrow={true}>
       <PopoverTrigger>
        <Button>Se connecter</Button>
      </PopoverTrigger>
      <PopoverContent>
    <div className="px-1 py-2">
      <form method="post" onSubmit={handleSubmit} className="login-form">
        <input className="text-small font-bold" type="text" placeholder="Email" name="username" onChange={handleChange} value={username} />
        <input className="text-small font-bold" type="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={password} />
        <button>Connexion</button>
      </form>
    </div>
    </PopoverContent>
    </Popover>
  );
};

export default Login;