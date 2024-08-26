import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";
import Login from "./Login";



export default function App() {
;

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
        <NavbarContent>
        <NavbarItem>
         <Login />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="/registration">S'inscrire</Link>
        </NavbarItem>
      </NavbarContent>
      
    </Navbar>
  );
}