import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import userConnected from "../auth/userConnected";
const TableEvent = ({events}) => {
    const getRowBackgroundColor = (event) => {
        const userConnected = JSON.parse(localStorage.getItem('user'));
        if (event.created_by == userConnected.userId) {
            return '#00aa9b';  // Couleur de fond rouge clair pour les événements importants
        } 
        return ''; // Aucune couleur de fond par défaut
    };
    const navigate = useNavigate();
    return (
        <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Titre</TableColumn>
          <TableColumn>Lieu</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={index} style={{backgroundColor: getRowBackgroundColor(event)}}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</TableCell>
              <TableCell>
                <Button color="primary" variant="light" onPress={() => navigate(`/eventdetails/${event.event_id}`)}>
                  Voir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
}

export default TableEvent;