import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { PassengerCreateModal } from '../components/Models/Passenger/PassengerCreateModal';
import { PassengerEditModal } from '../components/Models/Passenger/PassengerEditModal';
import { deletePassenger, getPassengers } from '../http/passengerApi';
import { IPassenger } from '../interfaces/IPassenger';

export const Passengers = () => {
    const [passengers, setPassengers] = useState<IPassenger[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IPassenger>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IPassenger) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getPassengers()
        .then((data) => {
            setPassengers(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deletePassenger(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <PassengerCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></PassengerCreateModal>
  
        <PassengerEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></PassengerEditModal>
        <h1>Passengers</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Passport</th>
              <th>Birthday</th>
              <th>Nationality</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.passengerId}>
                <td>{passenger.passengerId}</td>
                <td>{passenger.firstName}</td>
                <td>{passenger.lastName}</td>
                <td>{passenger.passportNumber}</td>
                <td>{passenger.dateOfBirth}</td>
                <td>{passenger.nationality}</td>
                <td>{passenger.contactNumber}</td>
                <td>{passenger.email}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(passenger)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(passenger.passengerId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
