import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AirportCreateModal } from '../components/Models/Airport/AirportCreateModal';
import { AirportEditModal } from '../components/Models/Airport/AirportEditModal';
import { deleteAirport, getAirports } from '../http/airportApi';
import { IAirport } from '../interfaces/IAirport';

export const Airports = () => {
    const [airports, setAirports] = useState<IAirport[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IAirport>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IAirport) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getAirports()
        .then((data) => {
            setAirports(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteAirport(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <AirportCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></AirportCreateModal>
  
        <AirportEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></AirportEditModal>
        <h1>Airports</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport) => (
              <tr key={airport.airportId}>
                <td>{airport.airportId}</td>
                <td>{airport.name}</td>
                <td>{airport.address}</td>
                <td>{airport.phone}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(airport)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(airport.airportId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
