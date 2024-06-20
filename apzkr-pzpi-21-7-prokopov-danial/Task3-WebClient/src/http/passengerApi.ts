import { $authhost } from ".";
import { IPassengerCreateData } from "../components/Models/Passenger/PassengerCreateModal";
import { IPassengerEditData } from "../components/Models/Passenger/PassengerEditModal";

export const getPassengers = async () => {
    const { data } = await $authhost.get('api/Passengers')
    return data;
}

export const createPassenger = async (formData: IPassengerCreateData) => {
    const { data } = await $authhost.post('api/Passengers', formData)
    return data;
}

export const editPassenger = async (id: number, formData: IPassengerEditData) => {
    const { data } = await $authhost.put(`api/Passengers/${id}`, formData)
    return data;
}

export const deletePassenger = async (id: number) => {
    const { data } = await $authhost.delete(`api/Passengers/${id}`)
    return data;
}
