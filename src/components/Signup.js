import React, { useState } from 'react';
import axios from 'axios';
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Icons";
import { Input, Button} from "@nextui-org/react";
import { Card, CardBody, CardHeader, CardFooter  } from "@nextui-org/card";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [showActionMessage, setShowActionMessage] = useState(false);
    const [showActivationMessage, setShowActivationMessage] = useState(false);
    const [isVisible, setIsVisible] = useState(false); 
    const navigate = useNavigate();

    
    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/;
        return passwordRegex.test(password);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
            // Validation en temps réel
            let newErrors = { ...errors };
            if (name === 'email' && !validateEmail(value)) {
                newErrors.email = 'Veuillez entrer un email valide.';
            } else {
                delete newErrors.email;
            }
            if (name === 'password' && !validatePassword(value)) {
                newErrors.password = 'Le mot de passe doit comporter au moins 8 caractères, inclure une lettre majuscule et un caractère spécial.';
            } else {
                delete newErrors.password;
            }
            setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        if (!validateEmail(formData.email)) {
            validationErrors.email = 'Veuillez entrer un email valide.';
        }
        if (!validatePassword(formData.password)) {
            validationErrors.password = 'Le mot de passe doit comporter au moins 8 caractères, inclure une lettre majuscule et un caractère spécial.';
        }
        setErrors(validationErrors);

        // Si des erreurs existent, on ne soumet pas le formulaire
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
        // Crée un nouvel objet qui mappe 'password' à 'password_hash' pour le backend
        const dataToSend = {
            ...formData,
            password_hash: formData.password // Mapper 'password' à 'password_hash'
        };

        try {
            const response = await axios.post('http://localhost:9000/users', dataToSend);
            setMessage(response.data.message);
            navigate('/activation');
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setMessage('Erreur lors de l\'inscription');
        }
    };
    const handleCancelation= (event) => {
        
        navigate(`/`);
    };

    // Il faut définir `sizes` pour éviter les erreurs
    const sizes = ["md"]; // Ajustez cette liste selon vos besoins
    return (
        <div>
        <div className="flex justify-center items-center min-h-screen ">
            {showActionMessage && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card>
                        <CardHeader>
                            <p className="text-2xl font-bold">Activation du compte</p>
                        </CardHeader>
                        <CardBody>
                            <p>Vous avez reçu un lien d'activation par email. Connectez-vous pour activer votre compte.</p>
                        </CardBody>
                    </Card>
                </div>
            )}  
            <div className="w-full max-w-xs flex flex-col gap-6 ">
                {sizes.map((size) => (
                    <div key={size} className="w-full flex flex-col gap-6">
                        <Card className="pb-10">
                            <CardHeader className="flex gap-3">
                                <div>
                                    <p className="text-2xl font-bold">Inscription</p>
                                    <p className="text-small text-default-500">Créez votre compte</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-4 ">
                                        <Input
                                            size={size}
                                            type="text"
                                            label="Nom d'utilisateur"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            className="max-w-xs"
                                        />
                                        <Input
                                            size={size}
                                            type="email"
                                            label="Email"
                                            name="email"
                                            value={formData.email}
                                            placeholder="junior@gmail.com"
                                            onChange={handleChange}
                                            required
                                            className="max-w-xs"
                                        
                                        />
                                         {errors.email && (
                                                <p className="text-red-500 text-sm">{errors.email}</p>
                                            )}
                                        <Input
                                            size={size}
                                            type="text"
                                            label="Prénom"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                            className="max-w-xs"
                                        />
                                        <Input
                                            size={size}
                                            type="text"
                                            label="Nom"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                            className="max-w-xs"
                                        />
                                        <Input
                                            size={size}
                                            label="Mot de passe"
                                            placeholder="Enter your password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                    {isVisible ? (
                                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="max-w-xs"
                                            
                                        />
                                         {errors.password && (
                                                <p className="text-red-500 text-sm">{errors.password}</p>
                                            )}
                                    </div>
                                 
                                </form>
                                {message && <p>{message}</p>}
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-between gap-6 w-full " >
                                
                                    <Button color="primary" type="submit" style={{ marginTop: '20px' }}onClick={handleSubmit}>S'inscrire</Button>
                                
                                    <Button color="danger" variant="light" type="submit" style={{ marginTop: '20px' }} onClick={handleCancelation}> Annuler</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
         {showActivationMessage && (
            <div className="flex justify-center items-center min-h-screen mt-50">
            <div className="w-full max-w-sm flex flex-col gap-6">
                <Card className="pb-10">
                    <CardHeader className="flex gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">Activation compte</h1>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p>Nous avons envoyé un email d'activation. Veuillez vous connecter pour activer votre compte.</p>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => navigate('/')} color="success" className="mr-2 w-full btn-success" size="xs">Home</Button>
                        <Button  onClick={() => navigate('/login')} color="secondary" className="w-full btn-secondary" size="xs">Connexion</Button>
                    </CardFooter>
                </Card>
            
            </div>
        </div>
        )}
        </div>
    );
};

export default Signup;
