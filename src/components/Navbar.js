import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useAuth } from '../auth/AuthContext.js';
import { AcmeLogo } from "./AcmeLogo.jsx";
import Login from "./Login.js";
import { Link } from 'react-router-dom';
 
import Logout from "./Logout.js"; // Import the Logout component
import axios from "axios";

export default function App() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.userId && user.token) {
        try {
          const response = await axios.get(`http://localhost:9000/users/${user.userId}/role`, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          });
          setRole(response.data.role);
        } catch (error) {
          console.error('Failed to fetch user role', error);
        }
      }
    };

    fetchUserRole();
  }, []);

  return (

    <Navbar>
      {isAuthenticated ? (
        <>
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarContent justify="end">
          <NavbarItem>
              <Link to="/home" color="foreground">
                Accueil
              </Link> 
            </NavbarItem>
            <NavbarItem>
              <Link to="/myprofile" color="foreground">
                Mon Profil
              </Link> 
            </NavbarItem>
            <NavbarItem>
              <Link to="/events" color="foreground">
                Mes Événements
              </Link> 
            </NavbarItem>
            <NavbarItem>
              <Link to="/notifications" color="foreground">
                Notifications
              </Link> 
            </NavbarItem>
            {role === 'admin' && ( // Vérifiez si le rôle est 'admin'
              <NavbarItem>
                <Link to="/admin">Admin</Link>
              </NavbarItem>
            )}
            <NavbarItem>
              <Logout /> 
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem className="lg:flex">
              <Login />
            </NavbarItem>
            <NavbarItem>
              <Button variant="flat">
                <Link to="/registration" color="foreground" >Sign Up</Link>
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
    
  );
}