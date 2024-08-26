import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import pour la redirection avec useNavigate
import './Signup.css';
import { Input } from "@nextui-org/react"; // Assurez-vous que l'importation est nécessaire

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // État pour vérifier le succès de l'inscription
    const [emailError, setEmailError] = useState(''); // État pour les erreurs de validation de l'e-mail
    const [passwordError, setPasswordError] = useState(''); // État pour les erreurs de validation du mot de passe
    const navigate = useNavigate(); // Hook pour la redirection

    useEffect(() => {
        setFormData({
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: ''
        });
        setEmailError('');
        setPasswordError('');
        setMessage('');
        setIsSuccess(false);
    }, []);

    const validateEmail = (email) => {
        // Regex pour valider l'e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        // Exemple de validation de mot de passe : au moins 6 caractères
        return password.length >= 8;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validation de l'e-mail en temps réel
        if (name === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Veuillez entrer un e-mail valide.');
            } else {
                setEmailError('');
            }
        }

        // Validation en temps réel du mot de passe
        if (name === 'password') {
            if (!validatePassword(value)) {
                setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérification finale de l'e-mail avant de soumettre le formulaire
        if (!validateEmail(formData.email)) {
            setEmailError('Veuillez entrer un e-mail valide.');
            return;
        }

        if (!validatePassword(formData.password)) {
            setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        const dataToSend = {
            ...formData,
            password_hash: formData.password // Mapper 'password' à 'password_hash'
        };

        try {
            const response = await axios.post('http://localhost:9000/users', dataToSend);
            setMessage(response.data.message);

            if (response.data.message === "Utilisateur créé avec succès") {
                setIsSuccess(true); // Mettre à jour l'état de succès
                setTimeout(() => {
                    navigate('/'); // Rediriger vers la page d'accueil après un délai
                }, 3000); // Par exemple, rediriger après 3 secondes
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setMessage('Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="signup-container">
              <h2 className="signup-title">
                Inscription
            </h2>
            {!isSuccess && (
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                    </div>
                    <div className="input-group">
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>

                    <button className="signup-button" type="submit" disabled={!!emailError || !!passwordError}>S'inscrire</button>
                </form>
            )}
            {message && (
                <p className={`message ${isSuccess ? 'success' : ''}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Signup;
