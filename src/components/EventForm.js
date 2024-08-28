import React, { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button, Textarea } from "@nextui-org/react";
import axios from 'axios';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';



const EventForm = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [is_private, setIsPrivate] = useState(false);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState();
    const options = [{ key: false, label: "Public" }, { key: true, label: "Privé" }]
    const navigate = useNavigate();


    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "title":
                if (!value || value.length <= 5) {
                    error = 'Le titre doit avoir au moins 5 caractères.';
                }
                break;
            case "location":
                if (!value || value.length <= 3) {
                    error = 'Le lieu doit avoir au moins 5 caractères.';
                }
                break;
            case "description":
                if (!value || value.length <= 10) {
                    error = 'La description doit avoir au moins 10 caractères.';
                }
                break;
            case "capacity":
                if (!value || value <= 0) {
                    error = 'Le nombre de place doit être supérieur à 0.';
                }
                break;
            case "date":
                const today = new Date();
                const eventDate = new Date(value);
                if (!value || eventDate <= today) {
                    error = 'La date doit être supérieure ou égale à la date du jour.';
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleFocus = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "location":
                setLocation(value);
                break;
            case "date":
                setDate(value);
                break;
            case "time":
                setTime(value);
                break;
            case "capacity":
                setCapacity(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "is_private":
                setIsPrivate(value)
                console.log(is_private)
                break;
            default:
                break;
        }

        validateField(name, value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const storageData = JSON.parse(localStorage.getItem("user"))
        console.log(storageData)
        const headers = {
            Authorization: `Bearer ${storageData.token}`
        };
        const eventData = { description, date, time, capacity, is_private, title, location }
        console.log(eventData)
        console.log(storageData.userId)
        try {
            const response = await axios.post(`http://localhost:9000/event/save-event/${storageData.userId}`, eventData, { headers })
            console.log(response.data)
            navigate("/events")
        } catch (error) {
            console.log(error)
        }

    };
    useEffect(() => {
        // Vérifier si toutes les conditions sont remplies
        const valid =
            title.length >= 5 &&
            location.length >= 5 &&
            description.length >= 10 &&
            new Date(date) >= new Date();

        setIsValidForm(valid);
    }, [title, location, date, description]);


    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className='w-full max-w-3xl flex flex-col gap-2'>
                    <Card>
                        <CardHeader>
                            <h1>Création d'un événement</h1>
                        </CardHeader>
                        <CardBody>                                                                                  
                    <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
                            <Input
                                type="text"
                                name="title"
                                label="Titre"
                                placeholder="Titre de l'événement"
                                value={title}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.title && <p color="error">{errors.title}</p>}
                    
                            <Input
                                type="text"
                                name="location"
                                label="Lieu"
                                placeholder="Lieu de l'événement"
                                value={location}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.location && <p color="error">{errors.location}</p>}
                        
                            <Input
                                type="date"
                                name="date"
                                label="Date"
                                placeholder="Date de l'événement"
                                value={date}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.date && <p color="error">{errors.date}</p>}
                       
                            <Input
                                type="time"
                                name="time"
                                label="Heure"
                                placeholder="Heure de l'événement"
                                value={time}
                                onChange={handleChange}
                            />
                      
                            <Input
                                type="number"
                                name="capacity"
                                min={1}
                                label="Nombre de place"
                                placeholder="Nombre de place"
                                value={capacity}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.capacity && <p color="error">{errors.capacity}</p>}
                       

                            <Select
                                name="is_private"
                                label="Type d'événement"
                                onChange={(value) => handleChange(value)}
                                value={is_private}
                            >
                                {options.map((op) => (
                                    <SelectItem key={op.key}>
                                        {op.label}
                                    </SelectItem>
                                ))}
                            </Select>
                      
                            <Textarea
                                name="description"
                                label="Description"
                                placeholder="Description de l'événement"
                                value={description}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {errors.description && <p color="error">{errors.description}</p>}

                        <Button disabled={!isValidForm} type="submit" color="primary">Créer</Button>

                    </form>
                    </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
