import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../auth/auth';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const headers = auth();
        const response = await axios.get('http://localhost:9000/event/events', { headers });
        setEvents(response.data);
        console.log('Événements récupérés avec succès:', response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };

    fetchEvents();
  }, []);

  // Calculer les événements à afficher pour la page actuelle
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'black' }}>
      <div style={{ width: '100%', maxWidth: '800px', margin: '1rem' }}>
        {currentEvents.length > 0 ? (
          currentEvents.map(event => {
            const eventTime = new Time(event.time.split(':')[0], event.time.split(':')[1]);
            return (
              <Card key={event.event_id} className="max-w-[800px]" style={{ marginBottom: '2rem' }}>
                <CardHeader className="flex gap-3">
                  <Image
                    alt="event image"
                    height={40}
                    radius="sm"
                    src="https://via.placeholder.com/40" // Remplacez par l'URL de l'image de l'événement si disponible
                    width={40}
                  />
                  <div className="flex flex-col">
                    <h1 className="text-xl">{event.title}</h1>
                    <p className="text-small text-default-500">{event.location}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-lg">{event.description}</p>
                  <p>
                    {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>

                  <br />
                  <TimeInput
                    isReadOnly
                    label="Event Time"
                    defaultValue={eventTime}
                  />
                  <br />
                  <p>Organisé par {capitalizeFirstLetter(event.User.username)}</p> {/* Assurez-vous que le champ est correct */}
                  <p>Capacité maximale de {event.capacity} personnes</p>
                  <NavLink href="">
                    En savoir plus
                  </NavLink>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href={`https://maps.google.com/?q=${event.location}`} // Lien vers la localisation de l'événement
                  >
                    Voir la localisation
                  </Link>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>Aucun événement disponible.</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, index) => (
            <Button key={index + 1} onClick={() => paginate(index + 1)} style={{ margin: '0 5px' }}>
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;