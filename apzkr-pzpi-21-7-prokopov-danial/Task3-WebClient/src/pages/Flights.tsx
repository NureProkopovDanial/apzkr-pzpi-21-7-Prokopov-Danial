import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FlightCreateModal } from '../components/Models/Flight/FlightCreateModal';
import { FlightEditModal } from '../components/Models/Flight/FlightEditModal';
import { deleteFlight, getFlights } from '../http/flightApi';
import { IFlight } from '../interfaces/IFlight';

export const Flights = () => {
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IFlight>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IFlight) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getFlights()
        .then((data) => {
            setFlights(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteFlight(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <FlightCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></FlightCreateModal>
  
        <FlightEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></FlightEditModal>
        <h1>Flights</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Flight №</th>
              <th>Departure time</th>
              <th>Arrival time</th>
              <th>Dep. airport</th>
              <th>Arrival airport</th>
              <th>Aircraft</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightId}>
                <td>{flight.flightId}</td>
                <td>{flight.flightNumber}</td>
                <td>{flight.departureDateTime}</td>
                <td>{flight.arrivalDateTime}</td>
                <td>{flight.departureAirport?.name}</td>
                <td>{flight.arrivalAirport?.name}</td>
                <td>{flight.aircraft?.modelName}</td>
                <td>{flight.notes}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(flight)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(flight.flightId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
