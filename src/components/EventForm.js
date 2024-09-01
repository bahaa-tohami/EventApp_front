import React, { useState, useEffect } from 'react';
import { Input, Select, SelectItem, Button, Textarea } from "@nextui-org/react";
import axios from 'axios';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import usePutData from '../hooks/putData';
import usePostData from '../hooks/postData';
import { UserConnected } from '../auth/userConnected';

const EventForm = ({ event }) => {
    const [title, setTitle] = useState(event?.title || '');
    const [location, setLocation] = useState(event?.location || '');
    const [date, setDate] = useState(event?.date || '');
    const [time, setTime] = useState(event?.time || '');
    const [capacity, setCapacity] = useState(event?.capacity || '');
    const [is_private, setIsPrivate] = useState(event?.is_private || false);
    const [description, setDescription] = useState(event?.description || '');
    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);
    const options = [{ key: false, label: "Public" }, { key: true, label: "Privé" }];
    const navigate = useNavigate();
    const userConnected = UserConnected();
const { putData, errorPut, loadingPut } = usePutData(`http://localhost:9000/event/update-event/${event?.event_id}`);
    const {postData, errorPost, loadingPost, dataReturnPost } = usePostData(`http://localhost:9000/event/save-event/${userConnected}`);
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
            case 'time':
                  if(!value) {
                    error = "L'heure doit être definie"
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
                setIsPrivate(value);
                break;
            default:
                break;
        }

        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storageData = JSON.parse(localStorage.getItem("user"));
        const headers = {
            Authorization: `Bearer ${storageData.token}`
        };
        const eventData = { description, date, time, capacity, is_private, title, location };

        try {
            if (event) {
                // Mode édition
                const response = await putData(eventData);
                if (!errorPut ) {
                    console.log("Événement mis à jour avec succès !");
                    navigate(`/eventdetails/${event.event_id}`);
                }
            } else {
                const response = await postData(eventData);
                if(!errorPost && response) {  
                    console.log("Enregistrement effectué !");
                    console.log("Nouvel événement :" + response.newEvent.event_id);
                    navigate(`/eventdetails/${response.newEvent.event_id}`);
                }
                /*
                if (!errorPost) {
                    console.log("Événement créé avec succès !");
                    navigate(`/eventdetails/${response.newEvent.event_id}`);
                }*/
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const valid =
            title.length >= 5 &&
            location.length >= 5 &&
            description.length >= 10 &&
            new Date(date) >= new Date();

        setIsValidForm(valid);
    }, [title, location, date, description]);

    return (
        <div>
            <br />
            <div className="flex justify-center items-center">
                <div className="w-full max-w-3xl flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <h1>{event ? "Modifier l'événement" : "Création d'un événement"}</h1>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Première ligne */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
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
                                        {errors.title && <p style={{ color: 'red', fontSize: '15px' }} className="text-red-500 p-2 rounded-md">{errors.title}</p>}
                                    </div>
                                    <div className="flex-1">
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
                                        {errors.location && <p style={{ color: 'red', fontSize: '15px' }} color="error">{errors.location}</p>}
                                    </div>
                                </div>

                                {/* Deuxième ligne */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
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
                                        {errors.date && <p style={{ color: 'red', fontSize: '15px' }} color="error">{errors.date}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            type="time"
                                            name="time"
                                            label="Heure"
                                            placeholder="Heure de l'événement"
                                            value={time}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                        />
                                        {errors.time && <p style={{ color: 'red', fontSize: '15px' }} className="text-red-500 p-2 rounded-md">{errors.time}</p>}

                                    </div>
                                </div>

                                {/* Troisième ligne */}
                                <div className="flex gap-4">
                                    <div className="flex-1">
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
                                        {errors.capacity && <p style={{ color: 'red', fontSize: '15px' }} color="error">{errors.capacity}</p>}
                                    </div>
                                    <div className="flex-1">
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
                                    </div>
                                </div>

                                {/* Quatrième ligne */}
                                <div className="flex-1">
                                    <Textarea
                                        name="description"
                                        label="Description"
                                        placeholder="Description de l'événement"
                                        value={description}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                    />
                                    {errors.description && <p style={{ color: 'red', fontSize: '15px' }} color="error">{errors.description}</p>}
                                </div>

                                <Button disabled={!isValidForm} type="submit" color="primary">
                                    {event ? "Mettre à jour" : "Créer"}
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
