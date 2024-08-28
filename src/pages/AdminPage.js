import React from 'react';
import AdministrateurUsers from '../components/AdminUsersComponent/AdministrateurUsers';
import AdministrateurEvents from '../components/AdminEventsComponent/AdministrateurEvents';
const AdminPage = () => {
    return (
        <div className="AdminPage">
            <h2>Page Administrateur</h2>
            <AdministrateurUsers /> 
            <AdministrateurEvents />
        </div>
    );
};

export default AdminPage;