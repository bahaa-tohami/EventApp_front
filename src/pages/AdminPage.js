import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import AdministrateurUsers from '../components/AdminUsersComponent/AdministrateurUsers';
import AdministrateurEvents from '../components/AdminEventsComponent/AdministrateurEvents';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('users');

    const linkStyle = (isActive) => ({
        color: isActive ? 'grey' : 'inherit',
        fontWeight: isActive ? 'bold' : 'normal',
    });

    const tableContainerStyle = {
        maxWidth: '90%',
        margin: '0 auto',
        padding: '20px',
        overflowX: 'auto',
    };

    return (
        <div className="AdminPage">
            <Navbar>

                <NavbarContent className="flex gap-4" justify="center">
                    <NavbarItem>
                        <Link 
                            href="#" 
                            style={linkStyle(activeTab === 'users')}
                            onClick={() => setActiveTab('users')}
                        >
                            Utilisateurs
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link 
                            href="#" 
                            style={linkStyle(activeTab === 'events')}
                            onClick={() => setActiveTab('events')}
                        >
                            Événements
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div style={tableContainerStyle}>
                {activeTab === 'users' && <AdministrateurUsers />}
                {activeTab === 'events' && <AdministrateurEvents />}
            </div>
        </div>
    );
};

export default AdminPage;