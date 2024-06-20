import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { TicketCreateModal } from '../components/Models/Ticket/TicketCreateModal';
import { TicketEditModal } from '../components/Models/Ticket/TicketEditModal';
import { deleteTicket, getTickets } from '../http/ticketApi';
import { ITicket } from '../interfaces/ITicket';

export const Tickets = () => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ITicket>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ITicket) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getTickets()
        .then((data) => {
            setTickets(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteTicket(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <TicketCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></TicketCreateModal>
  
        <TicketEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></TicketEditModal>
        <h1>Tickets</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Passenger</th>
              <th>Flight</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticketId}>
                <td>{ticket.ticketId}</td>
                <td>{ticket.passenger?.lastName} {ticket.passenger?.firstName}</td>
                <td>{ticket.flight?.flightNumber}</td>
                <td>{ticket.price}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(ticket)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(ticket.ticketId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
