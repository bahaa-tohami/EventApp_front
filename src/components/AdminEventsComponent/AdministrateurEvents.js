import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { DeleteEvent } from "./DeleteEventIcon";
import { EditEventIcon } from "./EditEventIcon";
import { EditEventModal } from "./EditEventModal";

const columns = [
  { name: "TITRE", uid: "title" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "DATE", uid: "date" },
  { name: "HEURE", uid: "time" },
  { name: "LIEU", uid: "location" },
  { name: "CAPACITÉ", uid: "capacity" },
  { name: "PRIVÉ", uid: "is_private" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AdministrateurEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9000/admin/events', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      setEvents(response.data);
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements:", error);
      setError("Impossible de charger les événements. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9000/admin/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        
      });
      fetchEvents();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
      setError("Impossible de supprimer l'événement. Veuillez réessayer plus tard.");
    }
  };

  const updateEvent = async (eventId, updatedData) => {
    try {
      console.log(updatedData);
      const response = await axios.put(
        `http://localhost:9000/admin/events/${eventId}`,
        updatedData,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        console.log("Événement mis à jour avec succès");
        fetchEvents(); // Rafraîchir la liste des événements
      } else {
        throw new Error("La mise à jour a échoué");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement:", error);
      setError(`Impossible de mettre à jour l'événement: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const renderCell = useCallback((event, columnKey) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "title":
        return <p className="text-bold text-sm">{cellValue}</p>;
      case "date":
        return <p className="text-bold text-sm">{cellValue}</p>;
      case "time":
        return <p className="text-bold text-sm">{cellValue}</p>;
      case "capacity":
        return <p className="text-bold text-sm">{cellValue}</p>;
      case "is_private":
        return (
          <Chip color={cellValue ? "primary" : "default"} size="sm" variant="flat">
            {cellValue ? "Privé" : "Public"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Modifier l'événement">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditEventIcon onClick={() => {
                  setSelectedEvent(event);
                  setEditModalOpen(true);
                }} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Supprimer l'événement">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteEvent onDelete={() => deleteEvent(event.event_id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) return <p>Chargement des événements...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <Table aria-label="Tableau des événements">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={events}>
          {(item) => (
            <TableRow key={item.event_id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedEvent && (
        <EditEventModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          event={selectedEvent}
          onUpdateEvent={updateEvent}
        />
      )}
    </>
  );
}