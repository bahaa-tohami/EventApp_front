import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useAuth } from '../auth/AuthContext.js';
import { AcmeLogo } from "./AcmeLogo.jsx";
import Login from "./Login.js";
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
              <Link href="#" color="default">
                Mon Profil
              </Link> 
            </NavbarItem>
            <NavbarItem>
              <Link href="/events" color="primary">
                Mes Événements
              </Link> 
            </NavbarItem>
            <NavbarItem>
              <Link href="#" color="primary">
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
              <Button as={Link} color="primary" href="/registration" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
  );
}