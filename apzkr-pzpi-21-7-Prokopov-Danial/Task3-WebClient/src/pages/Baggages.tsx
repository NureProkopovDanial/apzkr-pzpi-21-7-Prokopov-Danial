import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BaggageCreateModal } from '../components/Models/Baggage/BaggageCreateModal';
import { BaggageEditModal } from '../components/Models/Baggage/BaggageEditModal';
import { REACT_APP_API_URL } from '../consts';
import { deleteBaggage, getBaggages } from '../http/baggageApi';
import { IBaggage } from '../interfaces/IBaggage';

export const Baggages = () => {
    const [baggages, setBaggages] = useState<IBaggage[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IBaggage>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IBaggage) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getBaggages()
        .then((data) => {
            setBaggages(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteBaggage(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <BaggageCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></BaggageCreateModal>
  
        <BaggageEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></BaggageEditModal>
        <h1>Baggages</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Weight</th>
              <th>Width</th>
              <th>Height</th>
              <th>Depth</th>
              <th>Description</th>
              <th>Passenger</th>
              <th>Flight</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {baggages.map((baggage) => (
              <tr key={baggage.baggageId}>
                <td>{baggage.baggageId}</td>
                <td>{baggage.weight}</td>
                <td>{baggage.width}</td>
                <td>{baggage.height}</td>
                <td>{baggage.depth}</td>
                <td>{baggage.description}</td>
                <td>{baggage.passenger?.lastName} {baggage.passenger?.firstName}</td>
                <td>{baggage.flight?.flightNumber}</td>
                <td><a href={`${REACT_APP_API_URL}api/Baggages/code/${baggage.baggageId}`}>Get code</a></td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(baggage)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(baggage.baggageId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
