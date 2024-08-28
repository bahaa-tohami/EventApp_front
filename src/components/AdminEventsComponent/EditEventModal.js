import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from "@nextui-org/react";

export function EditEventModal({ isOpen, onClose, event, onUpdateEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    capacity: '',
    is_private: false,
    location: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        capacity: event.capacity || '',
        is_private: event.is_private || false,
        location: event.location || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    onUpdateEvent(event.event_id, formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Modifier l'événement</ModalHeader>
        <ModalBody>
          <Input
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            label="Heure"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <Input
            label="Capacité"
            name="capacity"
            type="number"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
          <Input
            label="Lieu"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <Checkbox
            name="is_private"
            isSelected={formData.is_private}
            onChange={handleChange}
          >
            Événement privé
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Annuler
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Sauvegarder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}