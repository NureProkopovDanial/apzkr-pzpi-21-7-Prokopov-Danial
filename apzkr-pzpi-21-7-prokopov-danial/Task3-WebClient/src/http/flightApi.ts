import { $authhost } from ".";
import { IFlightCreateData } from "../components/Models/Flight/FlightCreateModal";
import { IFlightEditData } from "../components/Models/Flight/FlightEditModal";

export const getFlights = async () => {
    const { data } = await $authhost.get('api/Flights')
    return data;
}

export const createFlight = async (formData: IFlightCreateData) => {
    const { data } = await $authhost.post('api/Flights', formData)
    return data;
}

export const editFlight = async (id: number, formData: IFlightEditData) => {
    const { data } = await $authhost.put(`api/Flights/${id}`, formData)
    return data;
}

export const deleteFlight = async (id: number) => {
    const { data } = await $authhost.delete(`api/Flights/${id}`)
    return data;
}
