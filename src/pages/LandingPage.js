import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader
} from '@nextui-org/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>
          Organisez vos événements en toute simplicité
        </h1>
        <p>
          Une application intuitive pour créer, gérer, et participer à des événements.
        </p>
        <Link to="/registration">
          <Button size="lg">Commencez dès maintenant</Button>
        </Link>
      </div>

      {/* Fonctionnalités Section */}
      <div id="features" className="features-section">
        <h2>
          Découvrez les fonctionnalités clés
        </h2>
        <div className="card-container">
          <Card className="card">
            <CardHeader>
              <h1>Création d'Événements</h1>
            </CardHeader>
            <CardBody>
              Planifiez des événements en quelques clics et personnalisez-les selon vos besoins.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Gestion des Participants</h1>
            </CardHeader>
            <CardBody>
              Invitez, suivez et gérez les inscriptions facilement.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Interface Calendrier</h1>
            </CardHeader>
            <CardBody>
              Visualisez vos événements à venir dans un calendrier interactif.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Notifications et Rappels</h1>
            </CardHeader>
            <CardBody>
              Recevez des rappels pour ne jamais manquer un événement.
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Avantages Section */}
      <div id="advantages" className="advantages-section">
        <h2>
          Pourquoi choisir notre application ?
        </h2>
        <div className="card-container">
          <Card className="card">
            <CardHeader>
              <h1>Facilité d'utilisation</h1>
            </CardHeader>
            <CardBody>
              Une interface claire et intuitive pour tous les utilisateurs.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Gain de temps</h1>
            </CardHeader>
            <CardBody>
              Organisez rapidement vos événements et gagnez du temps sur la gestion.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Accessibilité</h1>
            </CardHeader>
            <CardBody>
              Accessible sur tous vos appareils, où que vous soyez.
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Sécurité</h1>
            </CardHeader>
            <CardBody>
              Vos données sont protégées avec les meilleures pratiques de sécurité.
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Témoignages Section */}
      <div id="testimonials" className="testimonials-section">
        <h2>
          Ce que nos utilisateurs disent
        </h2>
        <div className="card-container">
          <Card className="card">
            <CardHeader>
              <h1>Marie, Responsable d'Événements</h1>
            </CardHeader>
            <CardBody>
              "Grâce à cette application, j'ai pu organiser des événements sans stress !"
            </CardBody>
          </Card>
          <Card className="card">
            <CardHeader>
              <h1>Paul, Utilisateur régulier</h1>
            </CardHeader>
            <CardBody>
              "Les notifications et rappels sont super pratiques, je n'oublie plus jamais un événement !"
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Call-to-Action Finale Section */}
      <div className="cta-finale">
        <h2>
          Prêt à commencer ?
        </h2>
        <Link to="/registration">
          <Button size="lg">S'inscrire maintenant !</Button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;