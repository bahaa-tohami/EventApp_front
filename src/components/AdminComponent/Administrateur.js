import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip} from "@nextui-org/react";
import {DeleteUser} from "./DeleteUser";
//import {EditIcon} from "./EditIcon";
//import {DeleteIcon} from "./DeleteIcon";
//import {EyeIcon} from "./EyeIcon";


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  {name: "username", uid: "username"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];


export default function Administrateur() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) // là où est stocké le token
 

     useEffect(() => {
      fetchUsers();
    }, []);

       const fetchUsers = async () => {
         try {
          setLoading(true);
           const response = await axios.get('http://localhost:9000/admin/users', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
           console.log(response.data); // Juste pour vérifier que les users sont bien récupérer
           setUsers(response.data);
           setError(null);
         } catch (error) {
           console.error("Erreur lors de la récupération des utilisateurs:", error);
           setError("Impossible de charger les utilisateurs. Veuillez réessayer plus tard.");
         } finally {
           setLoading(false);
         }
       };



  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:9000/admin/users/delete/${userId}}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      // Rafraîchir la liste des utilisateurs après la suppression
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      setError("Impossible de supprimer l'utilisateur. Veuillez réessayer plus tard.");
      
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "username":
        return (
          <User
            description={`${user.username}`}
            username={`${user.username}`}
          >
            {`${user.username}`}
          </User>
        );
      case "role":
        return (
          
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{`${user.role}`}</p>
            </div>
          
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            
              {`${user.status}`}
            
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {/*<EyeIcon />*/}
              </span>
            </Tooltip>
            
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {/*<EditIcon />*/}
              </span>
            </Tooltip>

            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteUser onDelete={() => deleteUser(user.user_id)}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.username}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
