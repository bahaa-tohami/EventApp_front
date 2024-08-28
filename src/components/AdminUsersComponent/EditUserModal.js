import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio} from "@nextui-org/react";

export function EditUserModal({ isOpen, onClose, user, onChangeRole, onActivateUser, onDeactivateUser }) {
  const [selectedRole, setSelectedRole] = React.useState(user.role);

  const handleSave = () => {
    if (selectedRole !== user.role) {
      onChangeRole(user.user_id, selectedRole);
    }
    onClose();
  };

  const handleStatusChange = () => {
    if (user.status === 'active') {
      onDeactivateUser(user.user_id);
    } else {
      onActivateUser(user.user_id);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3 className="text-lg font-semibold">
            Modifier l'utilisateur : {user.username}
          </h3>
        </ModalHeader>
        <ModalBody>
          <RadioGroup 
            label="Rôle" 
            value={selectedRole} 
            onValueChange={setSelectedRole}
          >
            <Radio value="user">Utilisateur</Radio>
            <Radio value="admin">Administrateur</Radio>
          </RadioGroup>
          <Button 
            color={user.status === 'active' ? "danger" : "success"} 
            onPress={handleStatusChange}
          >
            {user.status === 'active' ? "Désactiver" : "Activer"} l'utilisateur
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Annuler
          </Button>
          <Button color="primary" onPress={handleSave}>
            Sauvegarder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}