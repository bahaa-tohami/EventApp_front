import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from './MailIcon.jsx';
import { LockIcon } from './LockIcon.jsx';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setIsAuthenticated } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState('blur');
  const navigate = useNavigate();

  const handleOpen = () => {
    setBackdrop('blur');
    onOpen();
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let dataForm = {
      password: password,
      username: username
    };

    try {
      const res = await axios.post(`http://localhost:9000/login`, dataForm);
      console.log("Response received:", res);
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsAuthenticated(true);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <>
      <Button variant="flat" color="default" onPress={handleOpen}>
        Connexion
      </Button>
      <Modal backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form method="post" onSubmit={handleSubmit} className="login-form p-3">
              <ModalHeader className="flex flex-col gap-1">Connexion</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nom d'utilisateur"
                  placeholder="Entrez votre nom d'utilisateur"
                  variant="bordered"
                  name="username"
                  onChange={handleChange}
                  value={username}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  type="password"
                  variant="bordered"
                  name="password"
                  onChange={handleChange}
                  value={password}
                />
                
                {error && <p className="error">{error}</p>}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fermer
                </Button>
                <Button color="primary" type="submit">
                  Se connecter
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;