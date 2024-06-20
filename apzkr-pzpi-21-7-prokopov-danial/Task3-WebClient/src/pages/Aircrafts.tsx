import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { AircraftCreateModal } from '../components/Models/Aircraft/AircraftCreateModal';
import { AircraftEditModal } from '../components/Models/Aircraft/AircraftEditModal';
import { deleteAircraft, getAircrafts } from '../http/aircraftApi';
import { IAircraft } from '../interfaces/IAircraft';

export const Aircrafts = () => {
    const [aircarfts, setAircarfts] = useState<IAircraft[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IAircraft>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IAircraft) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getAircrafts()
        .then((data) => {
            setAircarfts(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteAircraft(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <AircraftCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></AircraftCreateModal>
  
        <AircraftEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></AircraftEditModal>
        <h1>Aircratfs</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Manufacturer</th>
              <th>Model name</th>
              <th>Max capacity</th>
              <th>Max cargo capacity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {aircarfts.map((aircarft) => (
              <tr key={aircarft.aircraftId}>
                <td>{aircarft.aircraftId}</td>
                <td>{aircarft.manufacturer}</td>
                <td>{aircarft.modelName}</td>
                <td>{aircarft.maxCapacity}</td>
                <td>{aircarft.maxCargoCapacity}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(aircarft)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(aircarft.aircraftId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
