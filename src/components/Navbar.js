import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useAuth } from '../auth/AuthContext.js';
import { AcmeLogo } from "./AcmeLogo.jsx";
import Login from "./Login.js";
import { Link } from 'react-router-dom';
 
import Logout from "./Logout.js"; // Import the Logout component

export default function App() {
  const { isAuthenticated } = useAuth();

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
                <Link href="/registration" color="foreground" >Sign Up</Link>
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
    
  );
}