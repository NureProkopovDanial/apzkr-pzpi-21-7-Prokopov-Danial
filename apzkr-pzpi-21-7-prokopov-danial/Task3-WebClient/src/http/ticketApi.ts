import { $authhost } from ".";
import { ITicketCreateData } from "../components/Models/Ticket/TicketCreateModal";
import { ITicketEditData } from "../components/Models/Ticket/TicketEditModal";

export const getTickets = async () => {
    const { data } = await $authhost.get('api/Tickets')
    return data;
}

export const createTicket = async (formData: ITicketCreateData) => {
    const { data } = await $authhost.post('api/Tickets', formData)
    return data;
}

export const editTicket = async (id: number, formData: ITicketEditData) => {
    const { data } = await $authhost.put(`api/Tickets/${id}`, formData)
    return data;
}

export const deleteTicket = async (id: number) => {
    const { data } = await $authhost.delete(`api/Tickets/${id}`)
    return data;
}
