import { $authhost } from ".";
import { IAirportCreateData } from "../components/Models/Airport/AirportCreateModal";
import { IAirportEditData } from "../components/Models/Airport/AirportEditModal";

export const getAirports = async () => {
    const { data } = await $authhost.get('api/Airports')
    return data;
}

export const createAirport = async (formData: IAirportCreateData) => {
    const { data } = await $authhost.post('api/Airports', formData)
    return data;
}

export const editAirport = async (id: number, formData: IAirportEditData) => {
    const { data } = await $authhost.put(`api/Airports/${id}`, formData)
    return data;
}

export const deleteAirport = async (id: number) => {
    const { data } = await $authhost.delete(`api/Airports/${id}`)
    return data;
}
